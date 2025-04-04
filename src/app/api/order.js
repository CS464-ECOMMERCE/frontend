const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

async function PlaceOrder(email) {
  try {
    const res = await fetch(`${backendUrl}/create_order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      throw new Error("Failed to place order");
    }

    const data = await res.json();
    return { status: 200, data };
  } catch (err) {
    return { status: 400, error: err.message };
  }
}

export { PlaceOrder };
