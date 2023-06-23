import React from "react";
import { useState, useEffect } from "react";
import "./quotation.css";
import "./product/create.css";
import { Input, Label, Row, Col, Button, Table } from "reactstrap";
import "../../apps/sales/sales.css";
// react feather import
import {
  ChevronLeft,
  Settings,
  ChevronDown,
  Plus,
  Play,
  PlusCircle,
  ArrowRight,
} from "react-feather";
import { useNavigate } from "react-router-dom";
// import { Label } from 'recharts'
import { QuestionCircleFilled, UploadOutlined } from "@ant-design/icons";
// Antd import antd
import {
  DatePicker,
  Space,
  Tooltip,
  Cascader,
  InputNumber,
  Collapse,
  Upload,
  Switch,
  Select,
  Drawer,
  Checkbox,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { Option } from "antd/es/mentions";
// Api AddCustomerManagement imports
import { getCustomerDataHandler } from "../../../api/addCustomerManagement/index";
// react bootstrap import
import { Form, InputGroup } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";

// Font Awesome import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faBarcode,
  faBuildingColumns,
  faPencil,
  faArrowRight,
  faPlus,
  faXmark,
  faInr,
  faIndianRupeeSign
} from "@fortawesome/free-solid-svg-icons";

// Shipping-Address-management import

import "react-multi-email/dist/style.css";
import { selectThemeColors } from "../../../utility/Utils";
import AddCustomerForm from "../../../components/CommonForm/add-customer";
import AddBankForm from "../../../components/CommonForm/add-bank";
import { addNewBankData, getNewBankData } from "../../../api/bank/index";
import AddProductForm from "../../../components/CommonForm/add-product";
import { getCustomerDetails } from "../../../api/addCustomerManagement/index";
import AddSignatureForm from "../../../components/CommonForm/signature-form";
import { getNewSignatureData } from "../../../api/signature";
import {
  getProductDetails,
  productList,
} from "../../../api/addProductManagement";
import DocumentSettingForm from "../../../components/CommonForm/document-setting";
import {
  editSettingDataRetrive,
  getDocumentSetting,
} from "../../../api/settingManagement";

<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
/>;

const productText = (
  <span>
    <small>
      Search your existing products using the search box below.
      <br />
      Please click on <b>Add New Product</b> to add a new product.
    </small>
  </span>
);

const customerText = (
  <span>
    <small>
      Search your existing customers using the search box below.
      <br />
      Please click on <b>Add New Customer</b> to add a new customer.
    </small>
  </span>
);

const dueDtaeText = (
  <span>
    <small>
      The invoice due date is the date on which you expect to receive payment
      from your customer.
    </small>
  </span>
);

const referenceText = (
  <span>
    <small>
      Reference is commonly used to save information like Purchase Order Number,
      Eway Bill Number, Sales Person names, Shipment Number etc...
    </small>
  </span>
);

const totalAmountText = (
  <span>
    <small>
      Extra discount is directly deducted to the total invoice amount. It does
      not affect the <b>tax calculations</b>. To affect tax calculation give
      product level discount.
    </small>
  </span>
);

const { Panel } = Collapse;

const notesText = (
  <span>
    <small>
      For the same notes to reflect on all invoices, fill in the notes in
      Settings → Notes and Terms → Customer notes
    </small>
  </span>
);

const termConditionText = (
  <span>
    <small>
      For the same terms to reflect on all invoices, fill in the terms in
      Settings → Notes and Terms → Customer Terms and Conditions
    </small>
  </span>
);

const fileText = (
  <spaan>
    <small>
      You can attach up to 3 files (3 MB each) to each transaction you create.
    </small>
  </spaan>
);

const bankText = (
  <span>
    <small>
      Select existing Bank details using the below dropdown. Please click on Add
      New Bank to <b>add new Bank</b> details.
    </small>
  </span>
);

const Index = () => {
  const [show, setShow] = useState(false);
  const [showTds, setShowTds] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  // additional charges toggle state
  const [openAdditionalChargesToggle, setOpenAdditionalChargesToggle] =
    useState(false);
  const additionalCharge = () => {
    setOpenAdditionalChargesToggle(!openAdditionalChargesToggle);
  };
  // setting sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // customer data listing state
  const [customersList, setCustomersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [getBankID, setBankID] = useState("");
  const [getDefaultBank, setDefaultBank] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  // open customer form state
  const [openCustomertoggle, setOpenCustomertoggle] = useState(false);
  const [openSingnatureBar, setOpenSignatureBar] = useState(false);
  const [openBankSidebar, setOpenBankSidebar] = useState(false);
  const [bankList, setBankList] = useState([]);
  const [getCustomerTagList, setCustomerTagList] = useState([]);
  const [getProductTagList, setProductTagList] = useState([]);
  const [getCustomerData, setCustomerData] = useState([]);
  const [getProductList, setProductList] = useState([]);
  const [getProductData, setProductData] = useState([]);
  const [getCustomerID, setCustomerID] = useState("");
  const [getProductID, setProuctID] = useState("");
  const [signatureList, setSignatureList] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);
  const [getSettingData, setSettingData] = useState([]);
  const [settingDetail, setSettingDetail] = useState({});
  const [getSettingModal, setSettingModal] = useState(false);

  const getBankListHandler = async () => {
    const bankList = getNewBankData();
    bankList.then((response) => {
      if (response.status === 200) {
        setBankList(response?.data?.data);
      }
    });
  };

  console.log(settingDetail, "settingDetail");

  const getSignatureListHandler = () => {
    const signatureDataList = getNewSignatureData();
    signatureDataList.then((response) => {
      if (response.status === 200) {
        setSignatureList(response?.data?.data);
      }
    });
  };

  // TDS Function
  const showTdsItem = () => {
    if (showTds === false) {
      setShowTds(true);
    } else {
      setShowTds(false);
    }
  };

  const navigate = useNavigate();
  // select search bar onchange
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const getCustomerList = async () => {
    setIsLoading(true);
    getCustomerDataHandler()
      .then((response) => {
        if (response.status === 200) {
          setCustomersList(response?.data?.data);
          setIsLoading(false);
        }
      })
      .catch((err) => message.error("Something went wrong"));
  };

  const getProductListHandler = async () => {
    setIsLoading(true);
    productList()
      .then((response) => {
        if (response.status === 200) {
          setProductList(response?.data?.data);
          setIsLoading(false);
        }
      })
      .catch((err) => message.error("Something went wrong"));
  };

  const getCustomerDetailsHandler = async () => {
    setIsLoading(true);
    getCustomerDetails(getCustomerID)
      .then((response) => {
        if (response.status === 200) {
          setCustomerData(response?.data?.data[0]);
          setIsLoading(false);
          setOpenCustomertoggle(true);
          setCustomerID("");
        }
      })
      .catch((err) => message.error("Something went wrong"));
  };

  const getProductDetailsHandler = async () => {
    setIsLoading(true);
    getProductDetails(getProductID)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data.data, "resposne");
          setProductData(response?.data?.data);
          setIsLoading(false);
          setOpenSidebar(true);
        }
      })
      .catch((err) => message.error("Something went wrong"));
  };

  const selectBox = () => (
    <div className="notes-select">
      <Select
        style={{ width: "290px" }}
        name="product_id"
        placeholder="Search or scan barcode for existing products"
      />
    </div>
  );

  useEffect(() => {
    getCustomerID && getCustomerDetailsHandler();
  }, [getCustomerID]);

  useEffect(() => {
    getProductID && getProductDetailsHandler();
  }, [getProductID]);

  useEffect(() => {
    getBankListHandler();
    getCustomerList();
    getProductListHandler();
    getSignatureListHandler();
  }, []);

  useEffect(() => {
    setDefaultBank(bankList.filter((ele) => ele?.default_bank === true));
  }, [bankList]);

  useEffect(() => {
    const filteredSignature = signatureList.filter(
      (item) => item.signature_id === selectedValue
    );
    if (filteredSignature) {
      setSelectedImage(filteredSignature[0]?.signature_image);
    } else {
      setSelectedImage([]);
    }
  }, [selectedValue]);

  const handleSelectChange = (e) => {
    setSelectedValue(e);
  };

  useEffect(() => {
    setSelectedValue(signatureList?.[0]?.signature_id);
  }, [signatureList]);

  const getSettingDataHandler = async (document_id) => {
    setIsLoading(true);
    editSettingDataRetrive(document_id)
      .then((response) => {
        console.log(response, "edit setting");
        if (response.status === 200) {
          setSettingData(response?.data?.data);
          setIsLoading(false);
          setSettingModal(true);
        }
      })
      .catch((err) => message.error("Something went wrong"));
  };

  const getSetting = async () => {
    getDocumentSetting()
      .then((response) => {
        console.log(response, "Setting");
        if (response.status === 200) {
          setSettingDetail(response?.data?.data);
        }
      })
      .catch((err) => message.error("Something went wrong"));
  };

  useEffect(() => {
    getSetting();
  }, []);

  return (
    <div className="card">
      <Form>
        <div className="card-sub-div">
          <div
            className="inv-icn-inp"
            style={{ display: "flex", alignItems: "center" }}
          >
            <h3
              className="create-inv-header"
              onClick={() =>
                navigate("/apps/quotations/preforma-invoices/list")
              }
            >
              <ChevronLeft />
              Pro Forma Invoices
            </h3>
            <div className="inv-text">
              <span>
                <Input
                  type="text"
                  value={`${settingDetail?.pro_forma_invoice_prefix}`}
                  className="inv-text"
                />
              </span>
              <span>
                <Input type="number" value="1" />
              </span>
            </div>
          </div>
          <div className="checked-div">
            <span>
              <Input className="checked-span" type="checkbox" />
              Bill of Supply
            </span>
            <button
              className="settings"
              type="button"
              onClick={() => {
                getSettingDataHandler(settingDetail?.document_id);
                setSettingModal(true);
              }}
            >
              <span className="settings-icon">
                {" "}
                <Settings size={15} />
              </span>
              Settings
            </button>
          </div>
          <div className="invoice-card-box">
            <Row>
              <Col className="mb-1" xl="4" md="6" sm="12">
                <h6 style={{ display: "flex" }}>
                  <span className="customer-label">Select Customer</span>
                  <span className="question-icon">
                    <Tooltip placement="top" title={customerText}>
                      <QuestionCircleFilled />
                    </Tooltip>
                  </span>
                  <button
                    className="add-invoice-btn"
                    type="button"
                    onClick={() => {
                      setCustomerData([]);
                      setCustomerID("");
                      setOpenCustomertoggle(true);
                    }}
                  >
                    Add New Customer?
                  </button>
                </h6>

                <Select


                  onChange={(value) => {
                    if (!getCustomerTagList.includes(value)) {
                      setCustomerTagList((prev) => [...prev, value]);
                    } else {
                      message.error("Customer alreday added");
                    }
                  }}
                  className="bank-api-list-select"
                  dropdownRender={(menu) => (
                    <div>
                      {menu}
                      <button
                        type="button"
                        className="bank-select-dropdown-btn"
                        onClick={() => {
                          setOpenCustomertoggle(true);
                          setCustomerData([]);
                          setCustomerID("");
                        }}
                      >
                        <FontAwesomeIcon
                          className="fa-circle-plus-add-bank-btn"
                          icon={faCirclePlus}
                        />
                        Add New Customer
                      </button>
                    </div>
                  )}
                >
                  {customersList?.map((item) => (
                    <Select.Option value={item.customer_id}>
                      <div className="customer_name_phone_amount_div">
                        <span className="customer_name_phone">
                          {item?.customer_name}({item?.customer_phone})
                        </span>
                        {item?.customer_debit_amount ? (
                          <span className="debit_debit_amount">
                            <FontAwesomeIcon icon={faIndianRupeeSign} />{" "}
                            {item?.customer_debit_amount}
                          </span>
                        ) : (
                          <span className="debit_credit_amount">
                            <FontAwesomeIcon icon={faIndianRupeeSign} />{" "}
                            {item?.customer_credit_amount}
                          </span>
                        )}
                      </div>
                      <div className="customer_gst_company_tags_div">
                        <span className="customer_gst_number">
                          {item?.customer_gstin}-{item?.customer_company}
                        </span>
                        <span className="customer_tags">Tags: {item?.tags}</span>
                      </div>
                    </Select.Option>
                  ))}
                </Select>

                {customersList &&
                  customersList.map((val) => {
                    return (
                      getCustomerTagList.includes(val?.customer_id) && (
                        <span className="customer-tag">
                          <span
                            className="customer-for-user"
                            onClick={() => setCustomerID(val?.customer_id)}
                          >
                            {val?.customer_name}
                          </span>
                          <span
                            className="customer-close"
                            onClick={() => {
                              setCustomerTagList(
                                getCustomerTagList.filter(
                                  (value) => value !== val?.customer_id
                                )
                              );
                            }}
                          >
                            <FontAwesomeIcon icon={faXmark} size={20} />
                          </span>
                        </span>
                      )
                    );
                  })}
              </Col>
              <Col
                className="mb-1"
                xl="4"
                md="6"
                sm="12"
                style={{ display: "flex" }}
              >
                <div className="invoice-picker-text">
                  <Label className="customer-label">Invoice Date</Label>
                  <DatePicker className="invoice-date-picker" />
                </div>
                <div className="due-date-div">
                  <h6 style={{ display: "flex" }}>
                    <span className="customer-label">Due Date</span>
                    <span className="question-icon">
                      <Tooltip placement="top" title={dueDtaeText}>
                        <QuestionCircleFilled />
                      </Tooltip>
                    </span>
                  </h6>
                  <DatePicker className="due-date-picker" />
                </div>
              </Col>
              <Col className="mb-1" xl="4" md="6" sm="12">
                <h6 style={{ display: "flex" }}>
                  <span className="customer-label">Reference</span>
                  <span className="question-icon">
                    <Tooltip placement="top" title={referenceText}>
                      <QuestionCircleFilled />
                    </Tooltip>
                  </span>
                </h6>
                <TextArea
                  name="reference"
                  placeholder="Any text, PO Number etc... (Optional)"
                  className="reference-textarea"
                />
              </Col>
            </Row>
          </div>

          <div className="checked-main-div">
            <div className="product-check-sub-div">
              <span className="order-check-span-1">
                <Input className="checked-span-product-ipt-1" type="checkbox" />
                Show description
              </span>
              <span className="order-check-span-2">
                <Input className="checked-span-product-ipt-2" type="checkbox" />
                Show Items in reverse order
              </span>
              <span>
                Change Dicount type
                <button className="down-arrow-btn">
                  <ChevronDown size={20} className="down-arrow" />
                </button>
              </span>
              <span className="badge-beta">BETA</span>
            </div>
          </div>
          <div className="select-product-main-div">
            {/* <Form style={{ display: 'flex' }}> */}
            <Row>
              <Col>
                <h6 className="product-lable">
                  <span className="vendor-label">Select Products</span>
                  <span className="question-icon">
                    <Tooltip placement="top" title={productText}>
                      <QuestionCircleFilled />
                    </Tooltip>
                  </span>
                  <button
                    className="add-invoice-btn"
                    type="button"
                    onClick={() => {
                      setProuctID("");
                      setOpenSidebar(true);
                    }}
                  >
                    Add New Product?
                  </button>
                </h6>
                <Select
                  options={
                    getProductList &&
                    getProductList?.map((item) => ({
                      label: `${item?.item_name}`,
                      value: item?.product_id,
                    }))
                  }
                  onChange={(value) => {
                    if (!getProductTagList.includes(value)) {
                      setProductTagList((prev) => [...prev, value]);
                    } else {
                      message.error("Product alreday added");
                    }
                  }}
                  className="bank-api-list-select"
                  dropdownRender={(menu) => (
                    <div>
                      {menu}
                      <button
                        type="button"
                        className="bank-select-dropdown-btn"
                        onClick={() => {
                          setOpenSidebar(true);
                          setProductData([]);
                          setProuctID("");
                        }}
                      >
                        <FontAwesomeIcon
                          className="fa-circle-plus-add-bank-btn"
                          icon={faCirclePlus}
                        />
                        Add Product
                      </button>
                    </div>
                  )}
                ></Select>

                {getProductList &&
                  getProductList.map((val) => {
                    return (
                      getProductTagList.includes(val?.product_id) && (
                        <span className="customer-tag">
                          <span
                            className="customer-for-user"
                            onClick={() => setProuctID(val?.product_id)}
                          >
                            {val?.item_name}
                          </span>
                          <span
                            className="customer-close"
                            onClick={() => {
                              setProductTagList(
                                getProductTagList.filter(
                                  (value) => value !== val?.product_id
                                )
                              );
                            }}
                          >
                            <FontAwesomeIcon icon={faXmark} size={20} />
                          </span>
                        </span>
                      )
                    );
                  })}
              </Col>
              <Col>
                <div className="quantity-div">
                  <h6 className="quantity-label">Quantity</h6>
                  <InputNumber style={{ width: "135px" }} placeholder="Qty" />
                </div>
              </Col>

              <Col className="bill-btn-col">
                <div className="add-bill-btn">
                  <Button color="primary" className="bill-button">
                    <Plus size={15} />
                    <span>Add to Bill</span>
                  </Button>
                </div>
              </Col>
            </Row>

            {/* </Form> */}
            <div>
              <Table responsive className="table-main">
                <thead>
                  <tr>
                    <th className="product-table-head">Product Name</th>
                    <th className="product-table-head"> </th>
                    <th className="product-table-head">Quantity</th>
                    <th className="product-table-head">Unit Price</th>
                    <th className="product-table-head">
                      Discout(Total Amount)
                    </th>
                    <th className="product-table-head">Net Amount</th>
                    <th className="product-table-head"></th>
                  </tr>
                </thead>
                <tbody className="product-table-body">
                  {/* <tr>
                                    <td className='first-td-main'><a>Sample Product</a>
                                        <td className='first-first-sub-td'>
                                            Avl. qty:-1100<span className='first-first-td-span'>HSN/SAC:</span>
                                            <td className='first-second-sub-td'>0000000 <button className='barcode-btn'>
                                                <Tooltip placement='top' title='Print Barcode'><FontAwesomeIcon icon={faBarcode} /></Tooltip>
                                            </button>
                                            </td>
                                        </td>
                                    </td>
                                    <td className='second-td-main'>
                                        <span className='second--hide-td-plus-a-tag'>
                                            <a >
                                                <FontAwesomeIcon fontSize={12} icon={faCirclePlus} />
                                            </a><span className='second-hide-td-desc-span'>Desc</span></span>
                                    </td>
                                    <td className='third-td-main'>
                                        <span className='third-td-main-span'> <InputNumber className='third-td-input-num' /><span className='third-td-oth-span'>OTH</span></span>
                                    </td>
                                    <td className='fourth-td-main'>
                                        <InputNumber />
                                    </td>
                                    <td className='fifth-td-main'>
                                        <span className='fifth-td-main-span'> <InputNumber className='fifth-td-input-num' /><span className='fifth-td-select-span'>
                                        <Select defaultValue={'%'} className='select'>
                                            <Option seleted value='%'>%</Option>
                                            <Option value='₹'>₹</Option>
                                        </Select></span></span>
                                    </td>
                                    <td className='sixth-td-main'>
                                        <span className='sixth-td-first-span'>1100.00</span>

                                    </td>
                                    <td className='seventh-td-main'>
                                        <button className='product-delete-btn'><Trash2 size={12} /></button>
                                    </td>
                                </tr>*/}

                  <div className="table-expand">
                    <div className="empty">
                      <div className="empty-image">
                        <img
                          src="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                          style={{ height: "100%" }}
                        />
                      </div>
                      <div style={{ color: "#1d1d1f" }}>
                        <span style={{ fontSize: "19px", fontWeight: 500 }}>
                          Search existing products to add to this list or add
                          new product to get started! 🚀🚀🚀
                        </span>
                      </div>
                      <div style={{ marginTop: "16px" }}>
                        <Button
                          type="button"
                          className="button-action"
                          color="primary"
                          onClick={() => setOpenSidebar(true)}
                        >
                          <Plus size={15} />
                          <span className="align-middle">Add New Product</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </tbody>
              </Table>
            </div>

            <div className="additional-charges-div">
              <div className="additinal-charges-div-color">
                <div className="additional-charges-sub-div-1">
                  <label className="additional-discount-label">
                    Apply discount(%) to all items?
                  </label>
                  <InputNumber className="discount-input" />
                </div>

                <div className="additional-charges-sub-div-2">
                  <label className="additional-btn-label">
                    <span>Items/Qty</span>
                    <span>0/0.000</span>
                  </label>
                  <button
                    type="button"
                    className="additional-btn"
                    onClick={additionalCharge}
                  >
                    <FontAwesomeIcon
                      className="additional-plus-span"
                      fontSize={13}
                      icon={faCirclePlus}
                    />
                    <span className="additional-name-span">
                      Additional Charges
                    </span>
                  </button>
                </div>
              </div>
              {openAdditionalChargesToggle && (
                <row className="row-additional">
                  <div class="additional-table-content">
                    <table>
                      <thead className="ant-table-thead">
                        <tr>
                          <th className="ant-table-cell"></th>
                          <th className="ant-table-cell">Tax</th>
                          <th className="ant-table-cell">in (%)</th>
                          <th className="ant-table-cell">withoutTax in (₹)</th>
                          <th className="ant-table-cell">withTax in (₹)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Delivery/ Shipping Charges</td>
                          <td>
                            <Form.Select
                              style={{ width: "100%" }}
                              name="vendor_id"
                              placeholder="Search existing Vendors, Company Name, GSTIN, tags..."
                            >
                              <option></option>
                            </Form.Select>
                          </td>
                          <td>
                            <InputGroup>
                              <Form.Control
                                placeholder="Username"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                type="number"
                              />
                            </InputGroup>
                          </td>
                          <td>
                            <InputGroup>
                              <Form.Control
                                placeholder="Username"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                type="number"
                              />
                            </InputGroup>
                          </td>
                          <td>
                            <InputGroup>
                              <Form.Control
                                placeholder="Username"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                type="number"
                              />
                            </InputGroup>
                          </td>
                        </tr>
                        <tr>
                          <td>Packaging Charges</td>
                          <td>
                            <Form.Select
                              style={{ width: "100%" }}
                              name="vendor_id"
                              placeholder="Search existing Vendors, Company Name, GSTIN, tags..."
                            >
                              <option></option>
                            </Form.Select>
                          </td>
                          <td>
                            <InputGroup>
                              <Form.Control
                                placeholder="Username"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                type="number"
                              />
                            </InputGroup>
                          </td>
                          <td>
                            <InputGroup>
                              <Form.Control
                                placeholder="Username"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                type="number"
                              />
                            </InputGroup>
                          </td>
                          <td>
                            <InputGroup>
                              <Form.Control
                                placeholder="Username"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                type="number"
                              />
                            </InputGroup>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </row>
              )}
            </div>
          </div>
        </div>

        <div className="notes-amount-bank-signature-main-div">
          <Row>
            <Col md="6">
              <Collapse collapsible="header" defaultActiveKey={["1"]}>
                <Panel
                  header={
                    <span className="notes-header-first-span">
                      <span className="notes-head-span">Notes</span>
                      <span className="notes-question-span">
                        {" "}
                        <Tooltip placement="top" title={notesText}>
                          <QuestionCircleFilled className="notes-question-icon" />
                        </Tooltip>
                      </span>
                    </span>
                  }
                  key="1"
                  extra={selectBox()}
                >
                  <TextArea
                    className="notes-textarea"
                    placeholder="Thaks for your busines !"
                  />
                </Panel>
              </Collapse>

              <div className="term-condition-box-div">
                <Collapse collapsible="header">
                  <Panel
                    header={
                      <span className="term-condition-header-first-span">
                        <span className="term-condition-head-span">
                          Term & Condition
                        </span>
                        <span className="term-condition-question-span">
                          {" "}
                          <Tooltip placement="top" title={termConditionText}>
                            <QuestionCircleFilled className="term-condition-question-icon" />
                          </Tooltip>
                        </span>
                      </span>
                    }
                    key="1"
                    extra={selectBox()}
                  >
                    <TextArea
                      className="term-condition-textarea"
                      placeholder="1. ..."
                    />
                  </Panel>
                </Collapse>
              </div>

              <div className="attach-file-div">
                <label className="attach-file-label">
                  Attach Files
                  <span className="attach-file-question-icon-span">
                    {" "}
                    <Tooltip placement="top" title={fileText}>
                      <QuestionCircleFilled className="attach-file-question-icon" />
                    </Tooltip>
                  </span>
                </label>
                <Upload>
                  <Button className="file-upload-btn">
                    <span className="upload-file-icon-span">
                      <UploadOutlined className="upload-file-icon" />
                    </span>
                    Attach Files (Max: 3)
                  </Button>
                </Upload>
              </div>
            </Col>

            <Col md="6">
              <div className="total-amount-div">
                <div className="total-amount-sub-div-1">
                  <span className="extra-discount-label-span">
                    <label className="extra-discount-label">
                      Extra Discount
                      <span className="extra-discount-question-icon-span">
                        <Tooltip placement="top" title={totalAmountText}>
                          <QuestionCircleFilled className="extra-discount-question-icon" />
                        </Tooltip>
                      </span>
                    </label>
                  </span>
                  <span className="extra-dicount-input-main-span">
                    <InputNumber className="extra-dicount-input-num" />
                    <span className="fifth-td-select-span">
                      <Select defaultValue={"%"} className="select">
                        <Option seleted value="%">
                          %
                        </Option>
                        <Option value="₹">₹</Option>
                      </Select>
                    </span>
                  </span>
                </div>
                <div className="total-amount-sub-div-2">
                  <Row>
                    <Col md="12" className="total-amount-col-1">
                      <span className="taxable-amount-heading">
                        Taxable Amount:
                      </span>
                      <span className="taxable-amount-main-span">
                        <span className="taxable-amount-rs-span">₹</span>0
                      </span>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12" className="total-amount-col-2">
                      <span>
                        Rountd Off
                        <span className="round-off-switch-span">
                          <Switch size="small" />
                        </span>
                      </span>
                      <span className="round-off-span">0.00</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12" className="total-amount-col-3">
                      <span className="total-amount-heading">
                        Total Amount:
                      </span>
                      <span className="total-amount-rupee-heading">
                        <span className="total-amount-rs-span">₹</span>0.00
                      </span>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12" className="total-amount-col-4">
                      <span className="total-discount-heading">
                        Total Discount:
                      </span>
                      <span className="total-discount-rs-span-main">
                        <span className="total-discount-rs-sub-span">₹</span>
                        0.00
                      </span>
                    </Col>
                  </Row>
                  {/* <Row>
                                        <Col md='6' className='total-amount-body-text-col-left'>
                                            <span className='taxable-amount-heading'>Taxable Amount:</span>
                                            <span className='taxable-amount-main-span'>
                                                <span className='taxable-amount-rs-span'>₹</span>0</span>
                                                
                                            <span>Rountd Off<span className='round-off-switch-span'><Switch size="small" /></span></span>
                                            <span className='total-amount-heading'>Total Amount:</span>
                                            <span className='total-discount-heading'>Total Discount:</span>
                                        </Col>

                                        <Col md='6' className='total-amount-body-text-col-right'>
                                            <span className='taxable-amount-main-span'>
                                                <span className='taxable-amount-rs-span'>₹</span>0</span>
                                            <span className='round-off-span'>0.00</span>
                                            <span className='total-amount-rupee-heading'>
                                                <span className='total-amount-rs-span'>₹</span>0.00</span>
                                            <span className='total-discount-rs-span-main'>
                                                <span className='total-discount-rs-sub-span'>₹</span>0.00</span>
                                        </Col>
                                    </Row> */}
                </div>
              </div>
              <div className="payment-heading">
                <span className="payment-heading-span">
                  Add payment (Payment Notes, Amount and Mode)
                </span>
              </div>
              <div className="add-bank-main-div">
                <span className="select-bank-label-span">
                  <label className="select-bank-label">
                    Select Bank
                    <span className="select-bank-question-icon-span">
                      <Tooltip placement="top" title={bankText}>
                        <QuestionCircleFilled className="select-bank-question-icon" />
                      </Tooltip>
                    </span>
                  </label>

                  <div className="add-bank-to-invoice-btn-div">
                    {bankList?.length > 0 ? (
                      <Select
                        value={
                          getBankID ? getBankID : getDefaultBank[0]?.bank_id
                        }
                        onChange={(value) => setBankID(value)}
                        options={
                          bankList &&
                          bankList?.map((val, id) => {
                            return {
                              value: val?.bank_id,
                              label: `${val?.bank_name}(${val?.account_number})`,
                            };
                          })
                        }
                        dropdownRender={(menu) => (
                          <div>
                            {menu}
                            <button
                              type="button"
                              className="bank-select-dropdown-btn"
                              onClick={() => setOpenBankSidebar(true)}
                            >
                              <FontAwesomeIcon
                                className="fa-circle-plus-add-bank-btn"
                                icon={faCirclePlus}
                              />
                              Add New Bank
                            </button>
                          </div>
                        )}
                        className="bank-api-list-select"
                      ></Select>
                    ) : (
                      <button
                        type="button"
                        className="add-bank-to-invoice-btn"
                        onClick={() => setOpenBankSidebar(true)}
                      >
                        <span className="bank-icon">
                          <FontAwesomeIcon icon={faBuildingColumns} />
                        </span>
                        Add Bank To Invoice (Optional)
                      </button>
                    )}
                  </div>
                </span>
                {/* <div className="fully-checked-div">
                  <span>
                    <Input className="fully-paid-checked" type="checkbox" />
                    Mark as fully paid
                  </span>
                </div> */}

                {/* <div className="enter-amount-div">
                  <InputNumber
                    className="enter-amount-input"
                    placeholder="Enter Amount"
                  />
                  <Select
                    defaultValue={"Cash"}
                    className="select-payment-method"
                  >
                    <Option value="Cash">Cash</Option>
                    <Option value="UPI">UPI</Option>
                    <Option value="Card">Card</Option>
                    <Option value="Net Banking">Net Banking</Option>
                    <Option value="Cheque">Cheque</Option>
                    <Option value="EMI">EMI</Option>
                  </Select>
                  <Input
                    type="text"
                    className="enter-amount-note-input"
                    placeholder="Notes like Advance Received, UTR Number etc.."
                  />
                </div>
                <div className="balance-amount-div">
                  <span className="balance-amount-heading-span">
                    Balance Amount:
                  </span>
                  <span className="balance-amount-rs-span">₹</span>
                  <span className="balance-amount-num-span">0.00</span>
                </div> */}
                {/* 
                <div className="tds-switch">
                  <span className="tds-heading-span">
                    <span className="tds-switch-span">
                      <Switch size="small" onClick={showTdsItem} />
                    </span>
                    TDS Applicable ?
                  </span>

                  {show && (
                    <div className="tds-switch-sub-div">
                      <Select className="tds-percent-select">
                        <Option>abc</Option>
                        <Option>def</Option>
                        <Option>ghi</Option>
                        <Option>jkl</Option>
                        <Option>mno</Option>
                        <Option>pqr</Option>
                        <Option>stu</Option>
                        <Option>vwx</Option>
                      </Select>
                      <InputNumber disabled className="tds-input-num" />
                    </div>
                  )}
                </div> */}
              </div>

              <div className="select-signature-heading-div">
                <span className="select-sign-heading-span">
                  Select Signature
                  <button className="select-sign-play-btn">
                    <Tooltip
                      placement="right"
                      title={<small>Watch quick demo</small>}
                    >
                      <Play className="select-sign-play-icon" />
                    </Tooltip>
                  </button>
                </span>
                <span className="add-new-sign-main-span">
                  <button
                    className="add-new-sign-btn"
                    onClick={() => setOpenSignatureBar(true)}
                  >
                    <PlusCircle size={14} />
                    Add New Signature
                  </button>
                </span>
              </div>

              <div className="select-sign-main-div">
                <div className="add-sign-to-invoice-btn-div">
                  {signatureList?.length > 0 ? (
                    <Select
                      value={
                        selectedValue
                          ? selectedValue
                          : signatureList[0].signature_id
                      }
                      options={
                        signatureList &&
                        signatureList?.map((item) => ({
                          label: `${item?.signature_name}`,
                          value: item?.signature_id,
                        }))
                      }
                      onChange={handleSelectChange}
                      className="bank-api-list-select"
                      dropdownRender={(menu) => (
                        <div>
                          {menu}
                          <button
                            type="button"
                            className="bank-select-dropdown-btn"
                            onClick={() => setOpenSignatureBar(true)}
                          >
                            <FontAwesomeIcon
                              className="fa-circle-plus-add-bank-btn"
                              icon={faCirclePlus}
                            />
                            Add New Signature
                          </button>
                        </div>
                      )}
                    ></Select>
                  ) : (
                    <button
                      type="button"
                      className="add-sign-to-invoice-btn"
                      onClick={() => setOpenSignatureBar(true)}
                    >
                      <span className="sign-icon">
                        <FontAwesomeIcon icon={faPencil} />
                      </span>
                      Add Signature To Invoice (Optional)
                    </button>
                  )}
                </div>
                <div className="sign-document-div">
                  <span className="sign-document">
                    Signature on the document
                  </span>
                </div>
                <div className="signature-image-div">
                  {selectedImage && (
                    <img
                      alt="example"
                      className="signature-image"
                      src={selectedImage}
                    />
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="save-btn-main-div">
          <button className="save-print-btn">Save and Print</button>
          <button className="save-btn">
            Save
            <span className="arrow-span">
              <FontAwesomeIcon icon={faArrowRight} />
            </span>
          </button>
        </div>
      </Form>

      <AddBankForm
        open={openBankSidebar}
        setOpenBankSidebar={setOpenBankSidebar}
        getBankListHandler={getBankListHandler}
        setBankID={setBankID}
      />
      <AddCustomerForm
        open={openCustomertoggle}
        setSidebarOpen={setOpenCustomertoggle}
        getCustomerData={getCustomerData}
        getCustomerList={getCustomerList}
        setCustomerData={setCustomerData}
      />
      <AddProductForm
        open={openSidebar}
        setOpenSidebar={setOpenSidebar}
        getProductData={getProductData}
        getProductListHandler={getProductListHandler}
        setProductData={setProductData}
      />

      <AddSignatureForm
        open={openSingnatureBar}
        setOpenSignatureBar={setOpenSignatureBar}
        getSignatureListHandler={getSignatureListHandler}
      />

      <DocumentSettingForm
        open={getSettingModal}
        setSettingModal={setSettingModal}
        getSettingData={getSettingData}
        getDocumentId={settingDetail?.document_id}
        getSetting={getSetting}
      />
    </div>
  );
};
export default Index;
