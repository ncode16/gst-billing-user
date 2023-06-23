import { post, get } from "../../utility/client";

const AddNewCustomerData = (body) => {
  return post("create/customer", body);
};

const updateCustomer = (customer_Id, body) => {
  return post(`update/customer/${customer_Id}`, body);
};

const getCustomerDataHandler = () => {
  return get("customers");
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

const getCustomerDetails = (customerId) => {
  return get(`/edit/customer/${customerId}`);
};

export {
  AddNewCustomerData,
  getCustomerDataHandler,
  deleteShippingAddresss,
  getShippingData,
  updateAddShippingAddressData,
  getCustomerDetails,
  updateCustomer,
};
