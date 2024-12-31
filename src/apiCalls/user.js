import axios from "axios";

const createUserCart = async (cart, authToken) => {
  try {
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
  } catch (err) {
    console.log(err);
  }
};

const getUserCart = async (authToken) => {
  try {
    const result = await axios.get(
      `${import.meta.env.VITE_APP_API}/user/cart`,
      {
        headers: {
          authToken,
        },
      }
    );
    return result;
  } catch (err) {
    console.log(err);
  }
};

const emptyUserCart = async (authToken) => {
  try {
    const result = await axios.delete(
      `${import.meta.env.VITE_APP_API}/user/cart`,
      {
        headers: {
          authToken,
        },
      }
    );
    return result;
  } catch (err) {
    console.log(err);
  }
};

const saveUserAddress = async (address, authToken) => {
  try {
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
  } catch (err) {
    console.log(err);
  }
};

const applyCoupon = async (coupon, authToken)=>{
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
}

export { createUserCart, getUserCart, emptyUserCart, saveUserAddress, applyCoupon };
