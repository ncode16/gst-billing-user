import { post, get } from "../../utility/client";

const AddNewInvoiceData = (body) => {
  return post("create/invoice", body);
};

export { AddNewInvoiceData };
