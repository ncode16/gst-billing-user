import { post, get } from '../../utility/client';

const AddCmsData = (body) => {
  const config = {     
    headers: { 'content-type': 'multipart/form-data' }
}
  return post('create/cms', body, config.headers);
};

const getCmsData = (body) => {
  return post('cms', body)
}

const deleteCmsData = (id) => {
  return post(`delete/cms/${id}`)
}

const activeCmsData = (id, body) => {
  return post(`active-inactive/cms/${id}`, body)
}

const getEditCmsData = async(id) => {
  if(id) {
    return await get(`edit/cms/${id}`)
  }
  return 0
}

const updateCmsData = (id, body) => {
  const config = {     
    headers: { 'content-type': 'multipart/form-data' }
}
  return post(`update/cms/${id}`, body, config.headers)
}

export { AddCmsData, getCmsData, deleteCmsData, activeCmsData, getEditCmsData, updateCmsData };