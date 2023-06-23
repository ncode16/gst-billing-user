import { post, get } from "../../utility/client";

const addProduct = (body) => {
  const config = {
    headers: { 'content-type': 'multipart/form-data' }
  }
  return post("create/product", body, config.headers);
}

const listProduct = () => {
  return get("products");
};

const deleteVendor = (id) => {
  return post(`delete/vendor/${id}`);
};

const cancelVendor = (id, body) => {
  return post(`cancel/vendor/${id}`, body);
};

const getEditVendor = (id) => {
  return get(`edit/vendor/${id}`)
}

const updateVendorData = (id, body) => {
  return post(`update/vendor/${id}`, body)
}

export { addProduct, listProduct, deleteVendor, cancelVendor, getEditVendor, updateVendorData };
