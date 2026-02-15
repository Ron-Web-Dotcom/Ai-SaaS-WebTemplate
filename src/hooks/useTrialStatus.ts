import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface TrialStatus {
  isExpired: boolean;
  daysRemaining: number;
  trialEndDate: Date | null;
  subscriptionStatus: 'trial' | 'active' | 'expired' | 'cancelled' | null;
  isLoading: boolean;
}

export function useTrialStatus(): TrialStatus {
  const { user } = useAuth();
  const [trialStatus, setTrialStatus] = useState<TrialStatus>({
    isExpired: false,
    daysRemaining: 14,
    trialEndDate: null,
    subscriptionStatus: null,
    isLoading: true,
  });
  const updateInProgressRef = useRef(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const checkTrialStatus = useCallback(async () => {
    if (!user || updateInProgressRef.current) return;

    updateInProgressRef.current = true;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('trial_end_date, subscription_status')
        .eq('id', user.id)
        .maybeSingle();

      if (error) throw error;

      if (!mountedRef.current) return;

      if (!data) {
        setTrialStatus({
          isExpired: true,
          daysRemaining: 0,
          trialEndDate: null,
          subscriptionStatus: 'expired',
          isLoading: false,
        });
        return;
      }

      const trialEndDate = data.trial_end_date ? new Date(data.trial_end_date) : null;
      const now = new Date();
      const isExpired =
        data.subscription_status === 'expired' ||
        (data.subscription_status === 'trial' && trialEndDate && now > trialEndDate);

      let daysRemaining = 0;
      if (trialEndDate && data.subscription_status === 'trial') {
        const diffTime = trialEndDate.getTime() - now.getTime();
        daysRemaining = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
      }

      if (mountedRef.current) {
        setTrialStatus({
          isExpired: isExpired && data.subscription_status !== 'active',
          daysRemaining,
          trialEndDate,
          subscriptionStatus: data.subscription_status,
          isLoading: false,
        });
      }

      if (isExpired && data.subscription_status === 'trial') {
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ subscription_status: 'expired' })
          .eq('id', user.id);

        if (updateError) {
          console.error('Error updating trial status:', updateError);
        }
      }
    } catch (error) {
      console.error('Error checking trial status:', error);
      if (mountedRef.current) {
        setTrialStatus({
          isExpired: false,
          daysRemaining: 14,
          trialEndDate: null,
          subscriptionStatus: null,
          isLoading: false,
        });
      }
    } finally {
      updateInProgressRef.current = false;
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      setTrialStatus({
        isExpired: false,
        daysRemaining: 14,
        trialEndDate: null,
        subscriptionStatus: null,
        isLoading: false,
      });
      return;
    }

    checkTrialStatus();
  }, [user, checkTrialStatus]);

  return trialStatus;
}
