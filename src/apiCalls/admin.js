import axios from "axios";

const getOrders = async (authToken) => {
  const result = await axios.get(
    `${import.meta.env.VITE_APP_API}/admin/orders`,
    {
      headers: {
        authToken,
      },
    }
  );
  return result;
};

const changeOrderStatus = async (orderId, orderStatus, authToken) => {
  const result = await axios.put(
    `${import.meta.env.VITE_APP_API}/admin/order-status`,
    {
      orderId,
      orderStatus,
    },
    {
      headers: {
        authToken,
      },
    }
  );
  return result;
};

export { getOrders, changeOrderStatus };
