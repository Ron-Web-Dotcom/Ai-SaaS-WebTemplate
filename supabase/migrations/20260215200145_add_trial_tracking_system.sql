/*
  # Add Trial Tracking System

  ## Overview
  Implements a 14-day trial system that automatically starts when users sign up
  and forces them to upgrade to Enterprise plan after trial expires.

  ## Changes to profiles table
  - `trial_start_date` (timestamptz) - When the trial period started
  - `trial_end_date` (timestamptz) - When the trial period ends (14 days after start)
  - `subscription_status` (text) - Current subscription status (trial, active, expired)
  - `is_admin` (boolean) - Admin flag for admin panel access

  ## Updates
  - Modify handle_new_user() function to automatically set 14-day trial dates
  - Add default subscription_status of 'trial' for new users

  ## Business Logic
  - New users start with 14-day trial automatically
  - After trial expires, dashboard access is blocked
  - Users must upgrade to Enterprise plan to continue
*/

-- Add new columns to profiles table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'trial_start_date'
  ) THEN
    ALTER TABLE profiles ADD COLUMN trial_start_date timestamptz DEFAULT now();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'trial_end_date'
  ) THEN
    ALTER TABLE profiles ADD COLUMN trial_end_date timestamptz DEFAULT (now() + interval '14 days');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'subscription_status'
  ) THEN
    ALTER TABLE profiles ADD COLUMN subscription_status text DEFAULT 'trial' CHECK (subscription_status IN ('trial', 'active', 'expired', 'cancelled'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'is_admin'
  ) THEN
    ALTER TABLE profiles ADD COLUMN is_admin boolean DEFAULT false;
  END IF;
END $$;

-- Update existing profiles to have trial dates (if they don't already)
UPDATE profiles
SET 
  trial_start_date = COALESCE(trial_start_date, created_at),
  trial_end_date = COALESCE(trial_end_date, created_at + interval '14 days'),
  subscription_status = COALESCE(subscription_status, 'trial')
WHERE trial_start_date IS NULL OR trial_end_date IS NULL;

-- Update the handle_new_user function to set trial dates
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    email, 
    full_name,
    trial_start_date,
    trial_end_date,
    subscription_status,
    plan
  )
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    now(),
    now() + interval '14 days',
    'trial',
    'free'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to check if trial has expired
CREATE OR REPLACE FUNCTION public.is_trial_expired(user_id uuid)
RETURNS boolean AS $$
DECLARE
  trial_end timestamptz;
  sub_status text;
BEGIN
  SELECT trial_end_date, subscription_status
  INTO trial_end, sub_status
  FROM profiles
  WHERE id = user_id;

  -- If user has active subscription, trial doesn't matter
  IF sub_status = 'active' THEN
    RETURN false;
  END IF;

  -- Check if trial has expired
  IF trial_end IS NOT NULL AND now() > trial_end THEN
    -- Update status to expired if it's still marked as trial
    IF sub_status = 'trial' THEN
      UPDATE profiles
      SET subscription_status = 'expired'
      WHERE id = user_id;
    END IF;
    RETURN true;
  END IF;

  RETURN false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create index for faster trial queries
CREATE INDEX IF NOT EXISTS idx_profiles_trial_end_date ON profiles(trial_end_date);
CREATE INDEX IF NOT EXISTS idx_profiles_subscription_status ON profiles(subscription_status);