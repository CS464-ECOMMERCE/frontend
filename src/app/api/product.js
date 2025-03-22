const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

async function GetProductsPaginated(pageSize, cursor) {
  let url;
  if (cursor) {
    url = `${backendUrl}/product?limit=${pageSize}&cursor=${cursor}`;
  } else {
    url = `${backendUrl}/product?limit=${pageSize}`;
  }

  try {
    const res = await fetch(url);

    if (!res.ok) {
      return { status: 400, error: "Failed to fetch products" };
    }

    const data = await res.json();
    return { status: 200, data };
  } catch (err) {
    return { status: 400, error: err.message };
  }
}

async function GetMerchantProducts(pageSize, cursor) {
  let url;
  if (cursor) {
    url = `${backendUrl}/product/merchant?limit=${pageSize}&cursor=${cursor}`;
  } else {
    url = `${backendUrl}/product/merchant?limit=${pageSize}`;
  }

  try {
    const res = await fetch(url, {
      credentials: "include",
    });

    if (!res.ok) {
      return { status: 400, error: "Failed to fetch products" };
    }

    const data = await res.json();
    return { status: 200, data };
  } catch (err) {
    return { status: 400, error: err.message };
  }
}

async function GetProductById(productId) {
  try {
    const res = await fetch(`${backendUrl}/product/${productId}`);

    const data = await res.json();

    if (!res.ok) {
      return {
        status: 400,
        error: `Failed to fetch product with ID: ${data.error}`,
      };
    }

    return { status: 200, data };
  } catch (err) {
    return { status: 400, error: err.message };
  }
}

async function UpdateProductById(updateData) {
  try {
    const res = await fetch(`${backendUrl}/product`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
      credentials: "include",
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(`Failed to update product with ID ${updateData.id}`);
    }

    return { status: res.status, data };
  } catch (err) {
    return { status: 400, error: err.message };
  }
}

async function CreateProduct(productData) {
  try {
    const res = await fetch(`${backendUrl}/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
      credentials: "include",
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to create product");
    }

    return { status: 201, data };
  } catch (err) {
    return { status: 400, error: err.message };
  }
}

export {
  GetProductsPaginated,
  GetMerchantProducts,
  GetProductById,
  UpdateProductById,
  CreateProduct,
};
