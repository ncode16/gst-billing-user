import { post, get } from '../../utility/client';

const AddCategoryData = (body) => {
  return post('create/category', body);
};

const getCategoryData = (body) => {
  return post('categories', body)
}

const deleteCategoryData = (id) => {
  return post(`delete/category/${id}`)
}

const activeCategoryData = (id, body) => {
  return post(`active-inactive/category/${id}`, body)
}

const getEditCategoryData = (id) => {
  if(id) {
    return get(`edit/category/${id}`)
  }
  return get(`edit/category/0`)
}

const updateCategoryData = (id, body) => {
  return post(`update/category/${id}`, body)
}

export { AddCategoryData, getCategoryData, deleteCategoryData, activeCategoryData, getEditCategoryData, updateCategoryData };