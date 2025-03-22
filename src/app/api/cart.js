const backendUrl = "http://localhost:3001";

async function GetCart() {
  try {
    const res = await fetch(`${backendUrl}/cart`);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(res || "Failed to retrieve cart");
    }

    return { status: 200, data };
  } catch (err) {
    return { status: 400, error: err.message };
  }
}

async function GetCartDetails() {
  const cart = await GetCart();

  const data = await Promise.all(
    cart.data.map(async (item) => {
      const itemData = await fetch(`${backendUrl}/products/${item.id}`);

      if (!itemData.ok) {
        return {
          error: "Failed to fetch product details",
          status: 400,
        };
      }

      const product = await itemData.json();
      return {
        ...product,
        quantity: Math.min(item.quantity, product.inventory),
      };
    })
  );

  return { status: 200, data };
}

async function AddItemToCart(id, quantity) {
  const allItems = await GetCart();
  const existingItem = allItems.data.find((item) => item.id === id);
  let res;

  if (existingItem) {
    quantity += existingItem.quantity;
    res = await fetch(`${backendUrl}/cart/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity }),
    });
  } else {
    res = await fetch(`${backendUrl}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, quantity }),
    });
  }

  if (!res.ok) {
    return {
      error: "Failed to add item to cart",
      status: 400,
    };
  }

  const data = await res.json();

  return { status: 200, data };
}

async function RemoveItemFromCart(id) {
  const res = await fetch(`${backendUrl}/cart/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    return {
      error: "Failed to remove item from cart",
      status: 400,
    };
  }

  return { status: 200 };
}

export { GetCart, GetCartDetails, AddItemToCart, RemoveItemFromCart };
