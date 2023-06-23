//Attached File

import { Button, message, Upload, DatePicker, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./sendEmail.module.css";
import DocumentNew from "./DocumentNew";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PreviewPage from "./PreviewPage";
import { ReactMultiEmail, isEmail } from "react-multi-email";
import { sendEmailExpenseData } from "../../../api/expenseDataManage/expenseManagement";
import { useForm, Controller } from "react-hook-form";
import { selectThemeColors } from "../../../utility/Utils";
import { Cascader, InputNumber, Space, Form, Select } from "antd";
import { useEffect, useRef, useState } from "react";
import Flatpickr from "react-flatpickr";
import "react-multi-email/dist/style.css";

import {
  User,
  Briefcase,
  Mail,
  Calendar,
  DollarSign,
  X,
  Share,
  Play,
  ArrowRight,
  Info,
} from "react-feather";

import {
  Modal,
  Input,
  Label,
  ModalHeader,
  ModalBody,
  InputGroup,
  InputGroupText,
  FormFeedback,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { getEmailExpenseTemplete } from "../../../api/expenseDataManage/expenseManagement";
//ToolTIp is here
const UPI = (
  <span>
    A UPI ID or VPA (Virtual Payment Address) is a unique ID that is used to
    make UPI payments in place of bank account details. This UPI ID will be used
    to generate Dynamic QR codes on the invoices and bills.
  </span>
);
const buttonWidth = 70;
const gap = 8;
const btnProps = {
  style: {
    width: buttonWidth,
  },
};

const SendEmail = ({ open, showEmailDrawer, props }) => {
  const [emailTemplateList, setEmailTemplateList] = useState([]);
  const [emails, setEmails] = useState([]);
  const [focused, setFocused] = useState(false);

  const getEmailTemplateDataHandler = () => {
    getEmailExpenseTemplete()
      .then((response) => {
        if (response.status === 200) {
          setEmailTemplateList(response?.data?.data);
          const setEmailTemplate = response?.data?.data?.filter(
            (ele) => ele?.is_default === true
          );
          setValue("templateId", setEmailTemplate[0].template_name);
          setValue("email_header", setEmailTemplate[0]?.email_header);
          setValue("email_footer", setEmailTemplate[0]?.email_footer);
          setValue("email_body", setEmailTemplate[0]?.email_text);
        }
      })
      .catch((err) => message.error("Something went wrong"));
  };

  useEffect(() => {
    reset();
    getEmailTemplateDataHandler();
    setValue("email", []);
  }, [open]);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm();

  const data = watch();

  const onSubmit = (data) => {
    const body = {
      email: data.email,
      cc: data.emailCC,
      bcc: data.emailBCC,
      subject: data.subject,
      email_header: data?.email_header,
      email_body: data?.email_body,
      email_footer: data?.email_footer,
    };
    sendEmailExpenseData(body)
      .then((response) => {
        if (response.status === 200) {
          message.success("Email Sent Successfully");
        }
      })
      .catch((error) => {
        console.log("data not found");
      });
    showEmailDrawer();
  };

  const [centeredModal, setCenteredModal] = useState(false);
  const handlePreviewTemplate = () => {
    setCenteredModal(!centeredModal);
  };
  const [document, setNewDocument] = useState(false);
  const showDocumentNew = () => setNewDocument(!document);

  const [carbonCopy, setCarbonCopy] = useState(false);
  const [blindCarbonCopy, setBlindCarbonCopy] = useState(false);

  const handleCarbonCopy = () => {
    setCarbonCopy(true);
  };
  const handleBlindCarbonCopy = () => {
    setBlindCarbonCopy(true);
  };

  // ** Custom close btn
  const CloseBtn = (
    <X
      className="cursor-pointer-send-email"
      size={15}
      onClick={showEmailDrawer}
    />
  );
  return (
    <>
      <Modal
        isOpen={open}
        toggle={showEmailDrawer}
        className={`${styles.add_expense_width_send_email} `}
        modalClassName="modal-slide-in"
        contentClassName="pt-0"
      >
        <div>
          <div className={styles.create_payout_head_arrow}>
            <div className={styles.head_button_main_arrow}>
              <ModalHeader
                className={styles.head_button}
                toggle={showEmailDrawer}
                close={CloseBtn}
              >
                <h3>Send Email</h3>
              </ModalHeader>
            </div>
            <button className={styles.head_button_one}>Send Mail</button>
          </div>
          <Form
            className={styles.amount_page_send_email}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={styles.create_expense_head_send_email}>
              <div className={styles.create_form_expense}>
                <Row>
                  <Col md="100">
                    <div className={styles.send_email_sec}>
                      <div className={styles.hide_show_cc}>
                        <div className={styles.show_to}>
                          <span>To</span>
                        </div>
                        <div className={styles.show_cc_bcc}>
                          <div className={styles.show_cc}>
                            {carbonCopy ? null : (
                              <span onClick={handleCarbonCopy}>CC</span>
                            )}
                          </div>
                          <div className={styles.show_cc}>
                            {blindCarbonCopy ? null : (
                              <span onClick={handleBlindCarbonCopy}>BCC</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <Controller
                        control={control}
                        name="email"
                        rules={{
                          required:
                            watch("email")?.length === 0 &&
                            "Please Select the email",
                        }}
                        render={({ field }) => (
                          <ReactMultiEmail
                            className={styles.multiInput}
                            emails={emails}
                            onChange={(value) => {
                              setValue("email", value);
                            }}
                            autoFocus={true}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                            getLabel={(email, index, removeEmail) => {
                              return (
                                <div data-tag key={index}>
                                  <div data-tag-item>{email}</div>
                                  <span
                                    data-tag-handle
                                    onClick={() => removeEmail(index)}
                                  >
                                    ×
                                  </span>
                                </div>
                              );
                            }}
                          />
                        )}
                      />
                      {errors.email && (
                        <div className={styles.error_message}>
                          {errors.email.message}
                        </div>
                      )}
                      {carbonCopy ? (
                        <div className={styles.show_to}>
                          <label>CC</label>
                          <Controller
                            control={control}
                            name="emailCC"
                            render={({ field }) => (
                              <ReactMultiEmail
                                className={styles.multiInput}
                                emails={emails}
                                onChange={(value) => {
                                  setValue("emailCC", value);
                                }}
                                autoFocus={true}
                                onFocus={() => setFocused(true)}
                                onBlur={() => setFocused(false)}
                                getLabel={(email, index, removeEmail) => {
                                  return (
                                    <div data-tag key={index}>
                                      <div data-tag-item>{email}</div>
                                      <span
                                        data-tag-handle
                                        onClick={() => removeEmail(index)}
                                      >
                                        ×
                                      </span>
                                    </div>
                                  );
                                }}
                              />
                            )}
                          />
                        </div>
                      ) : null}

                      {blindCarbonCopy ? (
                        <div className={styles.show_to}>
                          <label>BCC</label>
                          <Controller
                            control={control}
                            name="emailBCC"
                            render={({ field }) => (
                              <ReactMultiEmail
                                className={styles.multiInput}
                                emails={emails}
                                onChange={(value) => {
                                  setValue("emailBCC", value);
                                }}
                                autoFocus={true}
                                onFocus={() => setFocused(true)}
                                onBlur={() => setFocused(false)}
                                getLabel={(email, index, removeEmail) => {
                                  return (
                                    <div data-tag key={index}>
                                      <div data-tag-item>{email}</div>
                                      <span
                                        data-tag-handle
                                        onClick={() => removeEmail(index)}
                                      >
                                        ×
                                      </span>
                                    </div>
                                  );
                                }}
                              />
                            )}
                          />
                        </div>
                      ) : null}
                      <div className={styles.send_email_show_input}>
                        <label>Subject</label>
                        <input
                          className={styles.input_bank}
                          type="text"
                          placeholder="Payment #PAYOUT-25"
                          {...register("subject")}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
            <div className={styles.email_body_sec}>
              <div className={styles.email_body}>
                <h5>Email Body</h5>
              </div>
              <div className={styles.email_select} onClick={showDocumentNew}>
                <div className={styles.font_awesome}>
                  <FontAwesomeIcon icon={faCirclePlus} />
                  <h5>Add/Select Template</h5>
                </div>
              </div>
            </div>
            <div className={styles.create_expense_head_send}>
              <div className={styles.create_form_expense_send}>
                <div className={styles.form_email_sec}>
                  <div className={styles.email_templete}>
                    <label>Email</label>
                    <label>Template</label>
                    {emailTemplateList?.length > 0 ? (
                      <Controller
                        control={control}
                        name="templateId"
                        render={({ field }) => (
                          <Select
                            onChange={(value) => {
                              setValue("templateId", value);
                            }}
                            value={watch("templateId")}
                          >
                            {emailTemplateList?.map((item) => (
                              <Select.Option value={item.template_name}>
                                <span>{item?.template_name}</span>
                              </Select.Option>
                            ))}
                          </Select>
                        )}
                      />
                    ) : (
                      <button onClick={showDocumentNew}>Add Template</button>
                    )}
                  </div>

                  <div className={styles.email_web}>
                    <span>(Only available on web)</span>
                    <a href="#" onClick={handlePreviewTemplate}>
                      Preview Template
                    </a>
                  </div>
                  <div className={styles.rich_text_editor_all_sec}>
                    <div className={styles.rich_text_editor}>
                      <label>Email Header</label>
                      <Controller
                        control={control}
                        name="email_header"
                        render={({ field }) => (
                          <ReactQuill
                            theme="snow"
                            value={watch("email_header")}
                            onChange={(value) => {
                              setValue("email_header", value);
                            }}
                            placeholder="Email Header"
                          />
                        )}
                      />
                    </div>
                    <br />
                    <br />
                    <div className={styles.rich_text_editor}>
                      <label>Email Body</label>
                      <Controller
                        control={control}
                        name="email_body"
                        render={({ field }) => (
                          <ReactQuill
                            theme="snow"
                            value={watch("email_body")}
                            onChange={(value) => {
                              setValue("email_body", value);
                            }}
                            placeholder="Email Body"
                          />
                        )}
                      />
                    </div>
                    <br />
                    <br />
                    <div className={styles.rich_text_editor}>
                      <label>Email Footer</label>
                      <Controller
                        control={control}
                        name="email_footer"
                        render={({ field }) => (
                          <ReactQuill
                            theme="snow"
                            value={watch("email_footer")}
                            onChange={(value) => {
                              setValue("email_footer", value);
                            }}
                            placeholder="Email Footer"
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className={styles.send_mail_paragraph}>
                    <p>
                      *PDF Attachment will be sent along with the email by
                      default.
                    </p>
                  </div>
                </div>
                {/* </Form> */}
              </div>
            </div>
            <div>
              <footer className={styles.create_exp_footer}>
                <div className={styles.exp_footer_btn}>
                  <button type="button" onClick={handleSubmit(onSubmit)}>
                    Send Mail
                  </button>
                </div>
              </footer>
            </div>
          </Form>
        </div>
        <DocumentNew
          open={document}
          showDocumentNew={showDocumentNew}
          getEmailTemplateDataHandler={getEmailTemplateDataHandler}
          emailTemplateList={emailTemplateList}
        ></DocumentNew>
        <PreviewPage
          open={centeredModal}
          handlePreviewTemplate={handlePreviewTemplate}
        ></PreviewPage>
      </Modal>
    </>
  );
};

export default SendEmail;
