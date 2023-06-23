import { post, get } from "../../utility/client";

const AddExapenseData = (body) => {
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };
  return post("create/expense", body, config.headers);
};

const createPaymentAPI = (body) => {
  return post("create/payment", body);
};

const updatePaymentAPI = (paymentId, body) => {
  return post(`update/payment/${paymentId}`, body);
};

const bankExpenseId = () => {
  return get("bank");
};

const bankDetailsExpenseData = (body) => {
  return post("create/bank", body);
};

const GetExpenseData = (body) => {
  return post("expenses", body);
};
const sendEmailExpenseData = (body) => {
  return post("send/expense-email", body);
};
const createDocumentNotes = (body) => {
  return post("create/document-notes", body);
};

const emailExpenseTemplete = (body) => {
  return get("email-template", body);
};

const deleteExpenseDetail = (id) => {
  return post(`delete/expense/${id}`);
};
const cancelExpenseDetail = (id) => {
  return post(`cancel/expense/${id}`);
};

const checkPendingExpenseData = (id) => {
  return post(`pending/expense/${id}`);
};

const EditExpenseData = (expense_id) => {
  return get(`edit/expense/${expense_id}`);
};

const EditPaymentData = (payment_id) => {
  return get(`edit/payment/${payment_id}`);
};

const updateExpenseData = (expense_id, body) => {
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };
  return post(`update/expense/${expense_id}`, body, config.headers);
};

const addEmailExpenseTemplete = (body) => {
  return post("create/email-template", body);
};

const getEmailExpenseTemplete = () => {
  return get("email-template");
};

const editEmailExpenseTemplete = (email_template_id) => {
  return get(`edit/email-template/${email_template_id}`);
};

const updateEmailExpenseTemplete = (email_template_id, body) => {
  return post(`update/email-template/${email_template_id}`, body);
};

const deleteEmailExpenseTemplete = (email_template_id) => {
  return post(`delete/email-template/${email_template_id}`);
};

const defaultSetEmailTemplate = (email_template_id, body) => {
  return post(`default/email-template/${email_template_id}`, body);
};

export {
  AddExapenseData,
  GetExpenseData,
  EditExpenseData,
  deleteExpenseDetail,
  updateExpenseData,
  checkPendingExpenseData,
  sendEmailExpenseData,
  bankDetailsExpenseData,
  createDocumentNotes,
  emailExpenseTemplete,
  cancelExpenseDetail,
  bankExpenseId,
  createPaymentAPI,
  addEmailExpenseTemplete,
  getEmailExpenseTemplete,
  editEmailExpenseTemplete,
  updateEmailExpenseTemplete,
  deleteEmailExpenseTemplete,
  defaultSetEmailTemplate,
  updatePaymentAPI,
  EditPaymentData,
};
