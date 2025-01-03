import axios from "axios";

const createUserCart = async (cart, authToken) => {
  const result = await axios.post(
    `${import.meta.env.VITE_APP_API}/user/cart`,
    { cart },
    {
      headers: {
        authToken,
      },
    }
  );
  return result;
};

const getUserCart = async (authToken) => {
  const result = await axios.get(`${import.meta.env.VITE_APP_API}/user/cart`, {
    headers: {
      authToken,
    },
  });
  return result;
};

const emptyUserCart = async (authToken) => {
  const result = await axios.delete(
    `${import.meta.env.VITE_APP_API}/user/cart`,
    {
      headers: {
        authToken,
      },
    }
  );
  return result;
};

const saveUserAddress = async (address, authToken) => {
  const result = await axios.post(
    `${import.meta.env.VITE_APP_API}/user/address`,
    {
      address,
    },

    {
      headers: {
        authToken,
      },
    }
  );
  return result;
};

const applyCoupon = async (coupon, authToken) => {
  const result = await axios.post(
    `${import.meta.env.VITE_APP_API}/user/cart/coupon`,
    {
      coupon,
    },
    {
      headers: {
        authToken,
      },
    }
  );
  return result;
};

const createOrder = async (paymentData, authToken) => {
  const result = await axios.post(
    `${import.meta.env.VITE_APP_API}/user/order`,
    { paymentData },
    {
      headers: {
        authToken,
      },
    }
  );
  return result;
};

const getUserOrders = async (authToken) => {
  const result = await axios.get(
    `${import.meta.env.VITE_APP_API}/user/orders`,
    {
      headers: {
        authToken,
      },
    }
  );
  return result;
};

const getWishlist = async (authToken) => {
  const result = await axios.get(
    `${import.meta.env.VITE_APP_API}/user/wishlist`,
    {
      headers: {
        authToken,
      },
    }
  );
  return result;
};

const removeWishlist = async (productId, authToken) => {
  const result = await axios.put(
    `${import.meta.env.VITE_APP_API}/user/wishlist/${productId}`,{},
    {
      headers: {
        authToken,
      },
    }
  );
  return result;
};

const addToWishlist = async (productId, authToken) => {
  const result = await axios.post(
    `${import.meta.env.VITE_APP_API}/user/wishlist`,
    {
      productId
    },
    {
      headers: {
        authToken,
      },
    }
  );
  return result;
};

export {
  createUserCart,
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
  createOrder,
  getUserOrders,
  getWishlist,
  removeWishlist,
  addToWishlist
};
