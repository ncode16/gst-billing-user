//Attached File
import { UploadOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Radio } from "antd";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import {
  EditExpenseData,
  EditPaymentData,
  GetExpenseData,
  checkPendingExpenseData,
  updateExpenseData,
  updatePaymentAPI,
} from "../../../api/expenseDataManage/expenseManagement";
import dayjs from "dayjs";

import {
  faEnvelope,
  faCopy,
  faIndianRupeeSign,
} from "@fortawesome/free-solid-svg-icons";
// import "./Payout.css";
import styles from "./payout.module.css";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import SendEmail from "./SendEmail";
import { useForm, Controller } from "react-hook-form";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
// ** React Imports
import { useEffect, useState, useRef } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./Payout.css";
// import styles from "./payout.module.css";
import { selectThemeColors } from "../../../utility/Utils";
import {
  Cascader,
  InputNumber,
  Space,
  DatePicker,
  Dropdown,
  Spin,
  message,
  Button,
  Select,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";

// ** Third Party Components

//** CSS import */
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
  Trash2,
  Eye,
  Navigation,
} from "react-feather";

import { Popover, Overlay } from "react-bootstrap";

// ** Reactstrap Imports
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
  Form,
  Table,
  DropdownToggle,
  UncontrolledDropdown,
  ModalFooter,
} from "reactstrap";
import TableBasic from "./table";
import { getNewBankData } from "../../../api/bank/index";
import moment from "moment";

const PayOut = ({
  getPayoutModal,
  setPayoutModal,
  getExpenseList,
  setViewButton,
}) => {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const data = watch();
  const [bankList, setBankList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [getPayoutTableInfomation, setPayoutTableInfomation] = useState({
    payment_date: "",
    payment_id: "",
    amount: "",
  });
  // Get Data For table in PAyout
  const editPayoutExpense = (payment_id) => {
    EditPaymentData(payment_id)
      .then((res) => {
        setValue("payment_id", res?.data?.data?.payment_id);
        setValue("amount", res?.data?.data?.amount);
        setValue(
          "payment_date",
          dayjs(res?.data?.data?.payment_date).format("DD/MM/YYYY")
        );
        setValue(
          "bank_id",
          res?.data?.data?.bank_id ? res?.data?.data?.bank_id : ""
        );
        setValue("notes", res?.data?.data?.notes);
        setValue("payment_type", res?.data?.data?.payment_type);

        setPayoutTableInfomation({
          payment_date: dayjs(res?.data?.data?.payment_date).format(
            "DD/MM/YYYY"
          ),
          payment_id: res?.data?.data?.payment_id,
          amount: res?.data?.data?.amount,
        });
      })
      .catch((error) => console.log("expense error", error));
  };

  //Check Pending Data delete here
  const pendingDelteDataHandler = () => {
    setIsLoading(true);
    checkPendingExpenseData(getPayoutModal?.id)
      .then((response) => {
        if (response.status === 200) {
          message.success("Payment Cancelled");
          setPayoutModal((prev) => ({
            id: "",
            payoutModal: false,
          }));
          setIsLoading(false);
          getExpenseList();
        }
      })
      .catch((error) => {
        console.log("Delete Data not found");
        setIsLoading(false);
      });
  };

  const updatePayoutData = (payoutInfo) => {
    setLoading(true);
    updatePaymentAPI(payoutInfo?.payment_id, payoutInfo)
      .then((response) => {
        if (response.status === 200) {
          message.success("Expense Updated Successfully");
          setPayoutModal((prev) => ({
            id: "",
            payoutModal: false,
          }));
          getExpenseList();
          setLoading(false);
        }
      })
      .catch((err) => message.error("Somethin went wrong"));
  };

  const getBankListHandler = async () => {
    const bankList = getNewBankData();
    bankList.then((response) => {
      if (response.status === 200) {
        setBankList(response?.data?.data);
      }
    });
  };

  // Popover delete data
  const billingref = useRef(null);
  const [showPopover, setShowPopover] = useState({
    emailTemplateDeletePopover: false,
    shippingDeletePopover: false,
  });
  const [target, setTarget] = useState({
    emailTemplateDeletePopoverTarget: null,
    shippingDeletePopoverTarget: null,
  });
  const deleteBillingAddressPopOver = (event) => {
    setShowPopover((prev) => ({
      ...prev,
      emailTemplateDeletePopover: !showPopover.emailTemplateDeletePopover,
    }));
    setTarget((prev) => ({
      ...prev,
      emailTemplateDeletePopoverTarget: event.target,
    }));
  };

  useEffect(() => {
    getBankListHandler();
  }, []);

  useEffect(() => {
    getPayoutModal?.id && editPayoutExpense(getPayoutModal?.id);
  }, [getPayoutModal?.id]);

  const [newEmail, setNewEmail] = useState(false);
  const showEmailDrawer = () => setNewEmail(!newEmail);
  const items = [
    {
      label: (
        <a href="https://www.whatsapp.com">
          <i>
            {" "}
            <FontAwesomeIcon
              className={styles.whatsapp_colour}
              icon={faWhatsapp}
            />
          </i>{" "}
          <span>Whatsapp</span>
        </a>
      ),
      key: "0",
    },
    {
      label: (
        <button className={styles.send_mail} onClick={showEmailDrawer}>
          <FontAwesomeIcon className={styles.email_colour} icon={faEnvelope} />
          <span> Email</span>
        </button>
      ),
      key: "1",
    },
    {
      label: (
        <a>
          <i>
            {" "}
            <FontAwesomeIcon className={styles.copy_link} icon={faCopy} />
          </i>{" "}
          <span className={styles.payout_copy_lin}>Copy Link</span>
        </a>
      ),
      key: "2",
    },
  ];
  const CloseBtn = (
    <X
      className={styles.cursor_pointer}
      size={15}
      onClick={() =>
        setPayoutModal((prev) => ({
          ...prev,
          payoutModal: false,
        }))
      }
    />
  );
  return (
    <>
      <Modal
        isOpen={getPayoutModal?.payoutModal}
        className={`${styles.add_expesne_width_payout} payout_modal_container`}
        modalClassName="modal-slide-in"
        contentClassName="pt-0"
      >
        <div className={styles.all_section}>
          <div className={styles.create_exp_head_create}>
            <div className={styles.head_button_main}>
              <ModalHeader
                className={styles.head_button}
                toggle={() =>
                  setPayoutModal((prev) => ({
                    ...prev,
                    payoutModal: false,
                  }))
                }
                close={CloseBtn}
              >
                <h3>PAYOUT11</h3>
              </ModalHeader>
            </div>
            <div className={styles.payout_update_btn_payout}>
              <button
                className={styles.payout_btn_payout}
                onClick={handleSubmit(updatePayoutData)}
              >
                {loading && (
                  <Spin
                    indicator={
                      <LoadingOutlined
                        style={{ color: "white", fontSize: "12px" }}
                        spin
                      />
                    }
                  />
                )}
                Update Payment
              </button>

              <Overlay
                show={showPopover.emailTemplateDeletePopover}
                target={target.emailTemplateDeletePopoverTarget}
                placement="bottom"
                container={billingref}
                containerPadding={20}
              >
                <Popover id="popover-contained" placement="bottom">
                  <Popover.Header as="h3">
                    <span className="pending-delete-sure-main-span">
                      {" "}
                      <FontAwesomeIcon icon={faInfoCircle} />
                      <span className="pending-delete-sure">
                        Are you Sure to delete?
                      </span>
                    </span>
                  </Popover.Header>
                  <Popover.Body>
                    <div className="pop-over">
                      <button
                        type="button"
                        className="delete-cancel-template-btn"
                        onClick={() => {
                          setShowPopover((prev) => ({
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
                        onClick={() => pendingDelteDataHandler()}
                      >
                        {isLoading && (
                          <Spin
                            indicator={
                              <LoadingOutlined
                                style={{ color: "white", fontSize: "12px" }}
                                spin
                              />
                            }
                          />
                        )}
                        OK
                      </button>
                    </div>
                  </Popover.Body>
                </Popover>
              </Overlay>

              {/* <OverlayTrigger
                trigger="click"
                placement="bottom"
                overlay={popover}
                                  > */}
              <button
                className={styles.payout_btn2_payout}
                onClick={deleteBillingAddressPopOver}
                ref={billingref}
              >
                {" "}
                <Trash2 />
              </button>
              {/* </OverlayTrigger>  */}
            </div>
          </div>

          <Form className={styles.amount_page_payout_all_sction}>
            <div className={styles.create_expense_head_payout_container}>
              <div>
                <Row>
                  <Col md="100">
                    <div className={styles.payout_view_recipt}>
                      <button
                        type="button"
                        className={styles.view_recipt_button}
                        onClick={() => {
                          setViewButton((prev) => ({
                            ...prev,
                            viewModal: true,
                          }));
                        }}
                      >
                        <Eye />
                        View Reciept
                      </button>
                      <Dropdown
                        menu={{
                          items,
                        }}
                        trigger={["click"]}
                      >
                        <button className={styles.view_send_button}>
                          <Navigation />
                          Send
                        </button>
                      </Dropdown>
                    </div>
                    <div className={styles.payout_view_section}>
                      <div className={styles.enter_amount_payout}>
                        <label>
                          Amout (<FontAwesomeIcon icon={faIndianRupeeSign} />)
                        </label>
                        <InputNumber
                          className={styles.arrow_down_disabled}
                          prefix="₹"
                          disabled
                          style={{
                            width: "100%",
                          }}
                          value={watch("amount")}
                        />
                      </div>
                      <div className={styles.payment_date}>
                        <label className={styles.label_amount_payment}>
                          Payment Date
                        </label>
                        <div>
                          <Controller
                            control={control}
                            name="payment_date"
                            render={({ field }) => (
                              <DatePicker
                                style={{ width: "100%" }}
                                className={styles.payout_date_picker}
                                value={dayjs(
                                  watch("payment_date"),
                                  "DD/MM/YYYY"
                                )}
                                format="DD/MM/YYYY"
                                onChange={(value, dateString) => {
                                  setValue("payment_date", dateString);
                                }}
                              />
                            )}
                          />
                        </div>
                        {/* <input
                          type="date"
                          id="dateInput"
                          {...register("expense_date")}
                        /> */}
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>

              <div>
                <div className={styles.payment_heading}>
                  <h5>Payment Type</h5>
                </div>
                {/* UPI Payment */}
                {/* <div className="payment-method">
                    <div className="payment-method">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                          onClick={(e) => setPaymentValue(e.target.value)}
                          checked={getPaymentValue === "UPI"}
                          value="UPI"
                        />
                        <label class="form-check-label" for="flexRadioDefault1">
                          UPI
                        </label>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                          onClick={(e) => setPaymentValue(e.target.value)}
                          checked={getPaymentValue === "Cash"}
                          value="Cash"
                        />
                        <label class="form-check-label" for="flexRadioDefault1">
                          Cash
                        </label>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                          onClick={(e) => setPaymentValue(e.target.value)}
                          checked={getPaymentValue === "Card"}
                          value="Card"
                        />
                        <label class="form-check-label" for="flexRadioDefault1">
                          Card
                        </label>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                          onClick={(e) => setPaymentValue(e.target.value)}
                          checked={getPaymentValue === "Net Banking"}
                          value="Net Banking"
                        />
                        <label class="form-check-label" for="flexRadioDefault1">
                          Net Banking
                        </label>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                          onClick={(e) => setPaymentValue(e.target.value)}
                          checked={getPaymentValue === "Cheque"}
                          value="Cheque"
                        />
                        <label class="form-check-label" for="flexRadioDefault1">
                          Cheque
                        </label>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                          onClick={(e) => setPaymentValue(e.target.value)}
                          checked={getPaymentValue === "EMI"}
                          value="EMI"
                        />
                        <label class="form-check-label" for="flexRadioDefault1">
                          EMI
                        </label>
                      </div>
                    </div>
                  </div> */}
                <div className={styles.payment_method}>
                  <Controller
                    control={control}
                    name="payment_type"
                    render={({ field }) => (
                      <Radio.Group
                        value={watch("payment_type")}
                        buttonStyle="solid"
                        className={styles.radio_aa}
                        onChange={(e) => {
                          setValue("payment_type", e.target.value);
                        }}
                      >
                        <Radio.Button
                          value="UPI"
                          className={`${styles.radio_a} radio_a`}
                        >
                          {watch("payment_type") === "UPI" && (
                            <FontAwesomeIcon icon={faCircleCheck} />
                          )}
                          UPI
                        </Radio.Button>
                        <Radio.Button
                          value="cash"
                          className={`${styles.radio_b} radio_b`}
                        >
                          {watch("payment_type") === "cash" && (
                            <FontAwesomeIcon icon={faCircleCheck} />
                          )}
                          Cash
                        </Radio.Button>
                        <Radio.Button
                          value="card"
                          className={`${styles.radio_c} radio_c`}
                        >
                          {watch("payment_type") === "card" && (
                            <FontAwesomeIcon icon={faCircleCheck} />
                          )}
                          Card
                        </Radio.Button>
                        <Radio.Button
                          value="netbanking"
                          className={`${styles.radio_d} radio_d`}
                        >
                          {watch("payment_type") === "netbanking" && (
                            <FontAwesomeIcon icon={faCircleCheck} />
                          )}
                          NetBanking
                        </Radio.Button>
                        <Radio.Button
                          value="cheque"
                          className={`${styles.radio_e} radio_e`}
                        >
                          {watch("payment_type") === "cheque" && (
                            <FontAwesomeIcon icon={faCircleCheck} />
                          )}
                          Cheque
                        </Radio.Button>
                        <Radio.Button
                          value="EMI"
                          className={`${styles.radio_f} radio_f`}
                        >
                          {watch("payment_type") === "EMI" && (
                            <FontAwesomeIcon icon={faCircleCheck} />
                          )}
                          EMI
                        </Radio.Button>
                      </Radio.Group>
                    )}
                  />
                </div>
                {watch("payment_type") === "Cash" ? null : (
                  <div className={styles.select_expense}>
                    <label>Bank</label>
                    <div className="select-bank">
                      <Select
                        style={{ width: "100%" }}
                        placeholder="Select Bank"
                        {...register("bank_id", {
                          required: "Please selcet Bank",
                        })}
                        onChange={(value) => setValue("bank_id", value)}
                        value={watch("bank_id")}
                      >
                        {bankList?.map((item) => (
                          <Select.Option value={item.bank_id}>
                            {item?.bank_name}
                          </Select.Option>
                        ))}
                      </Select>
                      {errors?.bank_id && (
                        <span className={styles.bank_error_message}>
                          {errors.bank_id?.message}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.description}>
                <CardHeader>
                  <CardTitle tag="h5">Notes</CardTitle>
                </CardHeader>

                <div className={styles.descr_textarea}>
                  <textarea
                    type="textarea"
                    className={styles.descr}
                    id="exampleText"
                    rows="2"
                    placeholder="Notes Description"
                    {...register("notes")}
                    value={watch("notes")}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className={styles.settled_expesne}>
              <h5>Settled Expenses</h5>
            </div>
            <div className={styles.create_expense_head_payout}>
              <div>
                <Table class="table text-center mt-3">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Serial No</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{getPayoutTableInfomation.payment_date}</td>
                      <td>{getPayoutTableInfomation.payment_id}</td>
                      <td>{getPayoutTableInfomation.amount}</td>
                    </tr>
                  </tbody>
                  {/* <div className="payout-pegination">
                    <Pagination size="small" total={10} />
                  </div> */}
                </Table>
              </div>
            </div>
          </Form>
        </div>
        <div>
          <footer className={styles.payout_footer}>
            <div className={styles.payout_btn}>
              <button
                className={styles.payout_update_btn}
                onClick={handleSubmit(updatePayoutData)}
              >
                {loading && (
                  <Spin
                    indicator={
                      <LoadingOutlined style={{ color: "white" }} spin />
                    }
                  />
                )}
                Update Payment
              </button>
              {/* <button className='payout-btn' onClick={handleUpdateValues(onSubmit)}>Update Payment</button> */}
              <ToastContainer />

              <Overlay
                show={showPopover.emailTemplateDeletePopover}
                target={target.emailTemplateDeletePopoverTarget}
                placement="top"
                container={billingref}
                containerPadding={20}
              >
                <Popover id="popover-contained" placement="top">
                  <Popover.Header as="h3">
                    <span className="pending-delete-sure-main-span">
                      {" "}
                      <FontAwesomeIcon icon={faInfoCircle} />
                      <span className="pending-delete-sure">
                        Are you Sure to delete?
                      </span>
                    </span>
                  </Popover.Header>
                  <Popover.Body>
                    <div className="pop-over">
                      <button
                        type="button"
                        className="delete-cancel-template-btn"
                        onClick={() => {
                          setShowPopover((prev) => ({
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
                        onClick={() => pendingDelteDataHandler()}
                      >
                        {isLoading && (
                          <Spin
                            indicator={
                              <LoadingOutlined
                                style={{ color: "white", fontSize: "12px" }}
                                spin
                              />
                            }
                          />
                        )}
                        OK
                      </button>
                    </div>
                  </Popover.Body>
                </Popover>
              </Overlay>

              <button
                onClick={deleteBillingAddressPopOver}
                ref={billingref}
                className="payout-delete-btn"
              >
                <Trash2 />
                Delete
              </button>

              {/* <OverlayTrigger trigger="click" placement="top" overlay={popover}>
                <button className="payout-delete-btn">
                  <Trash2 />
                  Delete
                </button>
              </OverlayTrigger> */}
            </div>
          </footer>
        </div>
        <SendEmail
          open={newEmail}
          showEmailDrawer={showEmailDrawer}
        ></SendEmail>
      </Modal>
    </>
  );
};
export default PayOut;
