import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface PaymentRequest {
  planName: string;
  userId: string;
}

const planPrices = {
  starter: { amount: 49, name: "Starter Plan" },
  professional: { amount: 199, name: "Professional Plan" },
  enterprise: { amount: 299, name: "Enterprise Plan" },
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { planName, userId }: PaymentRequest = await req.json();

    if (!planName || !userId) {
      throw new Error("Missing required fields: planName and userId");
    }

    const plan = planPrices[planName as keyof typeof planPrices];
    if (!plan) {
      throw new Error("Invalid plan name");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const reference = `BT-${userId.substring(0, 8).toUpperCase()}-${Date.now()}`;

    const { error: transactionError } = await supabase
      .from("payment_transactions")
      .insert({
        user_id: userId,
        payment_method: "bank_transfer",
        amount: plan.amount,
        currency: "USD",
        status: "pending",
        transaction_id: reference,
        plan_type: planName,
        metadata: {
          reference,
          instructions_sent: true,
        },
      });

    if (transactionError) {
      throw new Error(`Failed to create transaction: ${transactionError.message}`);
    }

    const bankDetails = {
      accountName: "Your Company Name LLC",
      accountNumber: "1234567890",
      routingNumber: "021000021",
      swiftCode: "CHASUS33",
      bankName: "Chase Bank",
      bankAddress: "New York, NY",
    };

    const instructions = `
Bank Transfer Instructions:

Amount: $${plan.amount} USD
Plan: ${plan.name}

Bank Details:
- Bank Name: ${bankDetails.bankName}
- Account Name: ${bankDetails.accountName}
- Account Number: ${bankDetails.accountNumber}
- Routing Number: ${bankDetails.routingNumber}
- SWIFT/BIC: ${bankDetails.swiftCode}

IMPORTANT: Please include this reference number in your transfer:
${reference}

Processing Time: 2-3 business days
Your subscription will be activated once payment is verified.

If you have any questions, please contact ront.devops@gmail.com
    `.trim();

    return new Response(
      JSON.stringify({
        reference,
        instructions,
        amount: plan.amount,
        currency: "USD",
        bankDetails,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: any) {
    console.error("Bank transfer creation error:", error);

    return new Response(
      JSON.stringify({
        error: error.message || "Failed to create bank transfer instructions",
      }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});