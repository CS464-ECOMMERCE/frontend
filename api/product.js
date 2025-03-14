async function GetProducts() {
  const res = await fetch("http://localhost:3001/products");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  return data;
}

async function GetActiveProducts() {
  const res = await fetch("http://localhost:3001/products?active=true");

  if (!res.ok) {
    throw new Error("Failed to fetch active products");
  }

  const data = await res.json();
  return data;
}

async function GetProductById(productId) {
  const res = await fetch(`http://localhost:3001/products/${productId}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch product with ID ${productId}`);
  }

  const data = await res.json();
  return data;
}

async function UpdateProductById(productId, productData) {
  const res = await fetch(`http://localhost:3001/products/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });

  if (!res.ok) {
    throw new Error(`Failed to update product with ID ${productId}`);
  }

  const data = await res.json();
  return { status: res.status, ...data };
}

async function CreateProduct(productData) {
  const res = await fetch("http://localhost:3001/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });

  if (!res.ok) {
    throw new Error("Failed to create product");
  }

  const data = await res.json();
  return { status: res.status, data };
}

export {
  GetProducts,
  GetActiveProducts,
  GetProductById,
  UpdateProductById,
  CreateProduct,
};
