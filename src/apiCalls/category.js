import axios from "axios";

const getCategories = async () => {
  const result = axios.get(`${import.meta.env.VITE_APP_API}/category`);
  return result;
};

const getCategory = async (slug) => {
  const result = await axios.get(
    `${import.meta.env.VITE_APP_API}/category/${slug}`
  );
  return result;
};

const removeCategory = async (slug, authToken) => {
  const result = await axios.delete(
    `${import.meta.env.VITE_APP_API}/category/${slug}`,
    {
      headers: {
        authToken: authToken,
      },
    }
  );
  return result;
};

const updateCategory = async (slug, category, authToken) => {
  const result = await axios.put(
    `${import.meta.env.VITE_APP_API}/category/${slug}`,
    { name: category },
    {
      headers: {
        authToken,
      },
    }
  );
  return result;
};

const createCategory = async (category, authToken) => {
  const result = await axios.post(
    `${import.meta.env.VITE_APP_API}/category`,
    { name: category },
    {
      headers: {
        authToken,
      },
    }
  );
  return result;
};

export {
  getCategories,
  getCategory,
  removeCategory,
  updateCategory,
  createCategory,
};
