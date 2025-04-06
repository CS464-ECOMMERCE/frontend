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
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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
      throw new Error(`Failed to fetch product with ID.`);
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
      throw new Error(`Failed to update product with ID`);
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

async function DeleteProduct(id) {
  try {
    const res = await fetch(`${backendUrl}/product/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to delete product");
    }

    return { status: 200 };
  } catch (err) {
    return { status: 400, error: err.message };
  }
}

async function UploadProductImage(productId, images) {
  const formData = new FormData();
  images.forEach((img) => {
    formData.append("images", img);
  });

  try {
    const res = await fetch(`${backendUrl}/product/upload/${productId}`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      console.error(res);
      throw new Error("Failed to upload image");
    }

    return { status: 200, data };
  } catch (err) {
    return { status: 400, error: err.message };
  }
}

async function DownloadProductImages(imageUrls) {
  try {
    const results = await Promise.allSettled(
      imageUrls.map(async (url) => {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Failed to fetch image from ${url}`);
        }
        return await res.blob();
      }),
    );

    const blobs = results
      .filter((result) => result.status === "fulfilled")
      .map((result, index) => {
        const blob = result.value;

        // Extract file name from the URL
        const url = imageUrls[index];
        const fileName = url.split("/").pop(); // Get the last part of the URL

        // Convert Blob to File with the extracted name
        return new File([blob], fileName, { type: blob.type });
      });

    const errors = results
      .filter((result) => result.status === "rejected")
      .map((result) => result.reason.message);

    if (errors.length > 0) {
      throw new Error("Some images failed to download:", errors);
    }

    return { status: 200, data: blobs };
  } catch (err) {
    return { status: 400, error: err };
  }
}

export {
  GetProductsPaginated,
  GetMerchantProducts,
  GetProductById,
  UpdateProductById,
  CreateProduct,
  DeleteProduct,
  UploadProductImage,
  DownloadProductImages,
};
