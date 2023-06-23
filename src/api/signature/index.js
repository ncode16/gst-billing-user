import { post, get } from "../../utility/client";

const addNewSignatureData = (body) => {
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };
  return post("create/signature", body, );
  //config.headers
};

const getNewSignatureData = () => {
  return get('signature');
};

const deleteShippingAddresss = (shipping_address_id) => {
  return post(`delete/shipping-address/${shipping_address_id}`);
};

const activeCategoryData = (id, body) => {
  return post(`active-inactive/category/${id}`, body);
};

const getEditShippingAddressDataRetrive = (shipping_address_id) => {
  return get(`edit/shipping-address/${shipping_address_id}`);
};

const updateAddShippingAddressData = (shipping_address_id, body) => {
  return post(`update/shipping-address/${shipping_address_id}`, body);
};

export {
  addNewSignatureData,
  getNewSignatureData,
  deleteShippingAddresss,
  getEditShippingAddressDataRetrive,
  updateAddShippingAddressData,
};
