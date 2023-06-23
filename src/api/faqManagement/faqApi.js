import { post, get } from "../../utility/client";

const AddFaqData = (body) => {
  return post("create/faq", body);
};

const getFaqData = (body) => {
  return post("faqs", body);
};

const activeFaqData = (id, body) => {
  return post(`active-inactive/faq/${id}`, body)
}

const deleteFeqData = (id) => {
  return post(`delete/faq/${id}`)
}

const getEditFaqData = (id) => {
  if(id) {
    return get(`edit/faq/${id}`)
  }
  return get(`edit/faq/0`)
}

const updateFaqData = (id, body) => {
  return post(`update/faq/${id}`, body)
}

export { AddFaqData, getFaqData, activeFaqData, deleteFeqData, getEditFaqData, updateFaqData };
