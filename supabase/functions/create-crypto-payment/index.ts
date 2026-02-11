import "jsr:@supabase/functions-js/edge-runtime.d.ts";

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

    const coinbaseApiKey = Deno.env.get("COINBASE_API_KEY");
    const coinbaseApiSecret = Deno.env.get("COINBASE_API_SECRET");

    const chargeData = {
      name: plan.name,
      description: `Monthly subscription for ${plan.name}`,
      local_price: {
        amount: plan.amount.toString(),
        currency: "USD",
      },
      pricing_type: "fixed_price",
      metadata: {
        user_id: userId,
        plan: planName,
      },
      redirect_url: `${Deno.env.get("SITE_URL")}/dashboard?payment=success`,
      cancel_url: `${Deno.env.get("SITE_URL")}/dashboard?payment=cancelled`,
    };

    const response = await fetch("https://api.commerce.coinbase.com/charges", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CC-Api-Key": coinbaseApiKey || "",
        "X-CC-Version": "2018-03-22",
      },
      body: JSON.stringify(chargeData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Coinbase API error: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();

    return new Response(
      JSON.stringify({
        paymentUrl: data.data.hosted_url,
        chargeId: data.data.id,
        addresses: data.data.addresses,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: any) {
    console.error("Crypto payment creation error:", error);

    return new Response(
      JSON.stringify({
        error: error.message || "Failed to create crypto payment",
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