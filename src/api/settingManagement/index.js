import { post, get } from "../../utility/client";

const addUpdatedSetting = (document_id,body) => {
  return post(`update/document-setting/${document_id}`, body);
};

const getDocumentSetting = () => {
  return get("document-setting");
};

const editSettingDataRetrive = (document_id) => {
  return get(`get/document-setting/${document_id}`);
};

export {
  addUpdatedSetting,
  getDocumentSetting,
  editSettingDataRetrive,
};
