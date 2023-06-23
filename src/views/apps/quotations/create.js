import React, { useState } from "react";
import {
  ChevronLeft,
  HelpCircle,
  ChevronDown,
  MoreVertical,
  Edit,
  Trash,
  Plus,
  Trash2,
  PlusCircle,
  Play,
} from "react-feather";
import { useNavigate } from "react-router-dom";
import "./quotation.css";
import {
  Col,
  Row,
  Label,
  CardBody,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Button,
  Badge,
  Table,
} from "reactstrap";
import { Settings } from "react-feather";
import {
  DatePicker,
  Input,
  Select,
  Tooltip,
  Checkbox,
  InputNumber,
  Collapse,
  Switch,
  Upload,
} from "antd";
import {
  QuestionCircleFilled,
  DownOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Option } from "antd/es/mentions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInr,
  faArrowUpFromBracket,
  faCirclePlay,
  faCirclePlus,
  faPencil,
  faPlus,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import DocumentSettings from "./document-settings";
import CustomerAdd from "./add-customer";
import { Form, InputGroup } from "react-bootstrap";
import AddProduct from "./product/create";
import AddCustomerForm from "./add-customer";

const { TextArea } = Input;
const { Panel } = Collapse;
const CreatePurchase = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const [productOpen, setProductOpen] = useState(false);
  const toggleProduct = () => setProductOpen(!productOpen);

  const backToList = () => {
    navigate("/apps/purchases/list");
  };
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const text = (
    <span>
      <small>
        Search your existing customers using the search box below.
        <br />
        Please click on <b>Add New vendor</b> to add a new customer.
      </small>
    </span>
  );

  const productText = (
    <span>
      <small>
        Search your existing products using the search box below.
        <br />
        Please click on <b>Add New Product</b> to add a new product.
      </small>
    </span>
  );

  const extraDiscountTax = (
    <span>
      Extra discount is directly deducted to the total invoice amount. It does
      not affect the <b>tax calculations</b>. To affect tax calculation give
      product level discount.
    </span>
  );

  const bankText = (
    <span>
      <small>
        Select existing Bank details using the below dropdown.
        <br />
        Please click on <b>Add New Bank</b> to add new Bank details.
      </small>
    </span>
  );

  const selectBox = () => (
    <div className="notes-select">
      <Select
        style={{ width: "290px" }}
        name="product_id"
        placeholder="Search or scan barcode for existing products"
      />
    </div>
  );

  const notesButton = () => (
    <div style={{ padding: "4px 4px 4px 4px" }}>
      <button className="add-notes-button">
        <FontAwesomeIcon icon={faPlus} style={{ marginRight: "4px" }} />
        <span>Add New Notes</span>
        <span className="pro-button">PRO</span>
      </button>
    </div>
  );

  const termsButton = () => (
    <div>
      <Button color="primary" className="add-terms-button">
        <FontAwesomeIcon icon={faPlus} style={{ marginRight: "4px" }} />
        <span>Add New Terms</span>
        <span className="pro-button">PRO</span>
      </Button>
    </div>
  );

  return (
    <div className="card card-box">
      <div style={{ display: "flex", alignItems: "center" }}>
        <h3 className="create-purchase-header">
          <ChevronLeft onClick={() => backToList()} />
          Create Quotation
        </h3>
        <div className="pinv-text">
          <span>
            <Input type="text" value="PINV-" className="pinv-text" />
          </span>
          <span>
            <Input type="number" value="1" />
          </span>
        </div>
      </div>
      <div className="form-check select-quotation">
        <Select name="">
          <Option value="Quotation">Quotation</Option>
          <Option value="Estimate">Estimate</Option>
        </Select>
        <div className="settings-box">
          <button className="document-button" onClick={toggleSidebar}>
            <Settings />
            Settings
          </button>
        </div>
      </div>
      <Form>
        <div className="purchase-card-box">
          <Row>
            <Col className="mb-1" xl="4" md="6" sm="12">
              <h6 style={{ display: "flex" }}>
                <span className="vendor-label">Select Customer</span>
                <span className="question-icon">
                  <Tooltip placement="top" title={text}>
                    <QuestionCircleFilled />
                  </Tooltip>
                </span>
                <button
                  className="add-vendor"
                  type="button"
                  onClick={toggleSidebar}
                >
                  Add New Customer?
                </button>
              </h6>
              <Select
                style={{ width: "100%" }}
                name="vendor_id"
                placeholder="Search existing Vendors, Company Name, GSTIN, tags..."
              />
              {/* <Select
                                theme={selectThemeColors}
                                className='react-select'
                                classNamePrefix='select'
                                isClearable={false}
                            /> */}
            </Col>
            <Col
              className="mb-1"
              xl="4"
              md="6"
              sm="12"
              style={{ display: "flex" }}
            >
              <div className="vendor-text">
                <Label className="vendor-label">Quotation Date</Label>
                <DatePicker />
              </div>
              <div className="vendor-text">
                <h6 style={{ display: "flex" }}>
                  <span className="vendor-label">Due Date</span>
                  <span className="question-icon">
                    <Tooltip
                      placement="top"
                      title="The invoice due date is the date on which you expect to receive payment from your customer."
                    >
                      <QuestionCircleFilled />
                    </Tooltip>
                  </span>
                </h6>
                <DatePicker />
              </div>
            </Col>
            <Col className="mb-1" xl="4" md="6" sm="12">
              <h6 style={{ display: "flex" }}>
                <span className="vendor-label">Reference</span>
                <span className="question-icon">
                  <Tooltip
                    placement="top"
                    title="Reference is commonly used to save information like Purchase Order Number, Eway Bill Number, Sales Person names, Shipment Number etc..."
                  >
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
          <Row>
            <Col className="mb-1" xl="4" md="6" sm="12">
              <h6>
                <span className="vendor-label">
                  Select Company Shipping Address
                </span>
              </h6>
              <Select style={{ width: "100%" }} name="vendor_id" />
              {/* <Select
                                theme={selectThemeColors}
                                className='react-select'
                                classNamePrefix='select'
                                isClearable={false}
                            /> */}
            </Col>
            <Col className="mb-1" xl="4" md="6" sm="12">
              <div>
                <Label className="vendor-label">Supplier Invoice Date</Label>
                <DatePicker className="supplier-date" />
              </div>
            </Col>
            <Col className="mb-1" xl="4" md="6" sm="12">
              <Label className="vendor-label">
                Supplier Invoice Serial No.
              </Label>
              <TextArea
                name="reference"
                placeholder="(Optional)"
                className="reference-textarea"
              />
            </Col>
          </Row>
        </div>
        <div className="show-checkbox">
          <div className="show-checkbox-box">
            <div className="show-checkbox-fild">
              <Checkbox />
              <Label
                for="basic-cb-checked"
                className="form-check-label"
                style={{ marginLeft: "10px" }}
              >
                Show description
              </Label>
            </div>
            <div className="show-checkbox-fild">
              <Checkbox />
              <Label
                for="basic-cb-checked"
                className="form-check-label"
                style={{ marginLeft: "10px" }}
              >
                Show items in reverse order
              </Label>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: "#86868b",
              marginRight: "15px",
            }}
          >
            <Label for="basic-cb-checked" className="form-check-label">
              Change Discount Type
            </Label>
            <UncontrolledDropdown>
              <DropdownToggle color="transparent" className="discount-dropdown">
                <ChevronDown
                  style={{
                    fontSize: "10px",
                    width: "15px",
                    position: "relative",
                  }}
                />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                  <Edit className="me-50" size={15} />{" "}
                  <span className="align-middle">Edit</span>
                </DropdownItem>
                <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                  <Trash className="me-50" size={15} />{" "}
                  <span className="align-middle">Delete</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <span className="beta-tooltip">
              <Tooltip
                placement="top"
                title="This feature is in BETA. You can help us by reporting any issues by clicking the help button."
              >
                BETA
              </Tooltip>
            </span>
          </div>
        </div>
        <div className="product-card-box">
          <Form style={{ display: "flex" }}>
            <Row>
              <Col className="select-products">
                <h6 style={{ display: "flex" }}>
                  <span className="vendor-label">Select Products</span>
                  <span className="question-icon">
                    <Tooltip placement="top" title={productText}>
                      <QuestionCircleFilled />
                    </Tooltip>
                  </span>
                  <button
                    className="add-vendor"
                    type="button"
                    onClick={toggleProduct}
                  >
                    Add New Product?
                  </button>
                </h6>
                <div className="search-product">
                  <span className="search-existing-products">
                    <Select
                      style={{ width: "485px" }}
                      name="product_id"
                      placeholder="Search or scan barcode for existing products"
                    />
                  </span>
                  <span className="select-category">
                    <Select placeholder="Select Category">
                      <Option value="V1">V1</Option>
                      <Option value="V2">V2</Option>
                    </Select>
                  </span>
                </div>
              </Col>
              <Col>
                <div className="">
                  <h6 className="vendor-label">Quantity</h6>
                  <InputNumber style={{ width: "135px" }} placeholder="Qty" />
                </div>
              </Col>
              {/* <Col> */}
              {/* </Col> */}
            </Row>
            <div style={{ marginLeft: "15px" }}>
              <Button color="primary" className="bill-button">
                <Plus size={15} />
                <span>Add to Bill</span>
              </Button>
            </div>
          </Form>
          <div>
            <Table responsive>
              <thead>
                <tr>
                  <th className="product-table-head">Product Name</th>
                  <th className="product-table-head">Quantity</th>
                  <th className="product-table-head">Unit Price</th>
                  <th className="product-table-head">Price with Tax</th>
                  <th className="product-table-head">
                    Discount (Total Amount)
                  </th>
                  <th className="product-table-head">Net Amount</th>
                  <th className="product-table-head">Total</th>
                  <th className="product-table-head"></th>
                </tr>
              </thead>
              <tbody className="product-table-body">
                {/* <div className='table-expand'>
                                <div className='empty'>
                                    <div className='empty-image'>
                                        <img src="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg" style={{ height: '100%' }} />
                                    </div>
                                    <div style={{ color: '#1d1d1f' }}>
                                        <span style={{ fontSize: '19px', fontWeight: 500 }}>Search existing products to add to this list or add new product to get started! 🚀🚀🚀</span>
                                    </div>
                                    <div style={{marginTop: '16px'}}>
                                        <Button className='button-action' color='primary'>
                                            <Plus size={15} />
                                            <span className='align-middle'>Add New Product</span>
                                        </Button>
                                    </div>
                                </div>
                            </div> */}
                <tr>
                  <td>
                    <a>
                      <span
                        className="align-middle"
                        style={{ fontWeight: 600 }}
                      >
                        Angular Project
                      </span>
                      <p style={{ margin: 0, padding: 0 }}>
                        <span
                          style={{
                            fontSize: "10px",
                            fontWeight: 600,
                            color: "green",
                          }}
                        >
                          Avl Qty: 4.00
                        </span>
                      </p>
                    </a>
                  </td>
                  <td style={{ display: "flex" }}>
                    <Input type="text" value="1" style={{ height: "30px" }} />
                    <div className="pet-text">
                      <span>PET</span>
                    </div>
                  </td>
                  <td>
                    <InputNumber />
                  </td>
                  <td>
                    <InputNumber />
                  </td>
                  <td>
                    <InputNumber />
                  </td>
                  <td>500.00</td>
                  <td>500</td>
                  <td>
                    <button className="product-delete">
                      <Trash2 size={12} />
                    </button>
                  </td>
                </tr>
              </tbody>
            </Table>
            <div className="table-footer">
              <Row>
                <Col md="12" style={{ textAlign: "right" }}>
                  <div style={{ marginRight: "2px" }}>
                    <span style={{ color: "#86868b", fontSize: "11px" }}>
                      Items / Qty{" "}
                    </span>
                    <span style={{ color: "#86868b", fontSize: "11px" }}>
                      0 / 0.000
                    </span>
                  </div>
                </Col>
                <Col md="4">
                  <h6 className="discount-font">
                    Apply discount(%) to all items?
                    <span className="question-icon">
                      <Tooltip
                        placement="top"
                        title="This discount % will be applied to all products and overwrite any individual product discount."
                      >
                        <QuestionCircleFilled />
                      </Tooltip>
                    </span>
                  </h6>
                  <div style={{ marginLeft: "8px", marginBottom: "8px" }}>
                    <InputNumber style={{ border: "2px solid green" }} />
                  </div>
                </Col>
                <Col md="8">
                  <button className="additional-charges">
                    <PlusCircle />
                    Additional Charges
                  </button>
                </Col>
                <row className="row-additional">
                  <div class="col-md-8 additional-table-content">
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
              </Row>
            </div>
          </div>
        </div>
        <div>
          <Row className="notes-row">
            <Col md="6">
              <Collapse style={{ backgroundColor: "#f5f5f7" }}>
                <Panel
                  header={
                    <div>
                      Notes
                      <span className="notes-icon">
                        <Tooltip
                          placement="top"
                          title="For the same notes to reflect on all invoices, fill in the notes in Settings --> Notes and Terms --> Customer notes"
                        >
                          <QuestionCircleFilled />
                        </Tooltip>
                      </span>
                    </div>
                  }
                  key="1"
                  extra={selectBox()}
                >
                  <TextArea name="reference" placeholder="Notes" rows={4} />
                </Panel>
              </Collapse>
              <div style={{ marginBottom: "24px", marginTop: "24px" }}>
                <Collapse style={{ backgroundColor: "#f5f5f7" }}>
                  <Panel
                    header={
                      <div>
                        Terms & Conditions
                        <span className="notes-icon">
                          <Tooltip
                            placement="top"
                            title="For the same terms to reflect on all invoices, fill in the terms in Settings --> Notes and Terms --> Customer Terms and Conditions"
                          >
                            <QuestionCircleFilled />
                          </Tooltip>
                        </span>
                      </div>
                    }
                    key="1"
                    extra={selectBox()}
                  >
                    <TextArea
                      name="reference"
                      placeholder="Terms And Condition"
                      rows={4}
                    />
                  </Panel>
                </Collapse>
              </div>
              <div style={{ marginBottom: "16px", marginTop: "24px" }}>
                <h6 style={{ color: "#6e6e73" }}>
                  Attach Files
                  <span className="notes-icon">
                    <Tooltip
                      placement="top"
                      title="You can attach up to 3 files (3 MB each) to each transaction you create."
                    >
                      <QuestionCircleFilled />
                    </Tooltip>
                  </span>
                </h6>
                <div>
                  <Input type="file" multiple style={{ display: "none" }} />
                  <div>
                    <Upload>
                      <button className="attach-file-icon">
                        <FontAwesomeIcon
                          icon={faArrowUpFromBracket}
                          style={{ color: "#6e6e73" }}
                        />{" "}
                        Attached File (Max:3)
                      </button>
                    </Upload>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="total-card ">
                <div className="total-card-body">
                  <Row className="total-row">
                    <Col md="12">
                      <Row className="row">
                        <Col
                          md="12"
                          style={{
                            flexDirection: "row-reverse",
                            display: "inline-flex",
                          }}
                        >
                          <span style={{ textAlign: "right" }}>
                            <h6 className="extra-font">
                              Extra Discount
                              <span className="notes-icon">
                                <Tooltip
                                  placement="top"
                                  title={extraDiscountTax}
                                >
                                  <QuestionCircleFilled />
                                </Tooltip>
                              </span>
                            </h6>
                            <InputNumber
                              style={{ width: "200px", marginBottom: "8px" }}
                            />
                            {/* <Select>
                                                        <Option value='%'>%</Option>
                                                        <Option value='₹'>₹</Option>
                                                    </Select> */}
                          </span>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      md="6"
                      className="tax-amount-text"
                      style={{ textAlign: "left" }}
                    >
                      <h6 style={{ color: "#6e6e73" }}>Taxable Amount:</h6>
                      <h6 style={{ color: "#6e6e73" }}>Total Tax</h6>
                      <h6>
                        <span style={{ color: "#6e6e73" }}>
                          Round Off
                          <Switch
                            size="small"
                            defaultChecked
                            style={{ marginLeft: "8px" }}
                          />
                        </span>
                      </h6>
                      <h6 className="amount-text">Total Amount:</h6>
                      <h6 style={{ color: "#6e6e73" }}>Total Discount:</h6>
                    </Col>
                    <Col
                      md="6"
                      className="tax-amount-text"
                      style={{ textAlign: "right" }}
                    >
                      <h6>
                        <span style={{ color: "#6e6e73" }}>
                          <FontAwesomeIcon
                            icon={faInr}
                            style={{ color: "#6e6e73", marginRight: "4px" }}
                          />
                          0
                        </span>
                      </h6>
                      <h6>
                        <span style={{ color: "#6e6e73" }}>
                          <FontAwesomeIcon
                            icon={faInr}
                            style={{ color: "#6e6e73", marginRight: "4px" }}
                          />
                          0.00
                        </span>
                      </h6>
                      <h6>
                        <span style={{ color: "#6e6e73" }}>0.00</span>
                      </h6>
                      <h6>
                        <span className="amount-text">
                          <FontAwesomeIcon
                            icon={faInr}
                            style={{ marginRight: "4px" }}
                          />
                          0.00
                        </span>
                      </h6>
                      <h6>
                        <span style={{ color: "#6e6e73", fontWeight: "700" }}>
                          <FontAwesomeIcon
                            icon={faInr}
                            style={{ color: "#6e6e73", marginRight: "4px" }}
                          />
                          0.00
                        </span>
                      </h6>
                    </Col>
                  </Row>
                </div>
              </div>
              <div
                style={{
                  marginBottom: "8px",
                  alignItems: "center",
                  justifyContent: "space-between",
                  display: "flex",
                }}
              >
                <h6
                  style={{
                    marginBottom: "0px",
                    fontSize: "15px",
                    color: "#1d1d1f",
                  }}
                >
                  <span
                    style={{
                      color: "#6e6e73",
                      fontWeight: "600",
                      paddingLeft: "8px",
                      marginRight: "8px",
                    }}
                  >
                    Add payment (Payment Notes, Amount and Mode)
                  </span>
                </h6>
              </div>
              <div className="bank-card">
                <div className="bank-card-body">
                  <div style={{ textAlign: "left", marginBottom: "15px" }}>
                    <h6>
                      <span style={{ marginRight: "4px" }}>Select Bank</span>
                      <span className="bank-icon">
                        <Tooltip placement="top" title={bankText}>
                          <QuestionCircleFilled />
                        </Tooltip>
                      </span>
                    </h6>
                    <Select style={{ width: "100%" }}>
                      <Option value="ICICI Bank">ICICI Bank</Option>
                      <Option value="IDBI Bank">IDBI Bank</Option>
                    </Select>
                  </div>
                </div>
              </div>
              <div
                style={{
                  marginBottom: "8px",
                  alignItems: "center",
                  justifyContent: "space-between",
                  display: "flex",
                }}
              >
                <h6 style={{ marginBottom: "0px" }}>
                  <span
                    style={{
                      color: "#6e6e73",
                      fontWeight: "600",
                      paddingLeft: "8px",
                      marginRight: "8px",
                      display: "flex",
                    }}
                  >
                    Select Signature
                    <span>
                      <FontAwesomeIcon
                        icon={faCirclePlay}
                        style={{
                          marginLeft: "5px",
                          color: "#fd3995",
                          marginTop: "2px",
                        }}
                      />
                    </span>
                  </span>
                </h6>
                <a>
                  <FontAwesomeIcon
                    icon={faCirclePlus}
                    style={{ marginRight: "5px" }}
                  />
                  <span>Add New Signature</span>
                </a>
              </div>
              <div className="bank-card">
                <div className="bank-card-body">
                  <Row>
                    <Col>
                      <div style={{ marginBottom: "8px" }}>
                        <button className="signature-button">
                          <br />
                          <FontAwesomeIcon
                            icon={faPencil}
                            style={{ fontSize: "19px", marginRight: "8px" }}
                          />
                          <span
                            style={{
                              display: "inline-block",
                              fontSize: "19px",
                              fontWeight: 600,
                            }}
                          >
                            Add Signature to Invoice (Optional)
                          </span>
                          <br />
                          <br />
                        </button>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <h6>Signature on the document</h6>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div style={{ paddingLeft: "16px", paddingRight: "16px" }}>
          <div className="save-button-border">
            <div style={{ padding: "19px 22px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    marginLeft: "auto",
                    float: "right",
                    display: "flex",
                  }}
                >
                  <button className="save-print-button">Save and Print</button>
                  <Button color="primary" className="save-button">
                    Save{" "}
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      style={{ marginLeft: "2px" }}
                    />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
      {/* <DocumentSettings open={sidebarOpen} toggleSidebar={toggleSidebar} /> */}
      <AddCustomerForm open={sidebarOpen} toggleSidebar={toggleSidebar} />
      <AddProduct open={productOpen} toggleSidebar={toggleProduct} />
    </div>
  );
};

export default CreatePurchase;
