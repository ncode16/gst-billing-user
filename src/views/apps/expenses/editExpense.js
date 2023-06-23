import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import jwtDecode from "jwt-decode";
import {
  InputNumber,
  DatePicker,
  Select,
  Upload,
  Button,
  Spin,
  message,
} from "antd";
import { UploadOutlined, LoadingOutlined } from "@ant-design/icons";
// import "./Edit.css";
import {
  MoreVertical,
  Edit,
  Trash,
  Eye,
  Trash2,
  ArrowDown,
  Play,
  X,
} from "react-feather";

import {
  faIndianRupeeSign,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
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
import {
  EditExpenseData,
  updateExpenseData,
} from "../../../api/expenseDataManage/expenseManagement";
import { useEffect } from "react";
import styles from "./edit.module.css";
import dayjs from "dayjs";

const EditExpenseModal = ({
  setEditExpenseModal,
  getEditExpenseModal,
  getExpenseList,
}) => {
  const [loading, setLoading] = useState(false);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [amountPaid, setAmountPaid] = useState("");

  const editExpense = (id) => {
    EditExpenseData(id)
      .then((res) => {
        if (res.status === 200) {
          setValue("expense_id", res?.data?.data?.expense_id);
          setValue("amount", Number(res?.data?.data?.amount));
          setAmountPaid(Number(res?.data?.data?.amount_paid));
          setValue(
            "expense_date",
            dayjs(res?.data?.data?.expense_date).format("DD/MM/YYYY")
          );
          setValue("category", res?.data?.data?.expense_category);
          setValue("description", res?.data?.data?.description);
          setEditExpenseModal((prev) => ({
            ...prev,
            id: "",
          }));
        }
      })
      .catch((error) => console.log("expense error", error));
  };

  const beforeUpload = (file) => {
    setFileUploadError(false);
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    } else if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    } else {
      setFileUploadError(true);
    }
    return false;
  };

  const fileUploader = ({ fileList: newFileList }) => {
    fileUploadError && setFileList(newFileList);
  };

  const {
    handleSubmit,
    setValue,
    register,
    control,
    watch,
    formState: { errors },
  } = useForm({});

  const data = watch();
  console.log(data, "data");

  useEffect(() => {
    getEditExpenseModal?.id && editExpense(getEditExpenseModal?.id);
  }, [getEditExpenseModal?.id]);

  const toggle = () =>
    setEditExpenseModal((prev) => ({
      ...prev,
      editModal: false,
    }));

  const updateExpenseHandler = (data) => {
    setLoading(true);
    const decoded = localStorage.getItem("userDetails");
    const token = jwtDecode(decoded);
    const formData = new FormData();
    let amountPending = Number(data.amount) - amountPaid;
    formData.append("amount", Number(data.amount));
    formData.append("amount_pending", amountPending);
    if (Number(data.amount) === amountPaid) {
      formData.append("payment_status", "paid");
    } else if (Number(data.amount) === amountPending) {
      formData.append("payment_status", "pending");
    } else if (amountPending !== 0) {
      formData.append("payment_status", "partially paid");
    }
    formData.append("expense_date", data.expense_date);
    formData.append("expense_category", data.category ? data.category : "");
    formData.append("description", data.description ? data.description : "");
    fileList?.length > 0
      ? fileList.forEach((item) => {
          formData.append("attach_files", item?.originFileObj);
        })
      : formData.append("attach_files", fileList);
    formData.append("user_id", token?.user_id);
    updateExpenseData(data.expense_id, formData)
      .then((response) => {
        if (response.status === 200) {
          setEditExpenseModal((prev) => ({
            ...prev,
            editModal: false,
          }));
          message.success("Expense updated successfully");
          setLoading(false);
          getExpenseList();
        }
      })
      .catch((error) => {
        message.success("Something went wrong");
      });
  };

  const CloseBtn = (
    <X className={styles.cursor_pointer} size={15} onClick={toggle} />
  );

  return (
    <Modal
      isOpen={getEditExpenseModal?.editModal}
      className={styles.add_expense_edit_width}
      modalClassName="modal-slide-in"
      contentClassName="pt-0"
    >
      <div className={styles.all_section}>
        <div className={styles.create_exp_head_edit}>
          <div className={styles.head_button_main_edit}>
            <ModalHeader
              className={styles.head_button}
              toggle={toggle}
              close={CloseBtn}
            >
              <h3>Indirect Income </h3>
            </ModalHeader>
          </div>
          <button
            type="submit"
            onClick={handleSubmit(updateExpenseHandler)}
            className={styles.btn_edit}
          >
            {loading && (
              <Spin
                indicator={<LoadingOutlined style={{ color: "white" }} spin />}
              />
            )}{" "}
            Update Income
          </button>
        </div>
        <Form className={styles.amount_page}>
          <div className={styles.create_expense_head_edit}>
            <div className={styles.create_form_expense_edit}>
              <Row>
                <Col className="mb-2">
                  <div className={styles.enter_amount}>
                    <label className={styles.label_amount}>
                      Income in (<FontAwesomeIcon icon={faIndianRupeeSign} />)
                    </label>
                    <InputNumber
                      name="amount"
                      prefix="₹"
                      style={{
                        width: "100%",
                      }}
                      min={1}
                      placeholder="Enter amount in (₹)"
                      {...register("amount", {
                        required: "Please fill amount",
                        validate: (match) => {
                          if (Number(match) - amountPaid < 0) {
                            return "Amount Settled for this expense is more than the amount entered.";
                          }
                        },
                      })}
                      onChange={(value) => setValue("amount", value)}
                      value={watch("amount")}
                    />
                    {errors.amount && (
                      <p className={styles.fill_required}>
                        {errors?.amount?.message}
                      </p>
                    )}
                  </div>
                </Col>
                <Col className="mb-2" md="12">
                  <div className={styles.expense_date}>
                    <label>Income Date</label>
                    <Controller
                      control={control}
                      name="expense_date"
                      render={({ field }) => (
                        <DatePicker
                          style={{ width: "100%" }}
                          className={styles.date_picker_expense}
                          value={dayjs(watch("expense_date"), "DD/MM/YYYY")}
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
              <CardBody>
                <Row>
                  <Col className="mb-2" md="14" sm="12">
                    <div className={styles.category_label}>
                      <Label className={styles.form_label}>
                        Category
                        <span className={styles.paly_icon_small}>
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
              <div className={`${styles.description_edit} mb-2`}>
                <label className={styles.des}>Description</label>
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

              <div className={styles.expense_attached_file}>
                <Upload
                  maxCount={3}
                  beforeUpload={beforeUpload}
                  onChange={(value) => fileUploader(value)}
                  fileList={fileList}
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
              <div>
                <footer className={styles.create_exp_footer}>
                  <div className={styles.exp_footer_btn}>
                    <button
                      type="submit"
                      onClick={handleSubmit(updateExpenseHandler)}
                      className={styles.edit_btn_footer}
                    >
                      {loading && (
                        <Spin
                          indicator={
                            <LoadingOutlined style={{ color: "white" }} spin />
                          }
                        />
                      )}{" "}
                      Update Income
                    </button>
                  </div>
                </footer>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default EditExpenseModal;
