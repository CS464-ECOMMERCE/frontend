const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

async function PlaceOrder(email, address, country) {
  try {
    const res = await fetch(`${backendUrl}/create_order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, address, country }),
    });

    const data = await res.json();
    if (!res.ok) {
      const errorMessage = () => {
        const defaultMessage = "Failed to place order";
        if (data.error) {
          if (data.error.includes("cannot buy your own product")) {
            return "You cannot buy your own product";
          } else if (data.error.includes("invalid address")) {
            return "Address is invalid";
          }
          return defaultMessage;
        } else {
          return defaultMessage;
        }
      };
      throw new Error(errorMessage());
    }

    return { status: 200, data };
  } catch (err) {
    return { status: 400, error: err.message };
  }
}

async function GetOrderById(id) {
  try {
    const res = await fetch(`${backendUrl}/order/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch order");
    }

    const data = await res.json();
    return { status: 200, data };
  } catch (err) {
    return { status: 400, error: err.message };
  }
}

async function GetUserOrderByEmail(email) {
  try {
    const res = await fetch(`${backendUrl}/order/user/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch order");
    }

    const data = await res.json();
    return { status: 200, data };
  } catch (err) {
    return { status: 400, error: err.message };
  }
}

async function GetOrdersByMerchant() {
  try {
    const res = await fetch(`${backendUrl}/order/merchant`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch orders");
    }

    const data = await res.json();
    return { status: 200, data };
  } catch (err) {
    return { status: 400, error: err.message };
  }
}

async function UpdateOrderStatus(id, status) {
  try {
    const res = await fetch(`${backendUrl}/order/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ id, status }),
    });

    if (!res.ok) {
      throw new Error("Failed to update order status");
    }

    const data = await res.json();
    return { status: 200, data };
  } catch (err) {
    return { status: 400, error: err.message };
  }
}

async function CancelOrderStatus(id) {
  try {
    const res = await fetch(`${backendUrl}/order/cancel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ id }),
    });

    if (!res.ok) {
      throw new Error("Failed to cancel order ");
    }

    const data = await res.json();
    return { status: 200, data };
  } catch (err) {
    return { status: 400, error: err.message };
  }
}

export {
  PlaceOrder,
  GetOrderById,
  GetUserOrderByEmail,
  GetOrdersByMerchant,
  UpdateOrderStatus,
  CancelOrderStatus,
};
