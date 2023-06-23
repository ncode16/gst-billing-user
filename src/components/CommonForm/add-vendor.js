// ** React Import
import { useState, useEffect } from "react";

// ** Third Party Components
import { useForm, Controller } from "react-hook-form";

// ** Reactstrap Imports
import { Button, Label, Input, Row, Col } from "reactstrap";
import { Select, Collapse, Drawer, Spin, message } from "antd";
import { InputGroup, Form } from "react-bootstrap";

// ** Store & Actions
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faInr } from "@fortawesome/free-solid-svg-icons";
import { LoadingOutlined } from "@ant-design/icons";
import { addVendor, updateVendorData } from "../../api/vendor/index";
import jwtDecode from "jwt-decode";
import styles from "./add-vendor.module.css";
import { ReactMultiEmail, isEmail } from "react-multi-email";
import "react-multi-email/dist/style.css";
import { countryList, tdsPercentageList, stateList } from "../../utility/Utils";

const { Panel } = Collapse;
// const { Option } = Select

const defaultValues = {
  vendor_name: "",
  vendor_country_code: "",
  vendor_phone: "",
  vendor_email: "",
  vendor_cc_emails: [],
  gstin: "",
  company_name: "",
  billing_address: {
    address_line_one: "",
    address_line_two: "",
    city: "",
    state: "",
    pincode: "",
  },
  notes: "",
  tags: [],
  tds: false,
  tds_percentage: "",
  balance: "",
  vendor_debit_amount: null,
  vendor_credit_amount: null,
};

const AddNewVendorForm = ({
  open,
  setVendorOpen,
  getVendorInfo,
  setVendorInfo,
  getVendorData,
}) => {
  // ** States
  const [selectedOption, setSelectedOption] = useState("debit");
  const [tds, setTds] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emails, setEmails] = useState([]);
  const [focused, setFocused] = useState(false);

  // ** Vars
  const {
    control,
    register,
    setValue,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    reset();
    setEmails([]);
  }, [open]);

  useEffect(() => {
    setValue("vendor_name", getVendorInfo?.vendor_name);
    setValue("vendor_country_code", getVendorInfo?.vendor_country_code);
    setValue("vendor_phone", getVendorInfo?.vendor_phone);
    setValue("vendor_email", getVendorInfo?.vendor_email);
    setValue("vendor_cc_emails", getVendorInfo?.vendor_cc_emails);
    setValue("gstin", getVendorInfo?.gstin);
    setValue("company_name", getVendorInfo?.company_name);
    setValue(
      "billing_address.address_line_one",
      getVendorInfo?.billing_address?.address_line_one
    );
    setValue(
      "billing_address.address_line_two",
      getVendorInfo?.billing_address?.address_line_two
    );
    setValue("billing_address.city", getVendorInfo?.billing_address?.city);
    setValue("billing_address.state", getVendorInfo?.billing_address?.state);
    setValue(
      "billing_address.pincode",
      getVendorInfo?.billing_address?.pincode
    );
    setValue("notes", getVendorInfo?.notes);
    setValue("tags", getVendorInfo?.tags);
    setValue("tds", getVendorInfo?.tds);
    setValue("tds_percentage", getVendorInfo?.tds_percentage);
    setValue("balance", getVendorInfo?.balance);
    setValue("vendor_debit_amount", getVendorInfo?.vendor_debit_amount);
    setValue("vendor_credit_amount", getVendorInfo?.vendor_credit_amount);
  }, [getVendorInfo]);

  // ** Function to handle form submit
  const onSubmit = (data) => {
    setLoading(true);
    const decoded = localStorage.getItem("userDetails");
    const token = jwtDecode(decoded);
    const body = {
      ...data,
      balance: data.balance ? Number(data.balance) : 0,
      vendor_debit_amount: data.vendor_debit_amount
        ? Number(data.vendor_debit_amount)
        : 0,
      vendor_credit_amount: data.vendor_credit_amount
        ? Number(data.vendor_credit_amount)
        : 0,
      user_id: token.user_id,
    };
    const newVendorDataResponse =
      Object.keys(getVendorInfo)?.length === 0
        ? addVendor(body)
        : updateVendorData(getVendorInfo?.vendor_id, body);
    newVendorDataResponse
      .then((res) => {
        if (res.status === 200) {
          setVendorOpen(false);
          Object.keys(getVendorInfo)?.length === 0
            ? message.success("Vendor Created Successfully")
            : message.success("Vendor Updated Successfully");
          setLoading(false);
          getVendorData();
          setVendorInfo({});
          setVendorOpen(false);
        }
      })
      .catch((err) => {
        message.error("Something went wrong");
      });
  };

  const isDebit = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleTds = () => {
    if (tds === false) {
      setTds(true);
    } else {
      setTds(false);
    }
  };

  return (
    <Drawer
      open={open}
      title={
        <span className={styles.add_item_heading_main_span}>
          <span className={styles.add_item_heading_span}>
            {Object.keys(getVendorInfo)?.length > 0
              ? "Update Vendor"
              : "Add Vendor"}
          </span>
          <span>
            <Button
              color="primary"
              className={styles.save_update_button}
              onClick={handleSubmit(onSubmit)}
            >
              {loading && (
                <Spin
                  indicator={
                    <LoadingOutlined spin className={styles.vendor_loader} />
                  }
                />
              )}
              Save Vendor
            </Button>
          </span>
        </span>
      }
      headerClassName="mb-1"
      contentClassName="pt-0"
      className="drawer-wrapper"
      width={"54%"}
      onClose={() => setVendorOpen(false)}
    >
      <div>
        <Form>
          <div className={styles.basic_details_header}>
            <h6 className={styles.basic_details}>
              <span className={styles.basic_details_text}>Basic Details</span>
            </h6>
          </div>
          <div className={styles.basic_details_card}>
            <div className={styles.basic_details_card_body}>
              <div className={styles.vendor_name_container}>
                <Label className={styles.basic_details_label}>
                  <em className={styles.name_validation}>*</em> Name
                </Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    name="vendor_name"
                    className={styles.vendor_name}
                    placeholder="Aditya"
                    {...register("vendor_name", { required: true })}
                  />
                </InputGroup>
                {errors.vendor_name && (
                  <span className={styles.vendor_error}>
                    Please enter vendor name
                  </span>
                )}
              </div>
              <Row>
                <Col md="6">
                  <div className={styles.vendor_phone_field}>
                    <Label className={styles.basic_details_label}>Phone</Label>
                    <div
                      className={`${styles.country_code} ${styles.country_code_input_div}`}
                    >
                      <Form.Select
                        name="vendor_country_code"
                        className={styles.country_code_select}
                        {...register("vendor_country_code")}
                      >
                        {countryList?.map((list) => (
                          <option
                            value={list}
                            selected={list === "+91 India" && true}
                          >
                            {list}
                          </option>
                        ))}
                      </Form.Select>

                      <div className={styles.number_details}>
                        <InputGroup>
                          <Form.Control
                            className={styles.phone_number}
                            name="phone_number"
                            type="number"
                            placeholder="8121335436"
                            {...register("vendor_phone")}
                          />
                        </InputGroup>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className={styles.vendor_email_field}>
                    <Label className={styles.basic_details_label}>Email</Label>
                    <InputGroup>
                      <Form.Control
                        type="text"
                        name="vendor_email"
                        placeholder="abc@gmail.com"
                        className={styles.vendor_name}
                        {...register("vendor_email")}
                      />
                    </InputGroup>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <div>
            <h6 className={styles.company_details}>
              <span className={styles.basic_details_text}>Company Details</span>
            </h6>
          </div>
          <div className={styles.basic_details_card}>
            <div className={styles.basic_details_card_body}>
              <Row>
                <Col md="6" className="mb-1">
                  <Label className={styles.basic_details_label}>Company</Label>
                  <InputGroup>
                    <Form.Control
                      name="vendor_company"
                      type="text"
                      placeholder="ABC Technologies"
                      className={styles.vendor_name}
                      {...register("company_name")}
                    />
                  </InputGroup>
                </Col>
                <Col md="6" className="mb-1">
                  <Label className={styles.basic_details_label}>GSTIN</Label>
                  <div
                    className={`${styles.country_code_input_div} gstin-details`}
                  >
                    <InputGroup>
                      <Form.Control
                        name="gstin"
                        placeholder="27AADCB2230M1ZT"
                        className={styles.gstin}
                        {...register("gstin")}
                      />
                    </InputGroup>
                    <Button color="primary" className={styles.fetch_details}>
                      Fetch Details
                    </Button>
                  </div>
                </Col>
                <Col md="12" className={styles.billing_address_lable_col}>
                  <Label className={styles.basic_details_label}>
                    Billing Address
                  </Label>
                  <Row>
                    <Col md="6" className={styles.billing_col}>
                      <InputGroup>
                        <Form.Control
                          name="vendor_address_one"
                          type="text"
                          placeholder="Address Line 1"
                          className={styles.vendor_name}
                          {...register("billing_address.address_line_one")}
                        />
                      </InputGroup>
                    </Col>
                    <Col md="6" className={styles.billing_col}>
                      <InputGroup>
                        <Form.Control
                          name="vendor_address_two"
                          type="text"
                          placeholder="Address Line 2"
                          className={styles.vendor_name}
                          {...register("billing_address.address_line_two")}
                        />
                      </InputGroup>
                    </Col>
                    <Col md="6" className={styles.billing_col}>
                      <InputGroup>
                        <Form.Control
                          name="city"
                          type="text"
                          placeholder="City"
                          className={styles.vendor_name}
                          {...register("billing_address.city")}
                        />
                      </InputGroup>
                    </Col>
                    <Col md="6" className={styles.billing_col}>
                      <Form.Select
                        className={styles.vendor_state}
                        placeholder="Select State"
                        {...register("billing_address.state")}
                      >
                        {stateList?.map((list) => (
                          <option
                            value={list}
                            selected={list === "01-JAMMUANDKASHMIR" && true}
                          >
                            {list}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                    <Col md="6" className={styles.billing_col}>
                      <InputGroup>
                        <Form.Control
                          name="pincode"
                          type="text"
                          placeholder="Pincode"
                          className={styles.vendor_name}
                          {...register("billing_address.pincode")}
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
          <div>
            <h6 className={styles.company_details}>
              <span className={styles.basic_details_text}>
                Optional Details
              </span>
            </h6>
          </div>
          <div className={styles.optional_details_card}>
            <div className={styles.optional_details_card_body}>
              <Row>
                <Col md="12">
                  <Label className={styles.opening_balance_label}>
                    Opening Balance
                  </Label>
                  <div className={styles.opening_balance_main_div}>
                    <div className={`form-check ${styles.debit_radio}`}>
                      <input
                        type="radio"
                        id="ex1-active"
                        name="ex1"
                        value="debit"
                        onChange={isDebit}
                        defaultChecked
                      />
                      <Label
                        className={`form-check-label ${styles.debit_label_name}`}
                        for="ex1-active"
                      >
                        Debit
                      </Label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        name="ex1"
                        id="ex1-inactive"
                        value="credit"
                        onChange={isDebit}
                      />
                      <Label
                        className={`form-check-label ${styles.debit_label_name}`}
                        for="ex1-inactive"
                      >
                        Credit
                      </Label>
                    </div>
                  </div>
                  {selectedOption === "debit" ? (
                    <div className={styles.debit_main_div}>
                      <span className={styles.debit_span}>
                        <InputGroup>
                          <Form.Control
                            type="text"
                            name="vendor_debit_amount"
                            placeholder="Enter Debit Amount"
                            className={styles.debit_amount}
                            {...register("vendor_debit_amount")}
                          />
                        </InputGroup>
                        <div className={styles.debit_div}>
                          <label className={styles.vendor_debit_label}>
                            Vendor Pays You{" "}
                            <FontAwesomeIcon
                              icon={faInr}
                              className={styles.vendor_pay_icon}
                            />
                            {watch("vendor_debit_amount")}
                          </label>
                        </div>
                      </span>
                    </div>
                  ) : (
                    <div className={styles.debit_main_div}>
                      <span className={styles.debit_span}>
                        <InputGroup>
                          <Form.Control
                            type="text"
                            name="vendor_credit_amount"
                            placeholder="Enter Credit Amount"
                            className={styles.debit_amount}
                            {...register("vendor_credit_amount")}
                          />
                        </InputGroup>
                        <div className={styles.debit_div}>
                          <label className={styles.vendor_credit_label}>
                            You pay the Vendor{" "}
                            <FontAwesomeIcon
                              icon={faInr}
                              className={styles.vendor_pay_icon}
                            />
                            {watch("vendor_debit_amount")}
                          </label>
                        </div>
                      </span>
                    </div>
                  )}
                </Col>
                <Col md="12">
                  <div className={styles.debit_main_div}>
                    <Label className={styles.basic_details_label}>
                      Balance
                    </Label>
                  </div>
                  <InputGroup>
                    <Form.Control
                      type="number"
                      disabled
                      className={styles.balance_disable}
                      placeholder="0"
                      {...register("balance", { valueAsNumber: true })}
                    />
                  </InputGroup>
                </Col>
                <Col md="12">
                  <div className={styles.debit_main_div}>
                    <Label className={styles.basic_details_label}>TDS</Label>
                    <div
                      className={`form-switch form-check-primary ${styles.tds_switch_div}`}
                    >
                      <Input
                        type="switch"
                        id="switch-primary"
                        name="primary"
                        onClick={handleTds}
                      />
                    </div>
                    {tds && (
                      <div>
                        <label className={styles.tds_percentage_label}>
                          TDS Percentage
                        </label>
                        <Form.Select
                          name="tds_percentage"
                          className={styles.tds_percentage}
                          {...register("tds_percentage")}
                        >
                          {tdsPercentageList?.map((list) => (
                            <option
                              value={list}
                              selected={
                                list === "10% 192A EPF premature withdrawal" &&
                                true
                              }
                            >
                              {list}
                            </option>
                          ))}
                        </Form.Select>
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <div className={styles.vendor_more_details_section}>
            <Collapse>
              <Panel
                header={
                  <div className={styles.tags_text}>
                    <span>More Details?</span>
                    <p>Add CC Emails, Tags, Notes</p>
                  </div>
                }
                key="1"
              >
                <div className={styles.discount_section}>
                  <div className={styles.discount_fild}>
                    <label>Tags</label>
                    <Controller
                      control={control}
                      name="tags"
                      render={({ field }) => (
                        <Select
                          onChange={(value) => setValue("tags", value)}
                          mode="tags"
                          className={styles.react_select}
                          dropdownStyle={{
                            zIndex: 99999999,
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className={styles.discount_fild}>
                    <label>Notes</label>
                    <InputGroup>
                      <Form.Control
                        as="textarea"
                        name="reference"
                        className={styles.notes_textarea}
                        placeholder="Notes"
                        {...register("notes")}
                      />
                    </InputGroup>
                  </div>

                  <div className={styles.discount_fild}>
                    <label>CC Emails</label>
                    <ReactMultiEmail
                      placeholder="Add CC Emails separated by comma"
                      emails={emails}
                      onChange={(value) => {
                        setValue("vendor_cc_emails", value);
                      }}
                      autoFocus={true}
                      onFocus={() => setFocused(true)}
                      onBlur={() => setFocused(false)}
                      getLabel={(email, index, removeEmail) => {
                        return (
                          <div data-tag key={index}>
                            <div data-tag-item>{email}</div>
                            <span
                              data-tag-handle
                              onClick={() => removeEmail(index)}
                            >
                              ×
                            </span>
                          </div>
                        );
                      }}
                    />
                    <p className={styles.cc_email_text}>
                      These emails will be added as CC in all the emails sent to
                      this customer
                    </p>
                  </div>
                </div>
              </Panel>
            </Collapse>
          </div>
          <div className={styles.vendor_button_position}>
            <Button
              color="primary"
              className={styles.save_update_button}
              onClick={handleSubmit(onSubmit)}
            >
              {loading && (
                <Spin
                  indicator={
                    <LoadingOutlined spin className={styles.vendor_loader} />
                  }
                />
              )}{" "}
              {Object.keys(getVendorInfo)?.length > 0
                ? "Update Vendor"
                : "Add Vendor"}
            </Button>
            <button
              className={styles.cancel_button}
              type="button"
              onClick={() => setVendorOpen(false)}
            >
              Cancel
            </button>
          </div>
        </Form>
      </div>
    </Drawer>
  );
};

export default AddNewVendorForm;
