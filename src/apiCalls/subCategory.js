import axios from "axios";

const getSubCategories = async () => {
  const result = axios.get(`${import.meta.env.VITE_APP_API}/subCategories`);
  return result;
};

const getSubCategory = async (slug) => {
  const result = await axios.get(
    `${import.meta.env.VITE_APP_API}/subCategory/${slug}`
  );
  return result;
};

const removeSubCategory = async (slug, authToken) => {
  const result = await axios.delete(
    `${import.meta.env.VITE_APP_API}/subCategory/${slug}`,
    {
      headers: {
        authToken: authToken,
      },
    }
  );
  return result;
};

const updateSubCategory = async (slug, subCategory, category, authToken) => {
  const result = await axios.put(
    `${import.meta.env.VITE_APP_API}/subCategory/${slug}`,
    { name: subCategory,
        parent : category
    },
    {
      headers: {
        authToken,
      },
    }
  );
  return result;
};

const createSubCategory = async (subCategory, category, authToken) => {
  const result = await axios.post(
    `${import.meta.env.VITE_APP_API}/subCategory`,
    { name: subCategory, parent : category },
    {
      headers: {
        authToken,
      },
    }
  );
  return result;
};

export {
  getSubCategories,
  getSubCategory,
  removeSubCategory,
  updateSubCategory,
  createSubCategory,
};
