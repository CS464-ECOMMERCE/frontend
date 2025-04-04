const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

async function GetCheckoutSession(sessionId) {
  try {
    const res = await fetch(`${backendUrl}/stripe/${sessionId}`, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch checkout session");
    }

    const data = await res.json();
    return { status: 200, data };
  } catch (err) {
    return { status: 400, error: err.message };
  }
}

async function CancelCheckoutSession(sessionId) {
  try {
    const res = await fetch(`${backendUrl}/stripe/cancel/${sessionId}`, {
      method: "POST",
    });

    if (!res.ok) {
      throw new Error("Failed to cancel checkout session");
    }

    const data = await res.json();
    return { status: 200, data };
  } catch (err) {
    return { status: 400, error: err.message };
  }
}

export { GetCheckoutSession, CancelCheckoutSession };
