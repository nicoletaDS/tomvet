import { publicApi } from "./authorizedApi";

export const getAllProducts = async () => {
  const products = await publicApi.get(`/api/products/`);
  console.log("RSP DATA", products.data);
  return products.data;
};

export const getProduct = async (id: number) => {
  const product = await publicApi.get(`/api/products/${id}/`);
  console.log("RSP DATA", product.data);
  return product.data;
};
