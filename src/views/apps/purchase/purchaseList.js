// ** React Imports
import { Fragment, useState } from "react";

// ** Reactstrap Imports
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Input,
  Row,
  Col,
  Card,
  Button,
  InputGroup,
  InputGroupText,
  Table,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Flatpickr from "react-flatpickr";
import "./css/purchase.css";
import "../../../@core/scss/react/libs/flatpickr/flatpickr.scss";
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import ReactPaginate from "react-paginate";
import { Play, Settings, Plus, Search } from "react-feather";
import { useNavigate } from "react-router-dom";
import {
  DatePicker,
  Space,
  Pagination,
  Modal,
  Dropdown,
  Drawer,
  Collapse,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import {
  faComments,
  faEnvelope,
  faInr,
  faEye,
  faPaperPlane,
  faAngleDown,
  faPenToSquare,
  faClone,
  faReceipt,
  faFileSignature,
  faArrowUpFromBracket,
  faCircleMinus,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import "./media.css";
import { Form } from "react-bootstrap";

const { Panel } = Collapse;

const PurchaseList = () => {
  // ** State
  const [active, setActive] = useState("1");
  const [open, setOpen] = useState(false);
  const { RangePicker } = DatePicker;

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  const [currentPage, setCurrentPage] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const [emailOpen, setEmailOpen] = useState(false);
  const toggleEmail = () => setEmailOpen(!emailOpen);

  const [purchaseDetailOpen, setPurchaseDetailOpen] = useState(false);
  const togglePurchaseDetail = () => setPurchaseDetailOpen(!purchaseDetailOpen);

  const [recordPayment, setRecordPayment] = useState(false);
  const toggleRecordPayment = () => setRecordPayment(!recordPayment);

  const navigate = useNavigate();
  // ** Function to handle Pagination
  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };

  const handlePurchase = () => {
    navigate("/apps/purchases/create");
  };

  const items = [
    {
      label: (
        <a style={{ color: "black", fontWeight: 600 }}>
          <FontAwesomeIcon
            icon={faWhatsapp}
            style={{ marginRight: "8px", color: "#25d366" }}
          />
          Whatsapp
        </a>
      ),
      key: "0",
    },
    {
      label: (
        <a style={{ color: "black", fontWeight: 600 }} onClick={toggleEmail}>
          <FontAwesomeIcon
            icon={faEnvelope}
            style={{ marginRight: "8px", color: "#2754ff" }}
          />
          Email
        </a>
      ),
      key: "1",
    },
    {
      label: (
        <a style={{ color: "black", fontWeight: 600 }}>
          <FontAwesomeIcon
            icon={faComments}
            style={{ marginRight: "8px", color: "#fc3654" }}
          />
          SMS
        </a>
      ),
      key: "2",
    },
    {
      label: (
        <a style={{ color: "black", fontWeight: 600 }}>
          <FontAwesomeIcon
            icon={faClone}
            style={{ marginRight: "8px", color: "#6e6e73" }}
          />
          Copy link
        </a>
      ),
      key: "2",
    },
  ];

  return (
    <div className="card card-box purchase-container">
      <div className="purchase-button">
        <h3 className="purchase-header">
          Purchases
          {/* <span className="play-icon">
            <Play />
          </span> */}
        </h3>
        <div className="purchase-header-button">
          <button className="document-button" onClick={toggleSidebar}>
            <Settings />
            Document Settings
          </button>
          <Button
            className="ms-2"
            color="primary"
            onClick={() => handlePurchase()}
          >
            <Plus size={15} />
            <span className="align-middle ms-50">Create Purchase</span>
          </Button>
        </div>
      </div>
      <Fragment>
        <Nav tabs className="purchase-tab">
          <NavItem>
            <NavLink
              active={active === "1"}
              onClick={() => {
                toggle("1");
              }}
            >
              All Transactions
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={active === "2"}
              onClick={() => {
                toggle("2");
              }}
            >
              Paid
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={active === "3"}
              onClick={() => {
                toggle("3");
              }}
            >
              Pending
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={active === "4"}
              onClick={() => {
                toggle("4");
              }}
            >
              Cancelled
            </NavLink>
          </NavItem>
        </Nav>
        <div className="search-group">
          <InputGroup className="input-group-merge">
            <InputGroupText>
              <Search size={14} />
            </InputGroupText>
            <Input placeholder="Search by transaction, customers, invoice#..." />
          </InputGroup>
          <Space direction="vertical" size={12}>
            <RangePicker />
          </Space>
        </div>
        <TabContent className="py-50" activeTab={active}>
          <TabPane tabId="1">
            <div style={{ marginTop: "8px", marginBottom: "24px" }}>
              <Table responsive>
                <thead>
                  <tr>
                    <th className="table-head">Amount</th>
                    <th className="table-head">Status</th>
                    <th className="table-head">Mode</th>
                    <th className="table-head">Bill #</th>
                    <th className="table-head">Vendor</th>
                    <th className="table-head">Supplier Details</th>
                    <th className="table-head">
                      Date/{" "}
                      <span style={{ fontSize: "8px" }}>Updated Time</span>
                    </th>
                    <th className="table-head">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    style={{ borderBottom: "1px solid #f0f0f0" }}
                    className="purchase-table-row"
                  >
                    <td className="table-data">
                      <span>
                        <a className="purchase-amount">
                          <FontAwesomeIcon icon={faInr} />
                          800.00
                        </a>
                      </span>
                    </td>
                    <td className="table-data">
                      <Button color="success" className="payment-status">
                        paid
                      </Button>
                    </td>
                    <td className="table-data">
                      <Button color="success" className="payment-mode">
                        UPI
                      </Button>
                    </td>
                    <td className="table-data">
                      <span style={{ color: "#1d1d1f", fontSize: "14px" }}>
                        PINV-2
                      </span>
                      <span style={{ color: "#6e6e73" }}>
                        <p
                          style={{
                            fontSize: "9px",
                            marginBottom: "0px",
                            marginTop: "0px",
                          }}
                        >
                          Mahin Prajapati
                        </p>
                      </span>
                    </td>
                    <td className="table-data">
                      <span style={{ color: "#1d1d1f", fontSize: "14px" }}>
                        ABC Technologies
                      </span>
                    </td>
                    <td className="table-data">
                      <span style={{ color: "#1d1d1f", fontSize: "14px" }}>
                        123456
                      </span>
                    </td>
                    <td className="table-data">
                      <span style={{ color: "#1d1d1f", fontSize: "14px" }}>
                        04 Apr 2023
                      </span>
                      <span style={{ fontSize: "9px" }}>
                        <p style={{ marginBottom: "0px", marginTop: "0px" }}>
                          04 Apr 23, 12:52 PM
                        </p>
                      </span>
                    </td>
                    <td className="table-data">
                      <div style={{ display: "flex" }}>
                        <button
                          type="button"
                          className="record-payment-button"
                          onClick={toggleRecordPayment}
                        >
                          <FontAwesomeIcon icon={faInr} className="inr-icon" />
                          <FontAwesomeIcon
                            icon={faArrowDown}
                            className="arrow-down-icon"
                          />
                        </button>
                        <button type="button" className="view-button">
                          <FontAwesomeIcon icon={faEye} />
                          <span
                            style={{ marginLeft: "4px", display: "inline" }}
                          >
                            View
                          </span>
                        </button>
                        <Dropdown
                          menu={{
                            items,
                          }}
                          trigger={["click"]}
                        >
                          <a>
                            <button className="send-button">
                              <FontAwesomeIcon icon={faPaperPlane} />
                              <span
                                style={{ marginLeft: "4px", display: "inline" }}
                              >
                                Send
                              </span>
                            </button>
                          </a>
                        </Dropdown>
                        <div className="action-icon">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className="icon-btn hide-arrow"
                              color="transparent"
                              size="sm"
                              caret
                            >
                              <FontAwesomeIcon icon={faAngleDown} />
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem
                                href="/"
                                onClick={(e) => e.preventDefault()}
                              >
                                <span
                                  className="align-middle"
                                  style={{ fontWeight: 600, color: "#1d1d1f" }}
                                >
                                  <FontAwesomeIcon
                                    icon={faPenToSquare}
                                    style={{
                                      marginRight: "16px",
                                      fontWeight: 400,
                                      textAlign: "center",
                                      width: "20px",
                                    }}
                                  />
                                  Edit
                                </span>
                              </DropdownItem>
                              <DropdownItem
                                href="/"
                                onClick={(e) => e.preventDefault()}
                              >
                                <span
                                  className="align-middle"
                                  style={{ fontWeight: 600, color: "#1d1d1f" }}
                                >
                                  <FontAwesomeIcon
                                    icon={faArrowUpFromBracket}
                                    style={{
                                      marginRight: "16px",
                                      fontWeight: 400,
                                      textAlign: "center",
                                      width: "20px",
                                    }}
                                  />
                                  Download
                                </span>
                              </DropdownItem>
                              <DropdownItem
                                href="/"
                                onClick={(e) => e.preventDefault()}
                              >
                                <span
                                  className="align-middle"
                                  style={{ fontWeight: 600, color: "#1d1d1f" }}
                                >
                                  <FontAwesomeIcon
                                    icon={faClone}
                                    style={{
                                      marginRight: "16px",
                                      fontWeight: 400,
                                      textAlign: "center",
                                      width: "20px",
                                    }}
                                  />
                                  Duplicate
                                </span>
                              </DropdownItem>
                              <DropdownItem
                                href="/"
                                onClick={(e) => e.preventDefault()}
                              >
                                <span
                                  className="align-middle"
                                  style={{ fontWeight: 600, color: "#1d1d1f" }}
                                >
                                  <FontAwesomeIcon
                                    icon={faReceipt}
                                    style={{
                                      marginRight: "16px",
                                      fontWeight: 400,
                                      textAlign: "center",
                                      width: "20px",
                                    }}
                                  />
                                  Thermal Print
                                </span>
                              </DropdownItem>
                              <DropdownItem
                                href="/"
                                onClick={(e) => e.preventDefault()}
                              >
                                <span
                                  className="align-middle"
                                  style={{ fontWeight: 600, color: "#1d1d1f" }}
                                >
                                  <FontAwesomeIcon
                                    icon={faFileSignature}
                                    style={{
                                      marginRight: "16px",
                                      fontWeight: 400,
                                      textAlign: "center",
                                      width: "20px",
                                    }}
                                  />
                                  Convert to Purchase Return
                                </span>
                              </DropdownItem>
                              <DropdownItem
                                href="/"
                                onClick={(e) => e.preventDefault()}
                              >
                                <span
                                  className="align-middle"
                                  style={{ color: "#e11900" }}
                                >
                                  <FontAwesomeIcon
                                    icon={faCircleMinus}
                                    style={{
                                      marginRight: "16px",
                                      fontWeight: 400,
                                      textAlign: "center",
                                      width: "20px",
                                    }}
                                  />
                                  Cancel Purchase
                                </span>
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <div className="purchase-pagination">
                <Pagination
                  defaultCurrent={1}
                  total={85}
                  defaultPageSize={100}
                />
              </div>
            </div>
            <div className="total-main">
              <div className="total-down">
                <div
                  style={{
                    backgroundColor: "#fff",
                    paddingRight: "16px",
                    paddingLeft: "16px",
                    marginBottom: "8px",
                  }}
                >
                  <div className="demo">
                    <div className="total-card">
                      <div className="total-card-body">
                        <span
                          style={{
                            color: "#3a3a3c",
                            fontWeight: 500,
                            marginRight: "8px",
                          }}
                        >
                          Total
                        </span>
                        <span style={{ color: "#000" }}>
                          <FontAwesomeIcon
                            icon={faInr}
                            style={{ marginRight: "4px" }}
                          />
                          <span style={{ fontWeight: 600 }}>1,800.00</span>
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        borderColor: "#e8e8ed",
                        backgroundColor: "#f3faf6",
                        borderRadius: "10px",
                        border: "1px solid #f0f0f0",
                        marginRight: "16px",
                        marginBottom: "23px",
                      }}
                    >
                      <div className="total-card-body">
                        <span
                          style={{
                            color: "#3a3a3c",
                            fontWeight: 500,
                            marginRight: "8px",
                          }}
                        >
                          Paid
                        </span>
                        <span style={{ color: "#000" }}>
                          <FontAwesomeIcon
                            icon={faInr}
                            style={{ marginRight: "4px" }}
                          />
                          <span style={{ fontWeight: 600 }}>1,800.00</span>
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        borderColor: "#e8e8ed",
                        backgroundColor: "#fef8f3",
                        borderRadius: "10px",
                        border: "1px solid #f0f0f0",
                        marginRight: "16px",
                        marginBottom: "23px",
                      }}
                    >
                      <div className="total-card-body">
                        <span
                          style={{
                            color: "#3a3a3c",
                            fontWeight: 500,
                            marginRight: "8px",
                          }}
                        >
                          Pending
                        </span>
                        <span style={{ color: "#000" }}>
                          <FontAwesomeIcon
                            icon={faInr}
                            style={{ marginRight: "4px" }}
                          />
                          <span style={{ fontWeight: 600 }}>0.00</span>
                        </span>
                      </div>
                    </div>
                    <p className="breakdown-color">View Total Breakdown</p>
                  </div>
                </div>
              </div>
            </div>
          </TabPane>
        </TabContent>
        <TabContent className="py-50" activeTab={active}>
          <TabPane tabId="2">
            <div>
              <p>Paid content</p>
            </div>
          </TabPane>
        </TabContent>
        <Drawer
          title={
            <div>
              <span className="payment-tab">
                <span className="payment-record-title">
                  Record Payment for{" "}
                </span>
                <span className="payment-pinv">PINV-3</span>
              </span>
              <p className="payment-sub-tab">
                15 May 2023
                <span className="payment-last-date">, Due on 15 May 2023</span>
              </p>
            </div>
          }
          onClose={toggleRecordPayment}
          open={recordPayment}
        >
          <Form>
            <Collapse className="advance-payment-header" bordered={false}>
              <Panel
                header={
                  <div className="advance-payment">
                    <span className="advance-payment-title">
                      Settle From Advance Payments
                    </span>
                    <p className="advance-payment-sub-title">
                      You have advance payments from this customer. Click here
                      to Settle from Advance Payments.
                    </p>
                  </div>
                }
                key="1"
              ></Panel>
            </Collapse>
          </Form>
        </Drawer>
      </Fragment>
    </div>
  );
};
export default PurchaseList;
