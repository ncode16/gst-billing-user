import { UploadOutlined, LoadingOutlined } from "@ant-design/icons";
import {
  Button,
  message,
  Upload,
  Spin,
  DatePicker,
  Select,
  Switch,
  InputNumber,
  Radio,
} from "antd";
import dayjs from "dayjs";
import "./addExpense.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faIndianRupeeSign,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./addExpense.module.css";
import jwtDecode from "jwt-decode";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import {
  User,
  Briefcase,
  Mail,
  Calendar,
  DollarSign,
  X,
  Share,
  Play,
} from "react-feather";
import {
  AddExapenseData,
  GetExpenseData,
  bankExpenseId,
  createPaymentAPI,
  updatePaymentAPI,
} from "../../../api/expenseDataManage/expenseManagement";
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
import { useNavigate } from "react-router-dom";
import { error } from "jquery";

const AddExpenses = ({
  open,
  setExpenseModal,
  getExpenseList,

  getExpenseListParamenter,
}) => {
  const [getBankDetails, setBankDetails] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fileUploadError, setFileUploadError] = useState(false);

  const {
    handleSubmit,
    control,
    register,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({});

  const data = watch();
  console.log(data, "data");
  console.log(errors, "errors");

  const addExpenseHandler = (data) => {
    const decoded = localStorage.getItem("userDetails");
    const token = jwtDecode(decoded);
    const formData = new FormData();
    formData.append("amount", Number(data.amount));
    !data?.paidStatus && formData.append("amount_pending", Number(data.amount));
    !data?.paidStatus
      ? formData.append("payment_status", "pending")
      : formData.append("payment_status", "paid");
    formData.append("expense_date", data.expense_date);
    formData.append("expense_category", data.category ? data.category : "");
    formData.append("payment_type", data.payment_type);
    formData.append("description", data.description ? data.description : "");
    fileList?.length > 0
      ? fileList.forEach((item) => {
          formData.append("attach_files", item?.originFileObj);
        })
      : formData.append("attach_files", fileList);
    formData.append("bank_id", data.bank ? data.bank : 0);
    formData.append("user_id", token?.user_id);
    !data?.paidStatus
      ? formData.append("amount_paid", 0)
      : formData.append("amount_paid", Number(data.amount));

    const paymentPayload = {
      amount: Number(data?.amount),
      payment_type: data?.payment_type,
      bank_id: data.bank ? data.bank : 0,
      user_id: token?.user_id,
    };

    AddExapenseData(formData)
      .then((expenseResponse) => {
        if (expenseResponse?.status === 200) {
          setExpenseModal(false);
          message.success("Expense added successfully");
          GetExpenseData(getExpenseListParamenter)
            .then((response) => {
              if (response.status === 200) {
                const updateExpensePayload = {
                  expense_id: expenseResponse?.data?.data?.expense_id,
                };
                const expenseList = response?.data?.data?.data;
                console.log(expenseList, "expenseList");
                const filterExpenseData = expenseList?.filter((ele) => {
                  return (
                    ele?.expense_id === expenseResponse?.data?.data?.expense_id
                  );
                });
                updatePaymentAPI(
                  filterExpenseData[0]?.payment_id,
                  updateExpensePayload
                ).then((response) => {
                  getExpenseList();
                });
              }
            })
            .catch((error) => {
              console.log("data not found");
            });
        }
      })
      .catch((error) => {
        message.error("Something went wrong");
      });
  };

  const fileUploader = ({ fileList: newFileList }) => {
    fileUploadError && setFileList(newFileList);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    const isLt2M = file.size / 1024 / 1024 < 2;
    setFileUploadError(false);

    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    } else if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    } else {
      setFileUploadError(true);
    }
    return false;
  };

  const getBankDetailsHanlder = () => {
    const decoded = localStorage.getItem("userDetails");
    const token = jwtDecode(decoded);
    bankExpenseId(token.user_id).then((res) => {
      if (res.status === 200) {
        setBankDetails(
          res?.data?.data?.map((ele) => ({
            value: ele?.bank_id,
            label: `${ele?.bank_name} (${ele?.account_number})`,
          }))
        );
      }
    });
  };

  useEffect(() => {
    getBankDetailsHanlder();
  }, []);

  useEffect(() => {
    reset();
    setValue("paidStatus", true);
    setValue("payment_type", "UPI");
    setFileList([]);
    setValue("expense_date", dayjs().format("DD/MM/YYYY"));
  }, [open]);

  useEffect(() => {
    !watch("paidStatus") && setValue("payment_type", "");
  }, [watch("paidStatus")]);

  const CloseBtn = (
    <X
      className={styles.cursor_pointer}
      size={15}
      onClick={() => setExpenseModal(false)}
    />
  );
  return (
    <>
      <Modal
        isOpen={open}
        className={`${styles.add_expense_width} add_expense_container`}
        modalClassName="modal-slide-in"
        contentClassName="pt-0"
      >
        <div className={`${styles.all_section}`}>
          <div className={styles.create_exp_head_create}>
            <div className={styles.head_button_main}>
              <ModalHeader
                className={styles.head_button}
                toggle={() => setExpenseModal(false)}
                close={CloseBtn}
              >
                <h3>Expenses</h3>
              </ModalHeader>
            </div>
            <button type="submit" className="head_button-one-add-expense">
              Add Expense
            </button>
          </div>
          {/* <div className='create-expense-head'> */}
          <Form className={styles.amount_page}>
            <div className={styles.create_expense_head}>
              <div className={styles.create_form_expense}>
                <Row>
                  <Col>
                    <div className={styles.enter_amount}>
                      <label className={styles.lable_amount}>
                        Expense in (<FontAwesomeIcon icon={faIndianRupeeSign} />
                        )
                      </label>

                      <InputNumber
                        className={styles.income_amount}
                        prefix="₹"
                        name="amount"
                        min={1}
                        placeholder="Enter amount in (₹)"
                        style={{
                          width: "100%",
                        }}
                        {...register("amount", {
                          required: "Please fill amount",
                        })}
                        onChange={(value) => {
                          setValue("amount", value);
                        }}
                      />
                      {errors.amount && (
                        <p className={styles.fill_require}>
                          {errors?.amount?.message}
                        </p>
                      )}
                    </div>
                  </Col>
                  <Col md="12">
                    <div className={styles.expense_date}>
                      <label>Expense Date</label>
                      <Controller
                        control={control}
                        name="expense_date"
                        render={({ field }) => (
                          <DatePicker
                            style={{ width: "100%" }}
                            className={styles.date_picker_expense}
                            defaultValue={dayjs()}
                            format="DD/MM/YYYY"
                            onChange={(value, dateString) => {
                              setValue("expense_date", dateString);
                            }}
                          />
                        )}
                      />
                    </div>
                  </Col>
                </Row>
              </div>
              <CardBody>
                <Row>
                  <Col className="mb-1" md="14" sm="12">
                    <div className={styles.category_label}>
                      <Label className={styles.form_label}>
                        Category
                        <span className={styles.play_icon_small}>
                          <Play />
                        </span>
                      </Label>
                      <Controller
                        control={control}
                        name="category"
                        render={({ field }) => (
                          <Select
                            style={{
                              width: "100%",
                            }}
                            placeholder="Select Cateogory"
                            value={watch("category")}
                            onChange={(value) => {
                              setValue("category", value);
                            }}
                            options={[
                              {
                                value: "Bank Free and Charges",
                                label: "Bank Free and Charges",
                              },
                              {
                                value: "Electricity Bill",
                                label: "Electricity Bill",
                              },
                              {
                                value: "Printing and Stationery",
                                label: "Printing and Stationery",
                              },
                              {
                                value: "Raw Material",
                                label: "Raw Material",
                              },
                              {
                                value: "Repair & Maintenance",
                                label: "Repair & Maintenance",
                              },
                              {
                                value: "Telephone & Internet Bills",
                                label: "Telephone & Internet Bills",
                              },
                              {
                                value: "Transpotation & Travel Expense",
                                label: "Transpotation & Travel Expense",
                              },
                              {
                                value: "Miscellaneous",
                                label: "Miscellaneous",
                              },
                            ]}
                          />
                        )}
                      />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <div className="d-flex flex-column">
                <div className={styles.mark_as}>
                  <label>Mark as Paid</label>
                  <div className="form-switch form-check-primary">
                    <Controller
                      control={control}
                      name="paidStatus"
                      render={({ field }) => (
                        <Switch
                          defaultChecked={watch("paidStatus")}
                          onClick={(value) => setValue("paidStatus", value)}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>

              {watch("paidStatus") && (
                <div>
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
                  {watch("payment_type") !== "cash" && (
                    <div
                      className={`${
                        getBankDetails?.length > 0 ? styles.select_Expense : ""
                      }
                      `}
                    >
                      <label>Select Bank</label>
                      <div className={styles.select_bank}>
                        <Controller
                          control={control}
                          name="bank"
                          rules={{
                            required:
                              watch("payment_type") !== "cash" &&
                              getBankDetails?.length > 0
                                ? "Please Select the Bank"
                                : false,
                          }}
                          render={({ field }) => (
                            <Select
                              style={{
                                width: "100%",
                              }}
                              placeholder="Select Bank"
                              value={watch("bank")}
                              onChange={(value) => {
                                setValue("bank", value);
                              }}
                              options={getBankDetails}
                            />
                          )}
                        />
                        {errors.bank && (
                          <p className={styles.fill_require}>
                            {errors?.bank?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div className={styles.description_text}>
                <CardHeader>
                  <CardTitle tag="h5">Description</CardTitle>
                </CardHeader>
                <div className={styles.descr_textarea}>
                  <textarea
                    type="textarea"
                    className={styles.descr}
                    id="exampleText"
                    rows="2"
                    placeholder="Item Description"
                    {...register("description")}
                  ></textarea>
                </div>
              </div>

              <div className={styles.expense_attached_file}>
                <Upload
                  maxCount={3}
                  beforeUpload={beforeUpload}
                  onChange={(value) => fileUploader(value)}
                  fileList={fileList}
                  className={styles.add_expense_upload_wrapper}
                  accept="image/png, image/jpeg"
                >
                  <Button
                    icon={<UploadOutlined />}
                    className={styles.attached_file_op}
                  >
                    Attached File (Max:3)
                  </Button>
                </Upload>
              </div>

              {/* <div className='footer-section'> */}
              <footer className={styles.create_exp_footer}>
                <div className={styles.exp_footer_btn}>
                  <button
                    type="submit"
                    onClick={handleSubmit(addExpenseHandler)}
                  >
                    {loading && (
                      <Spin
                        indicator={
                          <LoadingOutlined style={{ color: "white" }} spin />
                        }
                      />
                    )}{" "}
                    Add Expense
                  </button>
                </div>
              </footer>
              {/* </div> */}
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default AddExpenses;
