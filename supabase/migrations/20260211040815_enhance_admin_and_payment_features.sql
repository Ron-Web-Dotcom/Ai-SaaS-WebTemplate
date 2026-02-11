/*
  # Enhance Admin and Payment Features

  1. Updates to profiles table
    - Add `status` column (active, suspended, banned)
    - Add `last_login` timestamp
    - Add `created_by` field to track who created the account
    
  2. New Tables
    - `payment_methods`
      - `id` (uuid, primary key)
      - `name` (text) - e.g., "Stripe", "PayPal", "Crypto"
      - `enabled` (boolean)
      - `display_name` (text)
      - `description` (text)
      - `icon` (text)
      - `config` (jsonb) - configuration details
      - `created_at` (timestamp)
    
    - `payment_transactions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `payment_method` (text)
      - `amount` (decimal)
      - `currency` (text)
      - `status` (text) - pending, completed, failed, refunded
      - `transaction_id` (text) - external transaction ID
      - `plan_type` (text)
      - `metadata` (jsonb)
      - `created_at` (timestamp)
  
  3. Security
    - Enable RLS on all new tables
    - Add policies for admin access
    - Update existing policies for better admin control
*/

-- Add new columns to profiles table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'status'
  ) THEN
    ALTER TABLE profiles ADD COLUMN status text DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'banned'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'last_login'
  ) THEN
    ALTER TABLE profiles ADD COLUMN last_login timestamptz;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'created_by'
  ) THEN
    ALTER TABLE profiles ADD COLUMN created_by uuid REFERENCES profiles(id);
  END IF;
END $$;

-- Create payment methods table
CREATE TABLE IF NOT EXISTS payment_methods (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  display_name text NOT NULL,
  description text,
  icon text,
  enabled boolean DEFAULT true,
  config jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;

-- Create payment transactions table
CREATE TABLE IF NOT EXISTS payment_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  payment_method text NOT NULL,
  amount decimal(10,2) NOT NULL,
  currency text DEFAULT 'USD',
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  transaction_id text,
  plan_type text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_payment_transactions_user_id ON payment_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_created_at ON payment_transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_status ON payment_transactions(status);
CREATE INDEX IF NOT EXISTS idx_profiles_status ON profiles(status);
CREATE INDEX IF NOT EXISTS idx_profiles_is_admin ON profiles(is_admin);

-- Drop existing conflicting policies and recreate them
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;

-- RLS Policies for profiles table
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true
  ));

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can update all profiles"
  ON profiles FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true
  ));

CREATE POLICY "Admins can insert profiles"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true
  ));

-- RLS Policies for payment_methods
CREATE POLICY "Anyone can view enabled payment methods"
  ON payment_methods FOR SELECT
  TO authenticated
  USING (enabled = true OR EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true
  ));

CREATE POLICY "Admins can manage payment methods"
  ON payment_methods FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true
  ));

-- RLS Policies for payment_transactions
CREATE POLICY "Users can view own transactions"
  ON payment_transactions FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view all transactions"
  ON payment_transactions FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true
  ));

CREATE POLICY "System can insert transactions"
  ON payment_transactions FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update transactions"
  ON payment_transactions FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true
  ));

-- Insert default payment methods
INSERT INTO payment_methods (name, display_name, description, icon, enabled, config) VALUES
  ('stripe', 'Credit/Debit Card', 'Pay securely with your credit or debit card via Stripe', 'CreditCard', true, '{"processor": "stripe", "supports_recurring": true}'::jsonb),
  ('paypal', 'PayPal', 'Pay with your PayPal account', 'Wallet', true, '{"processor": "paypal", "supports_recurring": true}'::jsonb),
  ('crypto', 'Cryptocurrency', 'Pay with Bitcoin, Ethereum, or USDT', 'Bitcoin', true, '{"currencies": ["BTC", "ETH", "USDT"], "processor": "coinbase"}'::jsonb),
  ('bank_transfer', 'Bank Transfer', 'Direct bank transfer (2-3 business days)', 'Building2', true, '{"processing_time": "2-3 business days", "manual_verification": true}'::jsonb)
ON CONFLICT (name) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon;

-- Create function to update last login
CREATE OR REPLACE FUNCTION update_last_login()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE profiles
  SET last_login = now()
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$;

-- Create trigger for last login (only if it doesn't exist)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_login') THEN
    CREATE TRIGGER on_auth_user_login
      AFTER INSERT ON auth.sessions
      FOR EACH ROW
      EXECUTE FUNCTION update_last_login();
  END IF;
END $$;