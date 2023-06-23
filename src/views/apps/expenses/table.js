import { Fragment, useEffect, useState } from "react";
import "./media.css";
import ExpenseImg from "./welcome5.png";

import PayOut from "./Payout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIndianRupeeSign,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-brands-svg-icons";
import {
  GetExpenseData,
  EditExpenseData,
  deleteExpenseDetail,
  updateExpenseData,
  cancelExpenseDetail,
} from "../../../api/expenseDataManage/expenseManagement";
import { useForm, Controller } from "react-hook-form";
import Spinner from "../../../@core/components/spinner/Fallback-spinner";
import { PDFViewer } from "@react-pdf/renderer";

import { UploadOutlined, LoadingOutlined } from "@ant-design/icons";
// For Trash
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Space } from "antd";
//For Table Pegination
// import { Pagination } from 'antd';
import {
  Button,
  Divider,
  Segmented,
  Tooltip,
  Upload,
  Spin,
  DatePicker,
  InputNumber,
  Select,
  Pagination,
} from "antd";
import "../expenses/table.css";
// ** Icons Imports
import {
  MoreVertical,
  Edit,
  Trash,
  Eye,
  Trash2,
  ArrowDown,
  Play,
  Plus,
} from "react-feather";

// ** Reactstrap Imports
import {
  Table,
  Badge,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Label,
  Col,
  Form,
  ModalHeader,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import { useNavigate, useParams } from "react-router-dom";
import shadows from "@mui/material/styles/shadows";
import TimeMask from "../../forms/form-elements/input-mask/TimeMask";
import DeleteExpenseModal from "./delete-expense";
import EditExpenseModal from "./editExpense";
import SpinnerComponent from "../../../components/commonComponent/Loader";
import ExpensePayoutModal from "./expensePayoutModal";
import DeliveryChallanToggle from "./deliveryChallanToggle";

//TootTip

//GET API is here
const defaultValues = {
  page: "",
  limit: "",
};

const defaultExpenseValues = {
  expense_id: "",
  amount: "",
  expense_date: "",
  expense_category: "",
  description: "",
  attach_files: "",
  user_id: 0,
};
//Pegnation Page here

const TableBasic = ({
  active,
  expenseData,
  setExpenseData,
  getExpenseList,
  setExpenseListParameter,
  loading,
  setExpenseModal,
  getExpenseListParamenter,
  getTotalValue,
  setTotalValue,
}) => {
  //Total Amount Calculate is here

  //For deleted data create variable
  const [getDeleteModalOpen, setDeleteModal] = useState({
    deleteModal: false,
    expense_id: "",
    expense_category: "",
    expense_date: "",
    payment_type: "",
    amount: "",
  });

  const [getEditExpenseModal, setEditExpenseModal] = useState({
    editModal: false,
    id: "",
  });

  const [getModifiedExpenseData, setModifiedExpenseData] = useState([]);
  const [getCalculation, setCalculation] = useState({
    total: 0,
    paid: 0,
    pending: 0,
  });
  const [getPayoutExpenseModal, setPayoutExpenseModal] = useState({
    payoutModal: false,
    id: "",
  });
  const [getPayoutModal, setPayoutModal] = useState({
    payoutModal: false,
    id: "",
  });
  const [getPDfFile, setPDFFile] = useState(false);
  const [getViewButton, setViewButton] = useState({
    viewModal: false,
    list: {},
  });
  // Arrow Down here
  const [arrow, setArrow] = useState(false);
  // const handleModalDown = () => setArrow(!arrow)
  const [getUserIdArrow, setUserIdArrow] = useState("");
  const handleModalDown = (id) => {
    setArrow(!arrow);
    setUserIdArrow(id);
  };
  //PayOut Pop-up
  const [pay, setPay] = useState(false);
  const [getUserId, setUserId] = useState("");

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues });

  const dateFormateChangeHandler = (modifiedExpenseDate) => {
    const date = new Date(modifiedExpenseDate);
    const expenseDate = new Date(date).getDate();
    const expenseMonth = new Date(date).toLocaleString("default", {
      month: "long",
    });
    const expenseYear = new Date(date).getFullYear();
    return `${expenseDate} ${expenseMonth}  ${expenseYear}`;
  };

  useEffect(() => {
    if (active !== "cancelled") {
      setModifiedExpenseData(
        expenseData?.filter((item) => !item?.is_deleted && !item?.is_cancelled)
      );

      setTotalValue(
        expenseData?.filter((item) => !item?.is_deleted && !item?.is_cancelled)
          ?.length
      );
    } else if (active === "cancelled") {
      setModifiedExpenseData(
        expenseData?.filter((item) => !item?.is_deleted && item?.is_cancelled)
      );

      setTotalValue(
        expenseData?.filter((item) => !item?.is_deleted && item?.is_cancelled)
          ?.length
      );
    }
  }, [active, expenseData]);

  useEffect(() => {
    const totalValue = getModifiedExpenseData.reduce(
      (acc, item) => item.amount + acc,
      0
    );

    const paidValue = getModifiedExpenseData
      .filter(
        (item) =>
          item?.payment_status === "paid" ||
          item?.payment_status === "partially paid"
      )
      .reduce((acc, item) => item?.amount_paid + acc, 0);

    const pendingValue = getModifiedExpenseData
      .filter(
        (item) =>
          item?.payment_status === "pending" ||
          item?.payment_status === "partially paid"
      )
      .reduce((acc, item) => item?.amount_pending + acc, 0);

    setCalculation({
      total: totalValue,
      paid: paidValue,
      pending: pendingValue,
    });
  }, [getModifiedExpenseData]);

  const getPaymentTypeColor = (paymentType) => {
    switch (paymentType) {
      case "paid":
        return "#cbf4c9";
        break;
      case "pending":
        return "#fff2b7";
        break;
      case "partially paid":
        return "#fff2b7";
        break;
      case "cancelled":
        return "#fed7d2";
        break;
      default:
      // code block
    }
  };

  const getPaymentModeColor = (paymentMode) => {
    switch (paymentMode) {
      case "UPI":
        return "#e5e6fc";
        break;
      case "cash":
        return "#e0fcee";
        break;
      case "card":
        return "#fbe2fa";
        break;
      case "netbanking":
        return "#fce6e0";
        break;
      case "cheque":
        return "#e3fafe";
        break;
      case "EMI":
        return "#f2ffcf";
        break;
      default:
      // code block
    }
  };

  return (
    <>
      {loading ? (
        <SpinnerComponent />
      ) : (
        <Fragment>
          <>
            <Table responsive>
              <thead className="table-head-op">
                <tr>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Mode</th>
                  <th>Expense#</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th className="table-action">Actions</th>
                </tr>
              </thead>
              {getModifiedExpenseData?.length > 0 && (
                <tbody className="table-apply">
                  {getModifiedExpenseData?.map((item) => {
                    const value = <span>Record Payment</span>;

                    const paymentType = (
                      <span className="tooltip_payment">
                        {item?.payments?.map((ele, index) => (
                          <>
                            <Tooltip
                              placement="top"
                              className="tootlip_width"
                              title={
                                <>
                                  <span>
                                    PayOut-{ele?.payment_id}
                                    <h1 className="tootip-item-amoun">
                                      <FontAwesomeIcon
                                        icon={faIndianRupeeSign}
                                      />
                                      {ele?.amount}
                                    </h1>
                                  </span>
                                </>
                              }
                            >
                              <button
                                className="tooltip_payemnet _status"
                                onClick={() =>
                                  setPayoutModal((prev) => ({
                                    id: ele?.payment_id,
                                    payoutModal: true,
                                  }))
                                }
                              >
                                {ele?.payment_type}
                              </button>
                            </Tooltip>
                          </>
                        ))}
                      </span>
                    );
                    const text = (
                      <span>
                        PayOut-{item?.expense_id}
                        <h1 className="tootip-item-amoun">
                          <FontAwesomeIcon icon={faIndianRupeeSign} />
                          {item?.amount}
                        </h1>
                      </span>
                    );

                    return (
                      <tr>
                        <td>
                          <FontAwesomeIcon icon={faIndianRupeeSign} />
                          {item?.amount}
                        </td>
                        <td className="paid">
                          <Button
                            className={`cash-pay-paid }`}
                            style={{
                              backgroundColor: getPaymentTypeColor(
                                item?.payment_status
                              ),
                            }}
                          >
                            {item?.payment_status}
                          </Button>
                        </td>

                        <td className="cash-tootkit">
                          {item?.payment_status !== "pending" &&
                            item?.payment_status !== "cancelled" && (
                              <div>
                                <Tooltip placement="top" title={text}>
                                  <Button
                                    className="cash-pay"
                                    style={{
                                      background: getPaymentModeColor(
                                        item?.payment_type
                                      ),
                                    }}
                                    onClick={() =>
                                      setPayoutModal((prev) => ({
                                        id: item?.payment_id,
                                        payoutModal: true,
                                      }))
                                    }
                                  >
                                    {item?.payment_type}
                                  </Button>
                                </Tooltip>
                              </div>
                            )}

                          {item?.payments?.length > 1 && (
                            <Tooltip
                              placement="top"
                              color="white"
                              className="tootlip_width"
                              title={paymentType}
                            >
                              <div className="table_tooltip">
                                +{item?.payments?.length - 1}
                              </div>
                            </Tooltip>
                          )}
                        </td>
                        <td>Exp-{item?.expense_id}</td>
                        <td>{dateFormateChangeHandler(item?.expense_date)}</td>
                        <td>
                          <div className="table_description">
                            <span> {item?.expense_category} </span>
                            <span>{item?.description}</span>
                          </div>
                        </td>
                        <td className="table-button">
                          {(item?.payment_status === "pending" ||
                            item?.payment_status === "partially paid") && (
                            <div className="edit">
                              <Tooltip placement="top" title={value}>
                                <Button
                                  className="edit-btn"
                                  onClick={() =>
                                    setPayoutExpenseModal((prev) => ({
                                      id: item?.expense_id,
                                      payoutModal: true,
                                    }))
                                  }
                                >
                                  <ArrowDown />
                                </Button>
                              </Tooltip>
                            </div>
                          )}
                          <div className="edit">
                            <button
                              className="edit-btn-view"
                              onClick={() =>
                                setViewButton((prev) => ({
                                  list: item,
                                  viewModal: true,
                                }))
                              }
                            >
                              <Eye />
                              View
                            </button>
                          </div>
                          <div className="edit">
                            <button
                              className="edit-btn"
                              onClick={() => {
                                setEditExpenseModal((prev) => ({
                                  id: item?.expense_id,
                                  editModal: true,
                                }));
                              }}
                            >
                              <Edit />
                              Edit
                            </button>
                          </div>

                          <div className="edit">
                            <button
                              className="edit-btn-delete"
                              onClick={() => {
                                setDeleteModal({
                                  expense_id: item?.expense_id,
                                  expense_category: item?.expense_category
                                    ? item?.expense_category
                                    : "",
                                  expense_date: item?.expense_date,
                                  payment_type: item?.payment_type,
                                  amount: item?.amount,
                                  deleteModal: true,
                                });
                              }}
                            >
                              <Trash2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              )}
            </Table>
            {getModifiedExpenseData?.length > 0 && (
              <Pagination
                defaultCurrent={1}
                current={getExpenseListParamenter?.page}
                pageSize={getExpenseListParamenter?.limit}
                onChange={(value, pagesize) => {
                  setExpenseListParameter((prev) => ({
                    ...prev,
                    page: value,
                    limit: pagesize,
                  }));
                }}
                total={getTotalValue}
              />
            )}
            {getModifiedExpenseData?.length > 0 && (
              <div className="table-pegination">
                <div className="table-card">
                  <div className="table-card1">
                    <span className="table-cd">
                      Total <FontAwesomeIcon icon={faIndianRupeeSign} />
                      {` ${getCalculation?.total}`}.00
                    </span>
                  </div>
                  <div className="table-card2">
                    <span className="table-cd">
                      Paid <FontAwesomeIcon icon={faIndianRupeeSign} />
                      {` ${getCalculation?.paid}`}.00
                    </span>
                  </div>
                  <div className="table-card3">
                    <span className="table-cd">
                      Pending <FontAwesomeIcon icon={faIndianRupeeSign} />{" "}
                      {` ${getCalculation?.pending}`}.00
                    </span>
                  </div>
                </div>
              </div>
            )}
          </>

          {getModifiedExpenseData?.length === 0 && (
            <>
              <div className="expense-image">
                <img src={ExpenseImg} alt="img" />
              </div>
              <div className="img-heading">
                <h3>Add an Expense Now</h3>
              </div>
              <div className="Heading-Expenses-two">
                <Button
                  className="pop-up-btn expense_button"
                  color="primary"
                  onClick={() => setExpenseModal(true)}
                >
                  <Plus size={14} />
                  <span className="align-middle ms-50">Create Expense</span>
                </Button>
              </div>
            </>
          )}
        </Fragment>
      )}
      <DeleteExpenseModal
        getDeleteModalOpen={getDeleteModalOpen}
        getExpenseList={getExpenseList}
        setDeleteModal={setDeleteModal}
        active={active}
      />
      <EditExpenseModal
        setEditExpenseModal={setEditExpenseModal}
        getEditExpenseModal={getEditExpenseModal}
        getExpenseList={getExpenseList}
      />

      <ExpensePayoutModal
        getPayoutExpenseModal={getPayoutExpenseModal}
        setPayoutExpenseModal={setPayoutExpenseModal}
        getExpenseList={getExpenseList}
      />
      <PayOut
        getPayoutModal={getPayoutModal}
        setPayoutModal={setPayoutModal}
        getExpenseList={getExpenseList}
        setViewButton={setViewButton}
      />

      <DeliveryChallanToggle
        getViewButton={getViewButton}
        setViewButton={setViewButton}
      />
    </>
  );
};

export default TableBasic;
