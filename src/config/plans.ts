export const PLAN_PRICES = {
  starter: { amount: 49, name: "Starter Plan" },
  professional: { amount: 199, name: "Professional Plan" },
  enterprise: { amount: 299, name: "Enterprise Plan" },
} as const;

export const SUPPORT_EMAIL = import.meta.env.VITE_SUPPORT_EMAIL || 'support@nexusai.com';
export const COMPANY_NAME = 'NexusAI';

export type PlanType = keyof typeof PLAN_PRICES;

export function getPlanPrice(planName: string): { amount: number; name: string } | null {
  const normalizedName = planName.toLowerCase() as PlanType;
  return PLAN_PRICES[normalizedName] || null;
}
