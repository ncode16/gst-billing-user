import { post, get } from "../../utility/client";

const addVendor = (body) => {
  return post("create/vendor", body);
}

const listVendor = (body) => {
  return post("vendors", body);
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

const getVendorForDifferentUser = () => {
  return get(`get/vendor-for-user`)
}

export { addVendor, listVendor, deleteVendor, cancelVendor, getEditVendor, updateVendorData, getVendorForDifferentUser };
