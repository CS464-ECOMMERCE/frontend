import { GetProductById } from "./product";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

async function GetCart() {
  const defaultError = "Failed to retrieve cart";
  try {
    const res = await fetch(`${backendUrl}/cart`, {
      credentials: "include",
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(defaultError);
    }

    return { status: 200, data };
  } catch (err) {
    return { status: 400, error: err.message || defaultError };
  }
}

async function GetCartDetails() {
  try {
    const res = await GetCart();

    if (res.status !== 200) {
      throw new Error(res.error);
    }

    const cartData = res.data?.items || [];

    const data = await Promise.all(
      cartData.map(async (item) => {
        const itemRes = await GetProductById(item.id);

        if (itemRes.status !== 200) {
          throw new Error("Failed to fetch product details");
        }

        return {
          ...itemRes.data,
          quantity: Math.min(item.quantity, itemRes.data?.inventory || 1),
        };
      })
    );

    return { status: 200, data };
  } catch (err) {
    return {
      error: err.message || "Failed to fetch cart details",
      status: 400,
    };
  }
}

async function AddItemToCart(id, quantity) {
  const defaultError = "Failed to add item to cart";
  try {
    const res = await fetch(`${backendUrl}/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ id, quantity }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(defaultError);
    }

    return { status: 200, data };
  } catch (err) {
    return {
      error: err.message || "Failed to add item to cart",
      status: 400,
    };
  }
}

async function UpdateItemQuantity(id, quantity) {
  const defaultError = "Failed to update item quantity";
  try {
    const res = await fetch(`${backendUrl}/cart/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ id, quantity }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(defaultError);
    }

    return { status: 200, data };
  } catch (err) {
    return {
      error: err.message || defaultError,
      status: 400,
    };
  }
}

async function RemoveItemFromCart(id) {
  const defaultError = "Failed to remove item from cart";
  try {
    const res = await fetch(`${backendUrl}/cart/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error(defaultError);
    }

    return { status: 200 };
  } catch (err) {
    return {
      error: err.message || defaultError,
      status: 400,
    };
  }
}

async function EmptyCart() {
  const defaultError = "Failed to empty cart";
  try {
    const res = await fetch(`${backendUrl}/cart/empty`, {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(defaultError);
    }

    return { status: 200 };
  } catch (err) {
    return {
      error: err.message || defaultError,
      status: 400,
    };
  }
}

export {
  GetCart,
  GetCartDetails,
  AddItemToCart,
  UpdateItemQuantity,
  RemoveItemFromCart,
  EmptyCart,
};
