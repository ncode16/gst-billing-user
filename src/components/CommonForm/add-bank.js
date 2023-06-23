// ** React Import
import { useState, useEffect } from "react";
// ** Custom Components

import styles from "./bank.module.css";
// ** Third Party Components
// import Select from 'react-select'
import { useForm } from "react-hook-form";
// ** Reactstrap Imports
import { Button, Label } from "reactstrap";
import { Collapse, Tooltip, message, Drawer, Spin } from "antd";
import { Option } from "antd/es/mentions";
// ** Store & Actions
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { LoadingOutlined } from "@ant-design/icons";
import { addNewBankData } from "../../api/bank/index.js";
import jwtDecode from "jwt-decode";
import { Form, InputGroup } from "react-bootstrap";
const { Panel } = Collapse;

const defaultValues = {
  account_number: "",
  account_number_2: "",
  ifsc_code: "",
  bank_name: "",
  branch_name: "",
  upi: "",
  opening_balance: "",
  upi_number: "",
  notes: "",
  default_bank: false,
  user_id: 0,
};

const AddBankForm = ({
  open,
  getBankListHandler,
  setBankID ,
  setOpenBankSidebar,
}) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    watch,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const addBankDetailsHandler = (bankingInfo) => {
    setLoading(true);
    const decoded = localStorage.getItem("userDetails");
    const token = jwtDecode(decoded);
    delete bankingInfo.account_number_2;
    const modifiedBankingInfo = {
      ...bankingInfo,
      account_number: Number(bankingInfo.account_number),
      opening_balance: Number(bankingInfo.opening_balance),
      user_id: token.user_id,
    };
    const newBankDataResponse = addNewBankData(modifiedBankingInfo);
    newBankDataResponse
      .then((response) => {
        if (response.status === 200) {
          message.success("Bank Details Added Successfully");
          getBankListHandler();
          setLoading(false);
          setBankID("");
          setOpenBankSidebar(false);
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          message.error(err.response.data.message);
          setOpenBankSidebar(false);
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    reset();
  }, [open]);

  const text = (
    <span>
      <small>
        A UPI ID or VPA (Virtual Payment Address) is a unique ID that is used to
        make UPI payments in place of bank account details.
        <br />
        This UPI ID will be used to generate <b>Dynamic QR codes</b> on the
        invoices and bills.
      </small>
    </span>
  );
  return (
    <Drawer
      size="lg"
      open={open}
      width={"50%"}
      onClose={() => setOpenBankSidebar(false)}
      title={
        <span className={styles.add_item_heading_main_span}>
          <span className={styles.add_item_heading_span}>Bank Details</span>
          <span>
            <Button
              color="primary"
              className={styles.save_update_button}
              onClick={handleSubmit(addBankDetailsHandler)}
            >
              {loading && (
                <Spin
                  indicator={
                    <LoadingOutlined
                      className={styles.save_update_loader}
                      spin
                    />
                  }
                />
              )}
              Save & Update
              <FontAwesomeIcon
                icon={faArrowRight}
                className={styles.right_arrow_icon}
                color="primary"
              />
            </Button>
          </span>
        </span>
      }
      headerClassName="mb-1"
      contentClassName="pt-0"
    >
      <div>
        <Form>
          <div className={styles.basic_details_card}>
            <div className={styles.basic_details_card_body}>
              <div className={styles.field_position}>
                <Label className={styles.bank_label_input}>
                  <em className={styles.bank_star}>*</em>Account No
                </Label>
                <InputGroup>
                  <Form.Control
                    className={styles.bank_input_fields}
                    type="number"
                    name="account_number"
                    placeholder="Bank Account No."
                    {...register("account_number", {
                      required: "Please fill Bank Account No.",
                    })}
                  />
                </InputGroup>
                {errors?.account_number && (
                  <span className={styles.bank_errors}>
                    {errors?.account_number?.message}
                  </span>
                )}
              </div>

              <div className={styles.field_position}>
                <Label className={styles.bank_label_input}>
                  <em className={styles.bank_star}>*</em>Confirm Bank Account No
                </Label>
                <InputGroup>
                  <Form.Control
                    className={styles.bank_input_fields}
                    type="number"
                    name="account_number_2"
                    placeholder="Confirm Bank Account No"
                    {...register("account_number_2", {
                      required: "Please confirm your account No.",
                      validate: (match) => {
                        if (match !== watch("account_number")) {
                          return "The Bank Account No.s that you entered do not match!";
                        }
                      },
                    })}
                  />
                </InputGroup>

                {errors?.account_number_2 && (
                  <span className={styles.bank_errors}>
                    {errors?.account_number_2?.message}
                  </span>
                )}
              </div>

              <div className={styles.field_position}>
                <Label className={styles.bank_label_input}>
                  <em className={styles.bank_star}>*</em>IFSC Code
                </Label>
                <div className={styles.ifsc_main_div}>
                  <InputGroup>
                    <Form.Control
                      className={styles.ifsc_code_input}
                      type="text"
                      name="ifsc_code"
                      placeholder="Bank IFSC"
                      {...register("ifsc_code", {
                        required: "Please fill IFSC code",
                      })}
                    />
                  </InputGroup>

                  <span className={styles.fetch_bank}>
                    <Button color="primary" className={styles.bank_details}>
                      Fetch Bank Details
                    </Button>
                  </span>
                </div>
                {errors?.ifsc_code && (
                  <span className={styles.bank_errors}>
                    {errors?.ifsc_code?.message}
                  </span>
                )}
              </div>
              <div className={styles.field_position}>
                <Label className={styles.bank_label_input}>
                  <em className={styles.bank_star}>*</em>Bank Name
                </Label>
                <InputGroup>
                  <Form.Control
                    className={styles.bank_input_fields}
                    type="text"
                    name="bank_name"
                    placeholder="Bank Name"
                    {...register("bank_name", {
                      required: "Please fill Bank Name",
                    })}
                  />
                </InputGroup>
                {errors?.bank_name && (
                  <span className={styles.bank_errors}>
                    {errors?.bank_name?.message}
                  </span>
                )}
              </div>
              <div className={styles.field_position}>
                <Label className={styles.bank_label_input}>
                  <em className={styles.bank_star}>*</em>Branch Name
                </Label>
                <InputGroup>
                  <Form.Control
                    className={styles.bank_input_fields}
                    type="text"
                    name="branch_name"
                    placeholder="Bank Branch Name"
                    {...register("branch_name", {
                      required: "Please fill Branch Name",
                    })}
                  />
                </InputGroup>
                {errors?.branch_name && (
                  <span className={styles.bank_errors}>
                    {errors.branch_name?.message}
                  </span>
                )}
              </div>
              <div className={styles.field_position}>
                <Label className={styles.bank_label_input}>
                  UPI
                  <span className={styles.optional_badge}>OPTIONAL</span>
                  <Tooltip placement="top" title={text}>
                    <FontAwesomeIcon
                      icon={faCircleInfo}
                      className={styles.upi_optional_info}
                    />
                  </Tooltip>
                </Label>
                <InputGroup>
                  <Form.Control
                    className={styles.bank_input_fields}
                    type="text"
                    name="upi"
                    placeholder="UPI ID eg.username@okicici"
                    {...register("upi")}
                  />
                </InputGroup>
              </div>
              <div className={styles.field_position}>
                <Label className={styles.bank_label_input}>
                  Opening Balance
                  <span className={styles.optional_badge}>OPTIONAL</span>
                </Label>
                <InputGroup>
                  <Form.Control
                    className={styles.bank_input_fields}
                    type="text"
                    name="opening_balance"
                    placeholder="Opening Balance (Optional)"
                    {...register("opening_balance")}
                  />
                </InputGroup>
              </div>
              <div className={styles.field_position}>
                <Label className={styles.bank_label_input}>
                  UPI Number
                  <span className={styles.optional_badge}>OPTIONAL</span>
                </Label>
                <InputGroup>
                  <Form.Control
                    className={styles.bank_input_fields}
                    type="text"
                    name="upi_number"
                    placeholder="GPay/PhonePe Number (Optional)"
                    {...register("upi_number")}
                  />
                </InputGroup>
              </div>
              <div className={styles.field_position}>
                <Label className={styles.bank_label_input}>Notes</Label>
                <InputGroup>
                  <Form.Control
                    className={styles.notes_textarea}
                    as="textarea"
                    type="text"
                    name="notes"
                    placeholder="Beneficiary Name, SWIFT Code etc.."
                    {...register("notes")}
                  />
                </InputGroup>
              </div>
              <div className={styles.field_position}>
                <Label className={styles.bank_label_input}>Default</Label>
                <div className={`form-switch form-check-primary ${styles.default_switch_bank}`}>
                  <Form.Check
                    className={styles.default_switch_bank}
                    type="switch"
                    id="custom-switch"
                    name="default_bank"
                    {...register("default_bank")}
                  />
                </div>
                <div className={styles.default_bank}>
                  This will override you previous default bank
                </div>
              </div>
            </div>
          </div>
          <div className={styles.button_position_bank}>
            <Button
              color="primary"
              className={styles.save_update_button}
              onClick={handleSubmit(addBankDetailsHandler)}
            >
              {loading && (
                <Spin
                  indicator={
                    <LoadingOutlined
                      className={styles.save_update_loader}
                      spin
                    />
                  }
                />
              )}
              Save & Update
              <FontAwesomeIcon
                icon={faArrowRight}
                className={styles.right_arrow_icon}
              />
            </Button>
          </div>
        </Form>
      </div>
    </Drawer>
  );
};

export default AddBankForm;
