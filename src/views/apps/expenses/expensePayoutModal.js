//Attached File
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload, DatePicker } from "antd";
import styles from "./expensePayout.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import jwtDecode from "jwt-decode";

import { Cascader, InputNumber, Space, Radio, Select } from "antd";
import {
  faIndianRupeeSign,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
// ** React Imports
import { useState, useEffect } from "react";
import {
  EditExpenseData,
  createPaymentAPI,
  updateExpenseData,
} from "../../../api/expenseDataManage/expenseManagement";
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
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import dayjs from "dayjs";
import AddBankForm from "../../../components/CommonForm/add-bank";
import { getNewBankData } from "../../../api/bank";

const ExpensePayoutModal = ({
  getPayoutExpenseModal,
  setPayoutExpenseModal,
  getExpenseList,
}) => {
  // ** State
  const [newBank, setNewBank] = useState(false);
  const [visible, setVisible] = useState(true);
  const [show, setShow] = useState(true);
  const [openBankSidebar, setOpenBankSidebar] = useState(false);
  const [bankList, setBankList] = useState([]);
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const [getBankID, setBankID] = useState("");
  const [getAmountPaid, setAmountPaid] = useState("");
  const [getAmountPending, setAmountPanding] = useState("");

  const data = watch();
  console.log(data, "data");
  console.log(getAmountPending, "getAmountPending");

  const editPayoutExpense = (expense_id) => {
    EditExpenseData(expense_id)
      .then((res) => {
        if (res.status === 200) {
          setValue("expense_id", res?.data?.data?.expense_id);
          setValue(
            "payment_date",
            dayjs(res?.data?.data?.expense_date).format("DD/MM/YYYY")
          );
          setAmountPaid(res?.data?.data?.amount_paid);
          setValue("amount", Number(res?.data?.data?.amount));
          setValue("amount_pending", Number(res?.data?.data?.amount_pending));
          setAmountPanding(Number(res?.data?.data?.amount_pending));
          setValue("description", res?.data?.data?.description);
          setValue("payment_type", res?.data?.data?.payment_type);
          setValue("bank", res?.data?.data?.bank_id);

          setPayoutExpenseModal((prev) => ({
            ...prev,
            id: "",
          }));
        }
      })
      .catch((error) => console.log("expense error", error));
  };

  const getBankListHandler = async () => {
    const bankList = getNewBankData();
    bankList.then((response) => {
      if (response.status === 200) {
        setBankList(
          response?.data?.data?.map((ele) => ({
            value: ele?.bank_id,
            label: `${ele?.bank_name} (${ele?.account_number})`,
          }))
        );
      }
    });
  };

  useEffect(() => {
    editPayoutExpense(getPayoutExpenseModal?.id);
  }, [getPayoutExpenseModal?.id]);

  useEffect(() => {
    getBankListHandler();
  }, []);

  const toggle = () =>
    setPayoutExpenseModal((prev) => ({
      ...prev,
      payoutModal: false,
    }));

  const CloseBtn = (
    <X className={styles.cursor_pointer_arrow} size={15} onClick={toggle} />
  );

  const updateExpesnePayoutModalHandler = (data) => {
    const decoded = localStorage.getItem("userDetails");
    const token = jwtDecode(decoded);
    const paymentPayload = {
      amount: Number(data?.amount_pending),
      payment_type: data?.payment_type,
      bank_id: data?.bank_id,
      notes: data?.description,
      payment_date: data?.payment_date,
      user_id: token.user_id,
      expense_id: data?.expense_id,
    };
    createPaymentAPI(paymentPayload)
      .then((response) => {
        if (response.status === 200) {
          const formData = new FormData();
          const amount_paid = Number(data?.amount_pending) + getAmountPaid;
          const amount_pending = Number(data?.amount) - amount_paid;
          const paymentStatus =
            amount_pending !== 0 ? "partially paid" : "paid";
          formData.append("amount_paid", amount_paid);
          formData.append("amount_pending", amount_pending);
          formData.append("payment_status", paymentStatus);
          updateExpenseData(data?.expense_id, formData)
            .then((response) => {
              if (response.status === 200) {
                setPayoutExpenseModal((prev) => ({
                  ...prev,
                  payoutModal: false,
                }));
                getExpenseList();
                message.success("Payment Recorded for Expense");
              }
            })
            .catch((error) => {
              message.error("Something went wrong");
            });
        }
      })
      .catch((error) => {
        message.error("Something went wrong");
      });
  };

  return (
    <>
      <Modal
        isOpen={getPayoutExpenseModal?.payoutModal}
        className={`${styles.add_expense_width_arrow_down} expense_payout_module_row `}
        modalClassName="modal-slide-in"
        contentClassName="pt-0"
      >
        <div className={styles.all_section}>
          <div className={styles.create_exp_head_arrow}>
            <div className={styles.head_button_main_arrow}>
              <ModalHeader
                className={styles.head_button}
                toggle={toggle}
                close={CloseBtn}
              >
                <h3>Expense Pay Out</h3>
              </ModalHeader>
            </div>
            <button
              className={styles.head_button_one}
              onClick={() => {
                toggle();
              }}
            >
              Add Payment
              <ArrowRight />
            </button>
          </div>
          <Form className={styles.amount_page}>
            <div className={styles.create_expense_head}>
              <div className={styles.create_form_expense}>
                <Row>
                  <Col md="100">
                    <div className={styles.payout_view_section}>
                      <label className={styles.label_amount_view}>
                        Total Expense Amount
                      </label>
                      <InputNumber
                        className={styles.arrow_down_disabled}
                        prefix="₹"
                        disabled
                        style={{
                          width: "100%",
                        }}
                        value={watch("amount")}
                        {...register("amount")}
                      />
                      <label className={styles.label_amount_view_paying}>
                        Amount Paying
                      </label>
                      <InputNumber
                        prefix="₹"
                        name="amount_pending"
                        placeholder="500"
                        style={{
                          width: "100%",
                        }}
                        min={1}
                        {...register("amount_pending", {
                          required: "Please fill amount",
                          validate: (match) => {
                            if (Number(match) > getAmountPending) {
                              return "Amount cannot be greater than pending amount";
                            }
                          },
                        })}
                        onChange={(value) => {
                          setValue("amount_pending", value);
                        }}
                        value={watch("amount_pending")}
                      />
                      {errors?.amount_pending && (
                        <p className="fill-required">
                          {errors?.amount_pending?.message}
                        </p>
                      )}

                      <Col md="12">
                        <div className={styles.expense_date}>
                          <label>Payment Date</label>
                          <Controller
                            control={control}
                            name="payment_date"
                            render={({ field }) => (
                              <DatePicker
                                style={{ width: "100%" }}
                                className={styles.date_picker_expense}
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
                      </Col>

                      <Col md="12">
                        <div className={styles.payment_heading}>
                          <h5>Payment Type</h5>
                        </div>
                        {/* UPI Payment */}
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
                      </Col>

                      {bankList?.length > 0 &&
                        watch("payment_type") !== "cash" && (
                          <div
                            className={
                              bankList?.length > 0 ? styles.select_Expense : ""
                            }
                          >
                            <label>Select Bank</label>
                            <div className={styles.select_bank}>
                              <Controller
                                control={control}
                                name="bank"
                                rules={{
                                  required:
                                    bankList?.length > 0 &&
                                    watch("payment_type") !== "cash"
                                      ? "Please Select the Bank"
                                      : false,
                                }}
                                render={({ field }) => (
                                  <Select
                                    className={styles.select_bank_expene}
                                    style={{
                                      width: "100%",
                                    }}
                                    placeholder="Select Bank"
                                    value={watch("bank")}
                                    onChange={(value) => {
                                      setValue("bank", value);
                                    }}
                                    options={bankList}
                                  />
                                )}
                              />
                              {errors.bank && (
                                <p className={styles.fill_required}>
                                  {errors?.bank?.message}
                                </p>
                              )}
                            </div>
                          </div>
                        )}

                      {bankList?.length === 0 && (
                        <>
                          <label className={styles.arrow_label}>Bank</label>
                          <button
                            className={styles.arrow_label_btn}
                            type="button"
                            onClick={() => {
                              setOpenBankSidebar(true);
                            }}
                          >
                            Add New Bank
                          </button>
                        </>
                      )}
                      <p>By default the payment method is cash</p>
                      <div className={styles.description_arrow}>
                        <CardHeader>
                          <CardTitle tag="h5">Notes</CardTitle>
                        </CardHeader>
                        <div className={styles.descr_textarea}>
                          <textarea
                            type="textarea"
                            className={styles.descr}
                            id="exampleText"
                            rows="2"
                            placeholder="item Description"
                            {...register("description")}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
            <footer className={styles.create_exp_footer}>
              <div className={styles.exp_footer_btn}>
                <button
                  type="button"
                  onClick={handleSubmit(updateExpesnePayoutModalHandler)}
                >
                  Add Payment
                  <ArrowRight />
                </button>
              </div>
            </footer>
          </Form>
        </div>
      </Modal>

      <AddBankForm
        open={openBankSidebar}
        setOpenBankSidebar={setOpenBankSidebar}
        getBankListHandler={getBankListHandler}
        setBankID={setBankID}
      />
    </>
  );
};

export default ExpensePayoutModal;
