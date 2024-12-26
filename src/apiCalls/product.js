import axios from "axios";

const getProducts = async (count) => {
  const result = axios.get(`${import.meta.env.VITE_APP_API}/products/${count}`);
  return result;
};

const getProduct = async (slug) => {
  const result = await axios.get(
    `${import.meta.env.VITE_APP_API}/product/${slug}`
  );
  return result;
};

const removeProduct = async (slug, authToken) => {
  const result = await axios.delete(
    `${import.meta.env.VITE_APP_API}/product/${slug}`,
    {
      headers: {
        authToken: authToken,
      },
    }
  );
  return result;
};

const updateProduct = async (slug, product, authToken) => {
  const result = await axios.put(
    `${import.meta.env.VITE_APP_API}/product/${slug}`,
    product,
    {
      headers: {
        authToken,
      },
    }
  );
  return result;
};

const createProduct = async (product, authToken) => {
  const result = await axios.post(
    `${import.meta.env.VITE_APP_API}/product`,
    product,
    {
      headers: {
        authToken,
      },
    }
  );
  return result;
};

const getSortedProducts = async (sort, order, page) => {
  const result = await axios.post(`${import.meta.env.VITE_APP_API}/products`, {
    sort,
    order,
    page,
  });
  return result
};

const getProductsCount = async () => {
  const result = await axios.get(`${import.meta.env.VITE_APP_API}/products/total`);
  return result
}

const setProductRating = async (productId, star, authToken) => {
  const result = await axios.put(
    `${import.meta.env.VITE_APP_API}/product/star/${productId}`,
    {star},
    {
      headers: {
        authToken,
      },
    }
  );
  return result;
};

const getRelated = async(productId) => {
  const result = await axios.get(
    `${import.meta.env.VITE_APP_API}/product/related/${productId}`,
  );
  return result
}

const getRelatedByCategory = async(categoryId) => {
  const result = await axios.get(
    `${import.meta.env.VITE_APP_API}/product/relatedbycategory/${categoryId}`,
  );
  return result
}

const getRelatedBySubCategory = async (subCategoryId) => {
  const result = await axios.get(
    `${import.meta.env.VITE_APP_API}/product/relatedbysubcategory/${subCategoryId}`
  )
  return result
}
export {
  getProducts,
  getProduct,
  removeProduct,
  updateProduct,
  createProduct,
  getSortedProducts,
  getProductsCount,
  setProductRating,
  getRelated,
  getRelatedByCategory,
  getRelatedBySubCategory
};
