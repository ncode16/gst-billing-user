import "./DocumentNew.css";
// ** React Import
import { useState, useEffect, useRef } from "react";
import { CheckOutlined } from "@ant-design/icons";
import { Space, Switch } from "antd";
import jwtDecode from "jwt-decode";
import {
  addEmailExpenseTemplete,
  getEmailExpenseTemplete,
  editEmailExpenseTemplete,
  updateEmailExpenseTemplete,
  deleteEmailExpenseTemplete,
  defaultSetEmailTemplate,
} from "../../../api/expenseDataManage/expenseManagement";

// ** Custom Components
import Sidebar from "../../../@core/components/sidebar";

// ** Utils
import { selectThemeColors } from "../../../utility/Utils";

// import Select from 'react-select'
import classnames from "classnames";
import { useForm, Controller } from "react-hook-form";

// ** Reactstrap Imports
import {
  Button,
  Label,
  FormText,
  Form,
  Input,
  Row,
  Col,
  Tooltip,
  Nav,
  NavItem,
  NavLink,
  Modal,
  ModalHeader,
} from "reactstrap";
import {
  Select,
  Collapse,
  Upload,
  message,
  Drawer,
  Tabs,
  Card,
  Empty,
} from "antd";
import { Option } from "antd/es/mentions";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// ** Store & Actions
import { useDispatch } from "react-redux";
import { Heart, Plus } from "react-feather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faInr,
  faCircleInfo,
  faArrowRight,
  faSignature,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import { CaretRightOutlined, PlusOutlined } from "@ant-design/icons";

import AddEmailTemplete from "./addEditTemplete";
// ** Third Party Components
import Flatpickr from "react-flatpickr";
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
} from "react-feather";

// react bootstrap imports
import { Popover, Overlay } from "react-bootstrap";
// ** Reactstrap Imports
import {
  ModalBody,
  InputGroup,
  InputGroupText,
  FormFeedback,
  CardHeader,
  CardTitle,
  CardBody,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { log } from "util";
import zIndex from "@mui/material/styles/zIndex";

const DocumentNew = ({
  open,
  showDocumentNew,
  getEmailTemplateDataHandler,
  emailTemplateList,
}) => {
  const [data, setData] = useState(null);
  const [plan, setPlan] = useState("basic");
  const [role, setRole] = useState("subscriber");
  const [selectedOption, setSelectedOption] = useState("");
  const [imageUrl, setImageUrl] = useState();
  const [active, setActive] = useState("1");
  const [mode, setMode] = useState("top");
  const [getDefaultValue, setDefaultValue] = useState(true);
  const handleModeChange = (e) => {
    setMode(e.target.value);
  };
  const [invoiceNotes, setInvoiceNotes] = useState(false);
  const [invoiceTerms, setInvoiceTerms] = useState(false);
  const [purchaseNotes, setPurchaseNotes] = useState(false);
  const [purchaseTerms, setPurchaseTerms] = useState(false);
  const [quotationNotes, setQuotationNotes] = useState(false);
  const [quotationTerms, setQuotationTerms] = useState(false);
  const [emailTemplates, setEmailTemplates] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const enableEditMode = () => {
    setIsEditMode(true);
  };
  const {
    reset,
    control,
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [reactEditTemplateValue, setReactEditTemplateValue] = useState({
    email_text: "",
    email_header: "",
    email_footer: "",
  });
  const [editTemplateValue, setEditTemplateValue] = useState({});
  const [flag, setFlag] = useState(false);

  const createTemplateHandler = (emailTemplateInfo) => {
    const decoded = localStorage.getItem("userDetails");
    const token = jwtDecode(decoded);
    setFlag(!flag);
    if (Object.keys(editTemplateValue).length > 0) {
      updateEmailExpenseTemplete(
        emailTemplateInfo?.email_template_id,
        emailTemplateInfo
      ).then((response) => {
        if (response.status === 200) {
          message.success("Email Template Updated Successfully");
        }
        reset();
        getEmailTemplateDataHandler();
        setEmailTemplates(false);
        setEditTemplateValue({});
      });
    } else {
      const modifiedTemplateInfo = {
        ...emailTemplateInfo,
        user_id: token?.user_id,
      };
      addEmailExpenseTemplete(modifiedTemplateInfo)
        .then((response) => {
          if (response.status === 200) {
            message.success("Email Template Added Successfully");
          }
        })
        .catch((err) => message.error("Something went wrong"));
    }
    reset();
    getEmailTemplateDataHandler();
    setEmailTemplates(false);
  };

  useEffect(() => {
    reset();
  }, [emailTemplates]);

  // console.log(reactQuillValue?.email_header, "header1");
  const editEmailTemplateHandler = (email_template_id) => {
    setFlag(!flag);

    editEmailExpenseTemplete(email_template_id).then((response) => {
      if (response.status === 200) {
        setEditTemplateValue(response?.data?.data);
        setValue("email_template_id", response?.data?.data?.email_template_id);
        setValue("template_name", response?.data?.data?.template_name);
        setValue("email_text", response?.data?.data?.email_text);
        setValue("email_header", response?.data?.data?.email_text);
        setValue("email_text", response?.data?.data?.email_text);
        setValue("email_footer", response?.data?.data?.email_text);
      }
    });
    setEmailTemplates(true);
  };

  const deleteEmailTemplateHandler = (email_template_id) => {
    setFlag(!flag);
    deleteEmailExpenseTemplete(email_template_id).then((response) => {
      if (response.status === 200) {
        message.success("Email Template Deleted Successfully");
      }
    });
    getEmailTemplateDataHandler();
  };

  // Popover delete
  const billingref = useRef(null);
  const [show, setShow] = useState({
    emailTemplateDeletePopover: false,
    shippingDeletePopover: false,
  });
  const [target, setTarget] = useState({
    emailTemplateDeletePopoverTarget: null,
    shippingDeletePopoverTarget: null,
  });
  const deleteBillingAddressPopOver = (event) => {
    setShow((prev) => ({
      ...prev,
      emailTemplateDeletePopover: !show.emailTemplateDeletePopover,
    }));
    setTarget((prev) => ({
      ...prev,
      emailTemplateDeletePopoverTarget: event.target,
    }));
  };

  const getDefaultEmailTemplateIdDefault = (email_template_id, value) => {
    const defaultPayload = {
      isDefault: value,
    };

    defaultSetEmailTemplate(email_template_id, defaultPayload).then(
      (response) => {
        getEmailTemplateDataHandler();
      }
    );
  };

  useEffect(() => {
    getEmailTemplateDataHandler();
  }, []);

  const showInvoiceNotes = () => {
    setInvoiceNotes(true);
  };
  const onInvoiceNotesClose = () => {
    setInvoiceNotes(false);
  };

  const showInvoiceTerms = () => {
    setInvoiceTerms(true);
  };
  const onInvoiceTermsClose = () => {
    setInvoiceTerms(false);
  };

  const showPurchaseNotes = () => {
    setPurchaseNotes(true);
  };
  const onPurchaseNotesClose = () => {
    setPurchaseNotes(false);
  };

  const showPurchaseTerms = () => {
    setPurchaseTerms(true);
  };
  const onPurchaseTermsClose = () => {
    setPurchaseTerms(false);
  };

  const showQuotationNotes = () => {
    setQuotationNotes(true);
  };
  const onQuotationNotesClose = () => {
    setQuotationNotes(false);
  };

  const showQuotationTerms = () => {
    setQuotationTerms(true);
  };
  const onQuotationTermsClose = () => {
    setQuotationTerms(false);
  };

  const onEmailTemplatesClose = () => {
    setEmailTemplates(false);
  };

  // ** Store Vars
  const dispatch = useDispatch();

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  const tabList = [
    {
      key: "invoiceNotes",
      tab: "Invoice Notes",
    },
    {
      key: "invoiceTerms",
      tab: "Invoice Terms",
    },
    {
      key: "purchaseNotes",
      tab: "Purchase Notes",
    },
    {
      key: "purchaseTerms",
      tab: "Purchase Terms",
    },
    {
      key: "quotationNotes",
      tab: "Quotation Notes",
    },
    {
      key: "quotationTerms",
      tab: "Quotation Terms",
    },
    {
      key: "emailTemplates",
      tab: "Email Templates",
    },
  ];

  const contentList = {
    invoiceNotes: (
      <div>
        <div className="note-heading">
          <span className="note-text">
            Note: Active fields will be shown in the Invoice Notes.
          </span>
        </div>
        <div className="empty-text">
          <div className="empty-normal">
            <div className="no-data">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          </div>
        </div>
        <div className="footer">
          <div style={{ marginTop: "50px" }}>
            <button
              type="button"
              className="footer-button"
              onClick={showInvoiceNotes}
            >
              <span className="plus">
                <Plus size={17} />
              </span>
              <span className="button-name">New Invoice Notes</span>
            </button>
            <Drawer
              title={
                <span className="add-item-heading-main-span">
                  <span className="add-item-heading-span add-notes-terms-title">
                    Add/Edit Invoice Notes
                  </span>
                  <span>
                    <Button color="primary" className="save-update-button">
                      Save
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        style={{ marginLeft: "5px" }}
                      />
                    </Button>
                  </span>
                </span>
              }
              zIndex={1250}
              width={500}
              closable={true}
              onClose={onInvoiceNotesClose}
              open={invoiceNotes}
              className="add-notes-terms"
            >
              <div className="basic-details-card">
                <div className="basic-details-card-body">
                  <Form>
                    <div>
                      <Label className="basic-details-label">Label:</Label>
                      <Input
                        type="text"
                        name="invoice_label"
                        className="vendor-name"
                        placeholder="Label"
                      />
                    </div>
                    <div className="field-down">
                      <Label className="basic-details-label">Notes:</Label>
                      <TextArea
                        name="invoice_notes"
                        placeholder="Notes"
                        rows={7}
                      />
                    </div>
                  </Form>
                </div>
              </div>
              {/* <div className='button-position save-btn'>
                <Button color='primary' className='save-update-button' style={{ marginRight: '8px' }}>Save<FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '5px' }} /></Button>
                <button className='button-close' type='submit'>Close</button>
              </div> */}
              <footer className="create-exp-footer-edit-temp">
                <div className="edit-temp-footer-email">
                  <button className="document-save-btn">
                    Save
                    <ArrowRight />
                  </button>
                  <button className="payout-btn1">Close</button>
                </div>
              </footer>
            </Drawer>
          </div>
        </div>
      </div>
    ),
    invoiceTerms: (
      <div>
        <div className="note-heading">
          <span className="note-text">
            Note: Active fields will be shown in the Invoice Terms.
          </span>
        </div>
        <div className="empty-text">
          <div className="empty-normal">
            <div className="no-data">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          </div>
        </div>
        <div className="footer">
          <div style={{ marginTop: "50px" }}>
            <button
              type="button"
              className="footer-button"
              onClick={showInvoiceTerms}
            >
              <span className="plus">
                <Plus size={17} />
              </span>
              <span className="button-name">New Invoice Terms</span>
            </button>
            <Drawer
              title={
                <span className="add-item-heading-main-span">
                  <span className="add-item-heading-span add-notes-terms-title">
                    Add/Edit Invoice Terms
                  </span>
                  <span>
                    <Button color="primary" className="save-update-button">
                      Save
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        style={{ marginLeft: "5px" }}
                      />
                    </Button>
                  </span>
                </span>
              }
              zIndex={1250}
              width={500}
              // width={320}
              closable={true}
              onClose={onInvoiceTermsClose}
              open={invoiceTerms}
              className="add-notes-terms"
            >
              <div className="basic-details-card">
                <div className="basic-details-card-body">
                  <Form>
                    <div>
                      <Label className="basic-details-label">Label:</Label>
                      <Input
                        type="text"
                        name="invoice_label"
                        className="vendor-name"
                        placeholder="Label"
                      />
                    </div>
                    <div className="field-down">
                      <Label className="basic-details-label">Terms:</Label>
                      <TextArea
                        name="invoice_notes"
                        placeholder="Terms"
                        rows={7}
                      />
                    </div>
                  </Form>
                </div>
              </div>
              {/* <div className='button-position save-btn'>
                <Button color='primary' className='save-update-button' style={{ marginRight: '8px' }}>Save<FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '5px' }} /></Button>
                <button className='button-close' type='submit'>Close</button>
              </div> */}
              <footer className="create-exp-footer-edit-temp">
                <div className="edit-temp-footer-email">
                  <button className="payout-btn">
                    Save
                    <ArrowRight />
                  </button>
                  <button className="payout-btn1">Close</button>
                </div>
              </footer>
            </Drawer>
          </div>
        </div>
      </div>
    ),
    purchaseNotes: (
      <div>
        <div className="note-heading">
          <span className="note-text">
            Note: Active fields will be shown in the Purchase Notes.
          </span>
        </div>
        <div className="empty-text">
          <div className="empty-normal">
            {/* <div className='no-data'>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div> */}
          </div>
        </div>
        <div className="footer">
          <div style={{ marginTop: "110px" }}>
            <button
              type="button"
              className="footer-button"
              onClick={showPurchaseNotes}
            >
              <span className="plus">
                <Plus size={17} />
              </span>
              <span className="button-name">New Purchase Notes</span>
            </button>
            <Drawer
              title={
                <span className="add-item-heading-main-span">
                  <span className="add-item-heading-span add-notes-terms-title">
                    Add/Edit Purchase Notes
                  </span>
                  <span>
                    <Button color="primary" className="save-update-button">
                      Save
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        style={{ marginLeft: "5px" }}
                      />
                    </Button>
                  </span>
                </span>
              }
              // width={320}
              zIndex={1250}
              width={500}
              closable={true}
              onClose={onPurchaseNotesClose}
              open={purchaseNotes}
              className="add-notes-terms"
            >
              <div className="basic-details-card">
                <div className="basic-details-card-body">
                  <Form>
                    <div>
                      <Label className="basic-details-label">Label:</Label>
                      <Input
                        type="text"
                        name="invoice_label"
                        className="vendor-name"
                        placeholder="Label"
                      />
                    </div>
                    <div className="field-down">
                      <Label className="basic-details-label">Notes:</Label>
                      <TextArea
                        name="invoice_notes"
                        placeholder="Notes"
                        rows={7}
                      />
                    </div>
                  </Form>
                </div>
              </div>
              {/* <div className='button-position save-btn'>
                <Button color='primary' className='save-update-button' style={{ marginRight: '8px' }}>Save<FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '5px' }} /></Button>
                <button className='button-close' type='submit'>Close</button>
              </div> */}
              <footer className="create-exp-footer-edit-temp">
                <div className="edit-temp-footer-email">
                  <button className="payout-btn">
                    Save
                    <ArrowRight />
                  </button>
                  <button className="payout-btn1">Close</button>
                </div>
              </footer>
            </Drawer>
          </div>
        </div>
      </div>
    ),
    purchaseTerms: (
      <div>
        <div className="note-heading">
          <span className="note-text">
            Note: Active fields will be shown in the Purchase Terms.
          </span>
        </div>
        <div className="empty-text">
          <div className="empty-normal">
            <div className="no-data">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          </div>
        </div>
        <div className="footer">
          <div style={{ marginTop: "50px" }}>
            <button
              type="button"
              className="footer-button"
              onClick={showPurchaseTerms}
            >
              <span className="plus">
                <Plus size={17} />
              </span>
              <span className="button-name">New Purchase Terms</span>
            </button>
            <Drawer
              title={
                <span className="add-item-heading-main-span">
                  <span className="add-item-heading-span add-notes-terms-title">
                    Add/Edit Purchase Terms
                  </span>
                  <span>
                    <Button color="primary" className="save-update-button">
                      Save
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        style={{ marginLeft: "5px" }}
                      />
                    </Button>
                  </span>
                </span>
              }
              // width={320}
              zIndex={1250}
              width={500}
              closable={true}
              onClose={onPurchaseTermsClose}
              open={purchaseTerms}
              className="add-notes-terms"
            >
              <div className="basic-details-card">
                <div className="basic-details-card-body">
                  <Form>
                    <div>
                      <Label className="basic-details-label">Label:</Label>
                      <Input
                        type="text"
                        name="invoice_label"
                        className="vendor-name"
                        placeholder="Label"
                      />
                    </div>
                    <div className="field-down">
                      <Label className="basic-details-label">Terms:</Label>
                      <TextArea
                        name="invoice_notes"
                        placeholder="Notes"
                        rows={7}
                      />
                    </div>
                  </Form>
                </div>
              </div>
              {/* <div className='button-position save-btn'>
                <Button color='primary' className='save-update-button' style={{ marginRight: '8px' }}>Save<FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '5px' }} /></Button>
                <button className='button-close' type='submit'>Close</button>
              </div> */}
              <footer className="create-exp-footer-edit-temp">
                <div className="edit-temp-footer-email">
                  <button className="payout-btn">
                    Save
                    <ArrowRight />
                  </button>
                  <button className="payout-btn1">Close</button>
                </div>
              </footer>
            </Drawer>
          </div>
        </div>
      </div>
    ),
    quotationNotes: (
      <div>
        <div className="note-heading">
          <span className="note-text">
            Note: Active fields will be shown in the Quotation Notes.
          </span>
        </div>
        <div className="empty-text">
          <div className="empty-normal">
            <div className="no-data">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          </div>
        </div>
        <div className="footer">
          <div style={{ marginTop: "50px" }}>
            <button
              type="button"
              className="footer-button"
              onClick={showQuotationNotes}
            >
              <span className="plus">
                <Plus size={17} />
              </span>
              <span className="button-name">New Quotation Notes</span>
            </button>
            <Drawer
              title={
                <span className="add-item-heading-main-span">
                  <span className="add-item-heading-span add-notes-terms-title">
                    Add/Edit Quotation Notes
                  </span>
                  <span>
                    <Button color="primary" className="save-update-button">
                      Save
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        style={{ marginLeft: "5px" }}
                      />
                    </Button>
                  </span>
                </span>
              }
              // width={320}
              // closable={false}
              zIndex={1250}
              width={500}
              closable={true}
              onClose={onQuotationNotesClose}
              open={quotationNotes}
              className="add-notes-terms"
            >
              <div className="basic-details-card">
                <div className="basic-details-card-body">
                  <Form>
                    <div>
                      <Label className="basic-details-label">Label:</Label>
                      <Input
                        type="text"
                        name="invoice_label"
                        className="vendor-name"
                        placeholder="Label"
                      />
                    </div>
                    <div className="field-down">
                      <Label className="basic-details-label">Notes:</Label>
                      <TextArea
                        name="invoice_notes"
                        placeholder="Notes"
                        rows={7}
                      />
                    </div>
                  </Form>
                </div>
              </div>
              {/* <div className='button-position save-btn'>
                <Button color='primary' className='save-update-button' style={{ marginRight: '8px' }}>Save<FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '5px' }} /></Button>
                <button className='button-close' type='submit'>Close</button>
              </div> */}
              <footer className="create-exp-footer-edit-temp">
                <div className="edit-temp-footer-email">
                  <button className="payout-btn">
                    Save
                    <ArrowRight />
                  </button>
                  <button className="payout-btn1">Close</button>
                </div>
              </footer>
            </Drawer>
          </div>
        </div>
      </div>
    ),
    quotationTerms: (
      <div>
        <div className="note-heading">
          <span className="note-text">
            Note: Active fields will be shown in the Quotation Terms.
          </span>
        </div>
        <div className="empty-text">
          <div className="empty-normal">
            <div className="no-data">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          </div>
        </div>
        <div className="footer">
          <div style={{ marginTop: "50px" }}>
            <button
              type="button"
              className="footer-button"
              onClick={showQuotationTerms}
            >
              <span className="plus">
                <Plus size={17} />
              </span>
              <span className="button-name">New Quotation Terms</span>
            </button>
            <Drawer
              title={
                <span className="add-item-heading-main-span">
                  <span className="add-item-heading-span add-notes-terms-title">
                    Add/Edit Quotation Terms
                  </span>
                  <span>
                    <Button color="primary" className="save-update-button">
                      Save
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        style={{ marginLeft: "5px" }}
                      />
                    </Button>
                  </span>
                </span>
              }
              // width={320}
              // closable={false}
              zIndex={1250}
              width={500}
              closable={true}
              onClose={onQuotationTermsClose}
              open={quotationTerms}
              className="add-notes-terms"
            >
              <div className="basic-details-card">
                <div className="basic-details-card-body">
                  <Form>
                    <div>
                      <Label className="basic-details-label">Label:</Label>
                      <Input
                        type="text"
                        name="invoice_label"
                        className="vendor-name"
                        placeholder="Label"
                      />
                    </div>
                    <div className="field-down">
                      <Label className="basic-details-label">Terms:</Label>
                      <TextArea
                        name="invoice_notes"
                        placeholder="Terms"
                        rows={7}
                      />
                    </div>
                  </Form>
                </div>
              </div>
              {/* <div className='button-position save-btn'>
                <Button color='primary' className='save-update-button' style={{ marginRight: '8px' }}>Save<FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '5px' }} /></Button>
                <button className='button-close' type='submit'>Close</button>
              </div> */}
              <footer className="create-exp-footer-edit-temp">
                <div className="edit-temp-footer-email">
                  <button className="payout-btn">
                    Save
                    <ArrowRight />
                  </button>
                  <button className="payout-btn1">Close</button>
                </div>
              </footer>
            </Drawer>
          </div>
        </div>
      </div>
    ),
    emailTemplates: (
      <div>
        <div className="note-heading">
          <span className="note-text">
            Note: Active fields will be shown in the Email Templates.
          </span>
        </div>
        <div className="empty-text">
          <div className="empty-normal">
            {emailTemplateList?.length > 0 ? (
              <div>
                {emailTemplateList &&
                  emailTemplateList.map((item) => {
                    return (
                      <div className="Edit-temp-switch-button">
                        <div className="templete-head-switch">
                          <h3>{item?.template_name}</h3>
                          <h4>{item?.email_text.replace(/<\/?p>/g, "")}</h4>
                        </div>
                        <div className="templete-switch-button">
                          <Switch
                            checkedChildren="Default"
                            unCheckedChildren="Not Default"
                            checked={item?.is_default}
                            onChange={(value) => {
                              getDefaultEmailTemplateIdDefault(
                                item?.email_template_id,
                                value
                              );
                              setDefaultValue(value);
                            }}
                          />

                          <button
                            type="button"
                            className="tem-edit-btn"
                            onClick={() => {
                              editEmailTemplateHandler(item?.email_template_id);
                            }}
                          >
                            Edit
                          </button>

                          <Overlay
                            show={show.emailTemplateDeletePopover}
                            target={target.emailTemplateDeletePopoverTarget}
                            placement="top"
                            container={billingref}
                            containerPadding={20}
                          >
                            <Popover id="popover-contained" placement="top">
                              <Popover.Header as="h3">
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Sure to delete?
                              </Popover.Header>
                              <Popover.Body>
                                <div className="pop-over">
                                  <button
                                    type="button"
                                    className="delete-cancel-template-btn"
                                    onClick={() => {
                                      setShow((prev) => ({
                                        ...prev,
                                        emailTemplateDeletePopover: false,
                                      }));
                                    }}
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    type="button"
                                    className="tem-delete-btn-ok-popover"
                                    onClick={() =>
                                      deleteEmailTemplateHandler(
                                        item?.email_template_id
                                      )
                                    }
                                  >
                                    OK
                                  </button>
                                </div>
                              </Popover.Body>
                            </Popover>
                          </Overlay>

                          <button
                            ref={billingref}
                            type="button"
                            className="tem-delete-btn"
                            onClick={deleteBillingAddressPopOver}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div className="no-data">
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </div>
            )}
          </div>
        </div>
        <div className="footer">
          <div style={{ marginTop: "0px" }}>
            <button
              type="button"
              className="footer-button"
              onClick={() => setEmailTemplates(true)}
            >
              <span className="plus">
                <Plus size={17} />
              </span>
              <span className="button-name">New Email Templates</span>
            </button>
            <Drawer
              title={
                <span className="add-item-heading-main-span">
                  <span className="add-item-heading-span add-notes-terms-title">
                    Add/Edit Email Templates
                  </span>
                  <span>
                    <Button
                      color="primary"
                      onClick={handleSubmit(createTemplateHandler)}
                      className="save-update-button"
                    >
                      Save
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        style={{ marginLeft: "5px" }}
                      />
                    </Button>
                  </span>
                </span>
              }
              // width={320}
              // closable={false}
              zIndex={1250}
              width={"auto"}
              closable={true}
              onClose={onEmailTemplatesClose}
              open={emailTemplates}
              className="add-notes-terms add_email_template"
            >
              <Form>
                <div className="basic-details-card document-notes-card">
                  <div className="basic-details-card-body">
                    <div>
                      <Label className="basic-details-label">
                        Template Name:
                      </Label>
                      <input
                        name="template_name"
                        className="templete-name"
                        type="text"
                        placeholder="Template Name"
                        {...register("template_name", {
                          required: "Enter email template name",
                        })}
                      />
                      {errors?.template_name && (
                        <span className="text-danger">
                          {errors?.template_name?.message}
                        </span>
                      )}
                    </div>

                    <div className="rich-text-editor-all-sec">
                      <div className="rich-text-editor">
                        <label className="template-email-label">
                          Email Header
                        </label>
                        <Controller
                          name="email_header"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <ReactQuill
                              theme="snow"
                              value={watch("email_header")}
                              onChange={(value) =>
                                setValue("email_header", value)
                              }
                              placeholder="Email Header"
                            />
                          )}
                        />
                      </div>
                      <div className="rich-text-editor">
                        <label>Email Text</label>

                        <Controller
                          name="email_text"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: "Email text cannot be empty",
                          }}
                          render={({ field }) => (
                            <ReactQuill
                              theme="snow"
                              value={watch("email_text")}
                              onChange={(value) => {
                                setValue("email_text", value);
                              }}
                              placeholder="Payment Receipt for Payment #PAYOUT-25"
                            />
                          )}
                        />
                        {errors.email_text && (
                          <span className="text-danger">
                            {errors.email_text.message}
                          </span>
                        )}
                      </div>
                      <div className="rich-text-editor">
                        <label>Email Footer</label>

                        <Controller
                          name="email_footer"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <ReactQuill
                              theme="snow"
                              value={watch("email_footer")}
                              onChange={(value) =>
                                setValue("email_footer", value)
                              }
                              placeholder="Email Footer"
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <footer className="create-exp-footer-edit-temp">
                  <div className="edit-temp-footer-email">
                    <button
                      className="email-template-save-btn"
                      onClick={handleSubmit(createTemplateHandler)}
                      type="button"
                    >
                      Save
                      <ArrowRight />
                    </button>
                    <button className="email-template-payout-btn">Close</button>
                  </div>
                </footer>
              </Form>
            </Drawer>
          </div>
        </div>
      </div>
    ),
  };

  const [activeTabKey1, setActiveTabKey1] = useState("emailTemplates");
  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };

  //addEditNewForm here
  const [newTemplete, setNewBank] = useState(false);
  const addEditTemplete = () => setNewBank(!newTemplete);
  const [activeTabKey2, setActiveTabKey2] = useState("InvoiceNotes");
  const onTab2Change = (key) => {
    setActiveTabKey2(key);
  };
  // ** Custom close btn
  const CloseBtn = (
    <X
      className="cursor-pointer-document"
      size={15}
      onClick={showDocumentNew}
    />
  );

  return (
    <>
      <Modal
        isOpen={open}
        toggle={showDocumentNew}
        // className='sidebar-sm'
        className={"addExpenseWidth-documentNotes"}
        modalClassName="modal-slide-in"
        contentClassName="pt-0"
      >
        <div className="all-section">
          <div className="create-document-head-Arrow">
            <div className="head-button-main-Arrow">
              <ModalHeader
                className="head-button"
                toggle={showDocumentNew}
                close={CloseBtn}
              >
                <h3>Document Notes</h3>
              </ModalHeader>
            </div>
            <button
              type="button"
              onClick={showDocumentNew}
              className="head-button-one-document"
            >
              Save
              <ArrowRight />
            </button>
          </div>

          <div className="create-document-new">
            <div className="create-form-document">
              <div className="document-tab-list">
                <Card
                  style={{
                    width: "100%",
                  }}
                  tabList={tabList}
                  activeTabKey={activeTabKey1}
                  onTabChange={onTab1Change}
                >
                  {contentList[activeTabKey1]}
                </Card>
              </div>
              <hr />
              {/* <div className='document-empty-img'>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </div> */}

              <div className="document-change-btn">
                <Card className="change-btn-document">
                  {/* <div className='document-btn-span'>
                    <button type='button' onClick={addEditTemplete}></button>
                  </div> */}
                </Card>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <footer className="create-document-footer">
              <div className="document-save-btn">
                <button
                  type="button"
                  className="document-btn"
                  // onClick={handleSubmit(createTemplateHandler)}
                  onClick={showDocumentNew}
                >
                  Save
                  <ArrowRight />
                </button>
                <button
                  className="document-close-btn"
                  onClick={showDocumentNew}
                >
                  Close
                </button>
              </div>
            </footer>
          </div>
        </div>
        <AddEmailTemplete
          open={newTemplete}
          addEditTemplete={addEditTemplete}
        ></AddEmailTemplete>
      </Modal>
    </>
  );
};

export default DocumentNew;
