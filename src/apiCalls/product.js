import axios from "axios";

const getProducts = async () => {
  const result = axios.get(`${import.meta.env.VITE_APP_API}/products`);
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

export {
  getProducts,
  getProduct,
  removeProduct,
  updateProduct,
  createProduct,
};
