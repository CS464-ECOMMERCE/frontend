async function GetProducts() {
  const res = await fetch("http://localhost:3001/products");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  return data;
}

async function GetProductById(productId) {
  const res = await GetProducts();

  return res.filter((product) => `${product.id}` === productId)[0];
}

export { GetProducts, GetProductById };
