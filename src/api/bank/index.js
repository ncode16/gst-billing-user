import { post, get } from "../../utility/client";

const addNewBankData = (body) => {
  return post("create/bank", body);
};

const getNewBankData = () => {
  return get(`bank`);
};

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
  return get(`edit/vendor/${id}`);
};

const updateVendorData = (id, body) => {
  return post(`update/vendor/${id}`, body);
};

const getVendorForDifferentUser = () => {
  return get(`get/vendor-for-user`);
};

export {
  addNewBankData,
  listVendor,
  deleteVendor,
  cancelVendor,
  getEditVendor,
  updateVendorData,
  getVendorForDifferentUser,
  getNewBankData,
};
