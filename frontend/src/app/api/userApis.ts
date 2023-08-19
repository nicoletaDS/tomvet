import { authorizedApi } from "./authorizedApi";

// register: api/users/   from djoser lib
// login:  api/users/login  from djoser lib

export const getProfile = async (id: number) => {
  const profile = await authorizedApi.get(`/api/users/profile/`);
  console.log("RSP DATA", profile.data);
  return profile.data;
};

export const getMyAddresses = async () => {
  const addresses = await authorizedApi.get(`/api/users/address/`);
  console.log("RSP DATA", addresses.data);
  return addresses.data;
};

export const getAddress = async (id: number) => {
  const address = await authorizedApi.get(`/api/users/address/${id}/`);
  console.log("RSP DATA", address.data);
  return address.data;
};

export const deleteAddress = async (id: number) => {
  const rsp = await authorizedApi.delete(`/api/users/address/${id}/`);
  console.log("RSP DATA", rsp.data);
  return rsp.data;
};

export const addAddress = async (
  county: string,
  city: string,
  str: string,
  nr: number,
  apartment: number
) => {
  const address = await authorizedApi.post(`/api/users/address/add/`, {
    county,
    city,
    str,
    nr,
    apartment,
  });
  console.log("RSP DATA", address.data);
  return address.data;
};
