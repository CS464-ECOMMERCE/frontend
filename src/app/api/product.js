const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

async function GetProducts() {
  const res = await fetch(`${backendUrl}/products`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  return data;
}

async function GetProductsPaginated(page, pageSize) {
  const start = page * pageSize;
  const res = await fetch(
    `${backendUrl}/products?_start=${start}&_limit=${pageSize}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  return data;
}

async function GetProductById(productId) {
  const res = await fetch(`${backendUrl}/products/${productId}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch product with ID ${productId}`);
  }

  const data = await res.json();
  return data;
}

async function UpdateProductById(productId, productData) {
  const res = await fetch(`${backendUrl}/products/${productId}`, {
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
  const res = await fetch(`${backendUrl}/products`, {
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
  GetProductsPaginated,
  GetProductById,
  UpdateProductById,
  CreateProduct,
};
