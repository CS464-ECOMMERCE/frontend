import { loadStripe } from "@stripe/stripe-js";

const stripePromise = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

async function fetchClientSecret() {
  // Create a Checkout Session
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE}/api/v1/create-checkout-session`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          {
            stripePriceId: 'price_1R289X2fahqAQuSF9FLFgWy9',
            quantity: 10,
          },
          {
            stripePriceId: 'price_1R289X2fahqAQuSF9FLFgWy9',
            quantity: 1,
          },
        ],
      }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to create checkout session");
  }

  const data = await res.json();
  return data.clientSecret;
}

export { fetchClientSecret, stripePromise };
