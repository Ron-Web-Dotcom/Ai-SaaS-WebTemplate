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

const PLAN_PRICES = {
  starter: { amount: 49, name: "Starter Plan" },
  professional: { amount: 199, name: "Professional Plan" },
  enterprise: { amount: 299, name: "Enterprise Plan" },
} as const;

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

    const plan = PLAN_PRICES[planName as keyof typeof PLAN_PRICES];
    if (!plan) {
      throw new Error("Invalid plan name");
    }

    const paypalClientId = Deno.env.get("PAYPAL_CLIENT_ID");
    const paypalSecret = Deno.env.get("PAYPAL_SECRET");
    const isSandbox = Deno.env.get("PAYPAL_SANDBOX") === "true";
    const siteUrl = Deno.env.get("SITE_URL") || Deno.env.get("SUPABASE_URL");

    if (!paypalClientId || !paypalSecret) {
      return new Response(
        JSON.stringify({
          error: "PayPal payments are currently unavailable. Please try another payment method.",
        }),
        {
          status: 503,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    if (!siteUrl) {
      throw new Error("Site URL not configured");
    }

    const baseUrl = isSandbox
      ? "https://api-m.sandbox.paypal.com"
      : "https://api-m.paypal.com";

    const auth = btoa(`${paypalClientId}:${paypalSecret}`);

    const orderResponse = await fetch(`${baseUrl}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: plan.amount.toString(),
            },
            description: plan.name,
            custom_id: userId,
          },
        ],
        application_context: {
          return_url: `${siteUrl}/dashboard?payment=success`,
          cancel_url: `${siteUrl}/dashboard?payment=cancelled`,
        },
      }),
    });

    if (!orderResponse.ok) {
      const errorData = await orderResponse.json();
      throw new Error(`PayPal API error: ${JSON.stringify(errorData)}`);
    }

    const orderData = await orderResponse.json();

    const approvalUrl = orderData.links.find(
      (link: any) => link.rel === "approve"
    )?.href;

    if (!approvalUrl) {
      throw new Error("No approval URL found in PayPal response");
    }

    return new Response(
      JSON.stringify({
        approvalUrl,
        orderId: orderData.id,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: any) {
    console.error("PayPal payment creation error:", error);

    return new Response(
      JSON.stringify({
        error: error.message || "Failed to create PayPal payment",
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