const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

async function GetCart() {
  const res = await fetch(`${backendUrl}/cart`);

  if (!res.ok) {
    throw new Error("Failed to fetch cart");
  }

  const data = await res.json();
  return data;
}

async function GetCartDetails() {
  const cart = await GetCart();

  const data = await Promise.all(
    cart.map(async (item) => {
      const itemData = await fetch(`${backendUrl}/products/${item.id}`);

      if (!itemData.ok) {
        throw new Error("Failed to fetch product details");
      }

      const product = await itemData.json();
      return {
        ...product,
        quantity: Math.min(item.quantity, product.inventory),
      };
    })
  );

  return data;
}

async function AddItemToCart(id, quantity) {
  const res = await fetch(`${backendUrl}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, quantity }),
  });

  if (!res.ok) {
    throw new Error("Failed to add item to cart");
  }

  return res.json();
}

export { GetCart, GetCartDetails, AddItemToCart };
