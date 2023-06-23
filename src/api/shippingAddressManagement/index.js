import { post, get } from "../../utility/client";

const addShippingAddress = (body) => {
  return post("create/shipping-address", body);
};

const getShippingAddress = () => {
  return get("shipping-address");
};

const deleteShippingAddresss = (shipping_address_id) => {
  return post(`delete/shipping-address/${shipping_address_id}`);
};

const activeCategoryData = (id, body) => {
  return post(`active-inactive/category/${id}`, body);
};

const getShippingData = (shipping_address_id) => {
  return get(`edit/shipping-address/${shipping_address_id}`);
};

const updateAddShippingAddressData = (shipping_address_id, body) => {
  return post(`update/shipping-address/${shipping_address_id}`, body);
};

export {
  addShippingAddress,
  getShippingAddress,
  deleteShippingAddresss,
  updateAddShippingAddressData,
  getShippingData,
};
