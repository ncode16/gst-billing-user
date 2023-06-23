import { post, get } from "../../utility/client";

const addProduct = (body) => {
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };
  return post("create/product", body, config.headers);
};

const getCategoryData = (body) => {
  return post("categories", body);
};

const deleteCategoryData = (id) => {
  return post(`delete/category/${id}`);
};

const activeCategoryData = (id, body) => {
  return post(`active-inactive/category/${id}`, body);
};

const getEditCategoryData = (id) => {
  if (id) {
    return get(`edit/category/${id}`);
  }
  return get(`edit/category/0`);
};

const updateCategoryData = (id, body) => {
  return post(`update/category/${id}`, body);
};
const productList = () => {
  return get(`products`);
};

const getProductDetails = (productId) => {
  return get(`edit/product/${productId}`);
};

const updateProduct = (productId, body) => {
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };
  return post(`update/product/${productId}`, body, config.headers);
};

export {
  addProduct,
  getCategoryData,
  deleteCategoryData,
  activeCategoryData,
  getEditCategoryData,
  updateCategoryData,
  productList,
  getProductDetails,
  updateProduct,
};
