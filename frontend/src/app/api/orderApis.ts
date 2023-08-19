import { authorizedApi } from "./authorizedApi";

export const getMyOrders = async () => {
  const orders = await authorizedApi.get(`/api/orders/`);
  console.log("RSP DATA", orders.data);
  return orders.data;
};

export const getOrder = async (id: number) => {
  const order = await authorizedApi.get(`/api/orders/${id}`);
  console.log("RSP DATA", order.data);
  return order.data;
};

export const addOrderApi = async (orderData: {
  orderItems: any;
  delivery_address: Address;
}) => {
  const order = await authorizedApi.post(`/api/orders/add/`, {
    orderItems: orderData.orderItems,
    delivery_address: orderData.delivery_address,
  });
  console.log("RSP DATA", order.data);
  return order.data;
};
