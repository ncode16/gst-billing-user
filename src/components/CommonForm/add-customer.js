import { useState, useEffect, useRef } from "react";
import jwt_decode from "jwt-decode";
import { useForm, Controller } from "react-hook-form";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import {
  InputGroup,
  Form,
  Button,
  Col,
  Row,
  OverlayTrigger,
  Popover,
  Overlay,
} from "react-bootstrap";
import { Input, Label } from "reactstrap";
import { Plus } from "react-feather";
import styles from "./add-customer.module.css";
import { countryList, tdsPercentageList } from "../../utility/Utils";
import BillingAddress from "./billingAddress";
import ShippingAddress from "./shippingAddress";
import { Drawer, Switch, Collapse, message, Select } from "antd";
import { faInr, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactMultiEmail, isEmail } from "react-multi-email";
import "react-multi-email/dist/style.css";
import { ArrowRight } from "react-feather";
import {
  addShippingAddress,
  getShippingAddress,
  getShippingData,
} from "../../api/shippingAddressManagement";
import {
  deleteBillingAddresss,
  getBillingAddress,
  getEditBillingAddressData,
} from "../../api/billingAddressManagement";
import {
  AddNewCustomerData,
  deleteShippingAddresss,
  updateCustomer,
} from "../../api/addCustomerManagement";
import "../../views/apps/quotations/quotation.css";

const { Panel } = Collapse;

const AddCustomerForm = ({
  open,
  setSidebarOpen,
  getCustomerData,
  getCustomerList,
  setCustomerData,
}) => {
  const [getBillingAndShippingModal, setBillingAndShippingModal] = useState({
    billingModal: false,
    shippingModal: false,
  });
  const [getBillingInfo, setBillingInfo] = useState({});
  const [getBillingAndShippingList, setBillingAndShippingList] = useState({
    billingList: [],
    shippingList: [],
  });
  const [getUserId, setUserId] = useState("");
  const [getBillingAndShippingInfo, setBillingAndShippingInfo] = useState({});
  const [getBillingAndShippingId, setBillingAndShippingId] = useState("");
  const [show, setShow] = useState({
    billingDeletePopover: false,
    shippingDeletePopover: false,
  });
  const [target, setTarget] = useState({
    billingDeletePopoverTarget: null,
    shippingDeletePopoverTarget: null,
  });
  const [checkDebit, setCheckDebit] = useState("debit");
  const [getTDSValue, setTDSValue] = useState(false);
  const [emails, setEmails] = useState([]);
  const [focused, setFocused] = useState(false);
  const [getCustomerLoader, setCustomerLoader] = useState(false);
  const billingref = useRef(null);
  const shippingref = useRef(null);

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const addCustomerHandler = (data) => {
    const modifiedAddCustomer = {
      ...data,
      billing_address_id: getBillingAndShippingList?.billingList?.[0]
        ?.billing_address_id
        ? getBillingAndShippingList?.billingList?.[0]?.billing_address_id
        : null,
      shipping_address_id: getBillingAndShippingList?.shippingList?.[0]
        ?.shipping_address_id
        ? getBillingAndShippingList?.shippingList?.[0]?.shipping_address_id
        : null,
      user_id: getUserId,
      tds: getTDSValue,
      balance: data.balance ? Number(data?.balance) : 0,
      discount: data.discount ? Number(data?.discount) : 0,
      customer_debit_amount: data.customer_debit_amount
        ? Number(data?.customer_debit_amount)
        : 0,
      customer_credit_amount: data.customer_credit_amount
        ? Number(data?.customer_credit_amount)
        : 0,
    };
    const customerResponse =
      Object.keys(getCustomerData)?.length === 0
        ? AddNewCustomerData(modifiedAddCustomer)
        : updateCustomer(getCustomerData?.customer_id, modifiedAddCustomer);

    customerResponse
      .then((response) => {
        setCustomerLoader(true);
        if (response.status === 200) {
          getCustomerData?.customer_id
            ? message.success("customer updated successfully")
            : message.success("customer added successfully");
          setSidebarOpen(false);
          setCustomerLoader(false);
          getCustomerList();
          setCustomerData([]);
        }
      })
      .catch((err) => message.error("Something went wrong"));
  };

  useEffect(() => {
    let decoded = jwt_decode(localStorage.getItem("userDetails"));
    setUserId(decoded?.user_id);
    getBillingListHandler();
    getShippingListHandler();
  }, []);

  useEffect(() => {
    reset();
    setEmails([]);
  }, [open]);

  const deleteBillingAddressPopOver = (event) => {
    setShow((prev) => ({
      ...prev,
      billingDeletePopover: !show.billingDeletePopover,
    }));
    setTarget((prev) => ({
      ...prev,
      billingDeletePopoverTarget: event.target,
    }));
  };

  const deleteShippingAddressPopOver = (event) => {
    setShow((prev) => ({
      ...prev,
      shippingDeletePopover: !show.shippingDeletePopover,
    }));
    setTarget((prev) => ({
      ...prev,
      shippingDeletePopoverTarget: event.target,
    }));
  };

  const getBillingListHandler = () => {
    const billingList = getBillingAddress();
    billingList.then((response) => {
      if (response.status === 200) {
        setBillingAndShippingList((prev) => ({
          ...prev,
          billingList: response?.data?.data,
        }));
      }
    });
  };

  const getBillingInfoHandler = (billingId) => {
    setBillingAndShippingId(billingId);
    const getBillingInfo = getEditBillingAddressData(billingId);
    getBillingInfo.then((response) => {
      if (response.status === 200) {
        setBillingAndShippingInfo(response?.data?.data);
        setBillingAndShippingModal((prev) => ({
          ...prev,
          billingModal: true,
        }));
      }
    });
  };

  const deleteBillInfoHandler = (billingId) => {
    const deleteBillingData = deleteBillingAddresss(billingId);
    deleteBillingData
      .then((response) => {
        if (response.status === 200) {
          message.success("Billing address deleted successfully");
          getBillingListHandler();
          setShow((prev) => ({
            ...prev,
            billingDeletePopover: false,
          }));
        }
      })
      .catch((err) => message.error("Something went wrong"));
  };

  const getShippingListHandler = () => {
    const shippingList = getShippingAddress();
    shippingList.then((response) => {
      if (response.status === 200) {
        setBillingAndShippingList((prev) => ({
          ...prev,
          shippingList: response?.data?.data,
        }));
      }
    });
  };

  const getShippingInfoHandler = (shippingId) => {
    setBillingAndShippingId(shippingId);
    const getShippingInfo = getShippingData(shippingId);
    getShippingInfo.then((response) => {
      if (response.status === 200) {
        setBillingAndShippingInfo(response?.data?.data);
        setBillingAndShippingModal((prev) => ({
          ...prev,
          shippingModal: true,
        }));
      }
    });
  };

  const deleteShippingInfoHandler = (shippingId) => {
    const deleteShippingAddress = deleteShippingAddresss(shippingId);
    deleteShippingAddress
      .then((response) => {
        if (response.status === 200) {
          message.success("Shipping address deleted successfully");
          getShippingListHandler();
          setShow((prev) => ({
            ...prev,
            shippingDeletePopover: false,
          }));
        }
      })
      .catch((err) => message.error("Something went wrong"));
  };

  useEffect(() => {
    if (Object.keys(getBillingInfo)?.length > 0) {
      const users = [
        "address_line_one",
        "address_line_two",
        "city",
        "state",
        "pincode",
        "user_id",
      ];
      const modifiedGetBillingInfo = Object.keys(getBillingInfo)
        .filter((key) => users.includes(key))
        .reduce((obj, key) => {
          obj[key] = getBillingInfo[key];
          return obj;
        }, {});

      const shippingResponse = addShippingAddress(modifiedGetBillingInfo);
      shippingResponse
        .then((response) => {
          if (response.status === 200) {
            message.success("Shipping address added successfully");
            setBillingInfo({});
            getShippingListHandler();
          }
        })
        .catch((err) => message.error("Something went wrong"));
    }
  }, [getBillingInfo]);

  useEffect(() => {
    let decoded = jwt_decode(localStorage.getItem("userDetails"));
    setUserId(decoded?.user_id);
  }, []);

  useEffect(() => {
    if (getCustomerData && Object.keys(getCustomerData)?.length > 0) {
      setValue("customer_name", getCustomerData?.customer_name);
      setValue("customer_phone", getCustomerData?.customer_phone);
      setValue("customer_email", getCustomerData?.customer_email);
      setValue("customer_gstin", getCustomerData?.customer_gstin);
      setValue("customer_company", getCustomerData?.customer_company);
      setValue("discount", getCustomerData?.discount);
      setValue("notes", getCustomerData?.notes);
      setValue("balance", getCustomerData?.balance);
      setValue("customer_debit_amount", getCustomerData?.customer_debit_amount);
      setValue(
        "customer_credit_amount",
        getCustomerData?.customer_credit_amount
      );
      setBillingAndShippingList({
        billingList: Object.keys(getCustomerData?.billing_address_data || {})
          ?.length > 0 && [getCustomerData?.billing_address_data],
        shippingList: Object.keys(getCustomerData?.shipping_address_data || {})
          ?.length > 0 && [getCustomerData?.shipping_address_data],
      });
      setValue("customer_cc_emails", getCustomerData?.customer_cc_emails);
      setEmails(getCustomerData?.customer_cc_emails);
      setValue("tags", getCustomerData?.tags ? getCustomerData?.tags : []);
      setValue("tds_percentage", getCustomerData?.tds_percentage);
      setValue("customer_country_code", getCustomerData?.customer_country_code);
      setTDSValue(getCustomerData?.tds ? true : false);
      setCheckDebit(
        getCustomerData?.customer_credit_amount ? "credit" : "debit"
      );
    }
  }, [getCustomerData]);

  useEffect(() => {
    if (getCustomerData?.length === 0) {
      reset();
      setEmails([]);
      setValue("discount", 0);
    }
  }, [open]);

  return (
    <>
      <Drawer
        title={
          <span className={styles.billing_form_wrapper}>
            <span className={styles.add_item_heading_span}>
              {getCustomerData?.length === 0
                ? "Add Customer"
                : "Update Customer"}
            </span>
            <span>
              <Button
                color="primary"
                className={styles.save_update_button}
                onClick={handleSubmit(addCustomerHandler)}
              >
                {getCustomerLoader && (
                  <Spin
                    indicator={
                      <LoadingOutlined
                        spin
                        className={styles.customer_loader}
                      />
                    }
                  />
                )}{" "}
                Save Customer
              </Button>
            </span>
          </span>
        }
        width={"54%"}
        closable={true}
        onClose={() => setSidebarOpen(false)}
        open={open}
      >
        <div>
          <Form className={`${styles.add_customer_form_wrapper}`}>
            <div
              className={`${styles.document_setting_text} ${styles.add_customer_form}`}
            >
              <div className={styles.add_custom_text_box}>
                <div className={styles.additional_text}>Basic Details</div>
                <div className={styles.add_custom_fields}></div>
              </div>
              <div className={`${styles.card_box} ${styles.additional_form}`}>
                <div className={styles.document_prefixes}>
                  <Row className={styles.first_prefix_row}>
                    <Col sm="12" className="mb-1">
                      <Form.Label htmlFor="inputPassword5">
                        <em>*</em> Name
                      </Form.Label>
                      <InputGroup size="sm">
                        <Form.Control
                          className={styles.name_input}
                          aria-label="Small"
                          aria-describedby="inputGroup-sizing-sm"
                          name="customer_name"
                          placeholder="Aditya"
                          {...register("customer_name", {
                            required: "Please enter your name",
                          })}
                          value={watch("customer_name")}
                        />
                      </InputGroup>
                      {errors.customer_name && (
                        <p className={styles.error_message_name}>
                          {errors?.customer_name?.message}
                        </p>
                      )}
                    </Col>
                  </Row>
                  <Row className={styles.first_prefix_row}>
                    <div className={styles.customer_phone}>
                      <Col
                        md="12"
                        lg="6"
                        className={`${styles.phone_container} mb-1`}
                      >
                        <Form.Label htmlFor="inputPassword5">Phone</Form.Label>
                        <div className={`${styles.phone_input_fields}`}>
                          <Form.Select
                            size="sm"
                            id="sel1"
                            className={styles.react_select}
                            name="customer_country_code"
                            {...register("customer_country_code")}
                            value={watch("customer_country_code")}
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

                          <InputGroup
                            size="sm"
                            className={styles.mobile_fields}
                          >
                            <Form.Control
                              className={styles.field_input}
                              aria-label="Small"
                              aria-describedby="inputGroup-sizing-sm"
                              name="customer_phone"
                              placeholder="Enter Mobile Number"
                              type="number"
                              {...register("customer_phone")}
                              value={watch("customer_phone")}
                            />
                          </InputGroup>
                        </div>
                      </Col>

                      <Col md="12" lg="6">
                        <Form.Label className={styles.form_label}>
                          Email
                        </Form.Label>
                        <div>
                          <Form.Group
                            className="mb-1"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Control
                              type="email"
                              placeholder="gmail@gmail.com"
                              className={styles.field_input}
                              name="customer_email"
                              value={watch("customer_email")}
                              {...register("customer_email", {
                                pattern: {
                                  value:
                                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: "Please enter valid email address",
                                },
                              })}
                            />
                            {errors.customer_email && (
                              <p className={styles.error_message}>
                                {errors.customer_email?.message}
                              </p>
                            )}
                          </Form.Group>
                        </div>
                      </Col>
                    </div>
                  </Row>
                </div>
              </div>
            </div>
            <div className={styles.document_setting_text}>
              <div className={styles.additional_text}>
                Company Details (Optional)
              </div>
              <div className={styles.card_box}>
                <div className={styles.additional_form}>
                  <Row className={styles.first_prefix_row}>
                    <Col md="12" className="mb-1">
                      <Form.Label htmlFor="inputPassword5">GSTIN</Form.Label>
                      <div className={styles.fetch_details}>
                        <InputGroup>
                          <Form.Control
                            placeholder="27AADCB2230M1ZT"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            {...register("customer_gstin")}
                            value={watch("customer_gstin")}
                          />
                          <Button
                            type="button"
                            id="button-addon2"
                            className={styles.gstin_input}
                          >
                            Fetch Details
                          </Button>
                        </InputGroup>
                      </div>
                    </Col>
                  </Row>
                  <Row className={styles.first_prefix_row}>
                    <Col md="12" className="mb-1">
                      <Form.Label htmlFor="inputPassword5">
                        Company Name
                      </Form.Label>
                      <InputGroup size="sm">
                        <Form.Control
                          placeholder="ABC Technologies Private Limited"
                          className={styles.field_input}
                          aria-label="Small"
                          aria-describedby="inputGroup-sizing-sm"
                          {...register("customer_company")}
                          value={watch("customer_company")}
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
            <div className={styles.billing_address_section}>
              {getBillingAndShippingList?.billingList?.length > 0 ? (
                <div>
                  <div className={styles.billing_listing_heading}>
                    Billing Address
                  </div>
                  <div className={styles.billing_listing_div}>
                    {getBillingAndShippingList?.billingList?.map(
                      (billingInfo) => {
                        return (
                          <div
                            id={billingInfo?.billing_address_id}
                            className={styles.billing_list_data}
                          >
                            <p className={styles.billing_data_p}>
                              {billingInfo?.address_line_one}
                            </p>
                            <p className={styles.billing_data_p}>
                              {billingInfo?.address_line_two}
                            </p>
                            <p className={styles.billing_data_p}>
                              {billingInfo?.city}
                            </p>
                            <p className={styles.billing_data_p}>
                              {billingInfo?.state} - {billingInfo?.pincode}
                            </p>
                            <div className={styles.billing_button_container}>
                              <button
                                type="button"
                                className={`${styles.billing_address_edit_btn} ${styles.edit_shipping}`}
                                onClick={() =>
                                  getBillingInfoHandler(
                                    billingInfo?.billing_address_id
                                  )
                                }
                              >
                                Edit
                              </button>
                              <div ref={billingref}>
                                <button
                                  onClick={deleteBillingAddressPopOver}
                                  type="button"
                                  className={`${styles.billing_address_edit_btn} ${styles.delete_shipping}`}
                                >
                                  Delete
                                </button>

                                <Overlay
                                  show={show.billingDeletePopover}
                                  target={target.billingDeletePopoverTarget}
                                  placement="top"
                                  container={billingref}
                                  containerPadding={20}
                                >
                                  <Popover
                                    id="popover-contained"
                                    placement="top"
                                  >
                                    <Popover.Header as="h3">
                                      Sure to delete?
                                    </Popover.Header>
                                    <Popover.Body>
                                      <div className="pop-over">
                                        <button
                                          type="button"
                                          className={
                                            styles.billing_address_edit_btn
                                          }
                                          onClick={() => {
                                            setShow((prev) => ({
                                              ...prev,
                                              billingDeletePopover: false,
                                            }));
                                          }}
                                        >
                                          Cancel
                                        </button>
                                        <button
                                          type="button"
                                          className={`${styles.billing_address_edit_btn} ${styles.ant_btn_primary}`}
                                          onClick={() => {
                                            deleteBillInfoHandler(
                                              billingInfo?.billing_address_id
                                            );
                                          }}
                                        >
                                          OK
                                        </button>
                                      </div>
                                    </Popover.Body>
                                  </Popover>
                                </Overlay>
                              </div>
                              {getBillingAndShippingList?.shippingList
                                ?.length === 0 && (
                                <button
                                  type="button"
                                  className={`${styles.billing_address_edit_btn} ${styles.copy_shipping}`}
                                  onClick={() => setBillingInfo(billingInfo)}
                                >
                                  Copy to shipping
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              ) : (
                <div className={styles.billing_address}>
                  <label>Billing Address</label>
                  <button
                    type="button"
                    className={styles.billing_btn}
                    onClick={() =>
                      setBillingAndShippingModal((prev) => ({
                        ...prev,
                        billingModal: true,
                      }))
                    }
                  >
                    <span className={styles.plus_icon}>
                      <Plus />
                    </span>
                    Billing Address
                  </button>
                </div>
              )}
              {getBillingAndShippingList?.shippingList?.length > 0 ? (
                <div>
                  <div className={styles.shipping_listing_heading}>
                    Shipping Address
                  </div>
                  <div className={styles.billing_listing_div}>
                    {getBillingAndShippingList?.shippingList?.map(
                      (shippingInfo) => {
                        return (
                          <div
                            id={shippingInfo?.shipping_address_id}
                            className={styles.billing_list_data}
                          >
                            <p className={styles.billing_data_p}>
                              {shippingInfo?.address_line_one}
                            </p>
                            <p className={styles.billing_data_p}>
                              {shippingInfo?.address_line_two}
                            </p>
                            <p className={styles.billing_data_p}>
                              {shippingInfo?.city}
                            </p>
                            <p className={styles.billing_data_p}>
                              {shippingInfo?.state} - {shippingInfo?.pincode}
                            </p>
                            <p className={styles.billing_data_p}>
                              {shippingInfo?.notes}
                            </p>
                            <div className={styles.billing_button_container}>
                              <button
                                type="button"
                                className={`${styles.billing_address_edit_btn} ${styles.edit_shipping}`}
                                onClick={() =>
                                  getShippingInfoHandler(
                                    shippingInfo?.shipping_address_id
                                  )
                                }
                              >
                                Edit
                              </button>
                              <div ref={shippingref}>
                                <button
                                  className={`${styles.billing_address_edit_btn} ${styles.payout_btn2_payout} ${styles.delete_shipping}`}
                                  onClick={deleteShippingAddressPopOver}
                                  type="button"
                                >
                                  Delete
                                </button>

                                <Overlay
                                  show={show.shippingDeletePopover}
                                  target={target.shippingDeletePopoverTarget}
                                  placement="top"
                                  container={shippingref}
                                  containerPadding={20}
                                >
                                  <Popover
                                    id="popover-contained"
                                    placement="top"
                                  >
                                    <Popover.Header as="h3">
                                      Sure to delete?
                                    </Popover.Header>
                                    <Popover.Body>
                                      <div className={styles.pop_over}>
                                        <button
                                          type="button"
                                          className={
                                            styles.billing_address_edit_btn
                                          }
                                          onClick={() => {
                                            setShow((prev) => ({
                                              ...prev,
                                              shippingDeletePopover: false,
                                            }));
                                          }}
                                        >
                                          Cancel
                                        </button>
                                        <button
                                          type="button"
                                          className={`${styles.billing_address_edit_btn} ${styles.ant_btn_primary}`}
                                          onClick={() => {
                                            deleteShippingInfoHandler(
                                              shippingInfo?.shipping_address_id
                                            );
                                          }}
                                        >
                                          OK
                                        </button>
                                      </div>
                                    </Popover.Body>
                                  </Popover>
                                </Overlay>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              ) : (
                <div className={styles.billing_address}>
                  <label>Shipping Address</label>
                  <button
                    type="button"
                    className={`${styles.billing_btn} ${styles.shipping_btn}`}
                    onClick={() =>
                      setBillingAndShippingModal((prev) => ({
                        ...prev,
                        shippingModal: true,
                      }))
                    }
                  >
                    <span className={styles.plus_icon}>
                      <Plus />
                    </span>
                    Shipping Address
                  </button>
                </div>
              )}
            </div>
            <div
              className={`${styles.document_setting_text} ${styles.export_invoice}`}
            >
              <div className={styles.additional_text}>Optional Details</div>

              <div className={styles.card_box}>
                <div className={styles.additional_form}>
                  <div className={styles.opening_radio}>
                    <label className="mb-2">Opening Balance</label>
                    <div className={`mb-2 ${styles.billing_button_container}`}>
                      <div className="form-check">
                        <Input
                          type="radio"
                          id="ex1-active"
                          name="ex1"
                          value={checkDebit}
                          onChange={(e) => {
                            e.target.checked && setCheckDebit("debit");
                          }}
                          defaultChecked
                        />
                        <Label for="ex1-active">Debit</Label>
                      </div>
                      <div
                        className={`${styles.customer_debit_radio} form-check`}
                      >
                        <Input
                          type="radio"
                          name="ex1"
                          id="ex1-inactive"
                          value={checkDebit}
                          onChange={(e) => {
                            e.target.checked && setCheckDebit("credit");
                          }}
                        />
                        <Label for="ex1-inactive">Credit</Label>
                      </div>
                    </div>
                    <div className={`mb-2 ${styles.customer_debit_number}`}>
                      <span className={styles.debit_span}>
                        <InputGroup>
                          <Form.Control
                            type="number"
                            name={
                              checkDebit === "debit"
                                ? "customer_debit_amount"
                                : "customer_credit_amount"
                            }
                            placeholder={
                              checkDebit === "debit"
                                ? "customer_debit_amount"
                                : "customer_credit_amount"
                            }
                            className={styles.debit_amount}
                            {...register(
                              checkDebit === "debit"
                                ? "customer_debit_amount"
                                : "customer_credit_amount"
                            )}
                            value={
                              checkDebit === "debit"
                                ? watch("customer_debit_amount")
                                : watch("customer_credit_amount")
                            }
                          />
                        </InputGroup>
                        {checkDebit === "debit" && (
                          <div className={styles.debit_div}>
                            <Label className={styles.vendor_debit_label}>
                              Customer pays you
                              <FontAwesomeIcon
                                icon={faInr}
                                className={styles.customer_pay_amount}
                              />
                              {watch("customer_debit_amount")}
                            </Label>
                          </div>
                        )}
                        {checkDebit === "credit" && (
                          <div className={styles.debit_div}>
                            <Label className={styles.vendor_credit_label}>
                              You pay the Customer{" "}
                              <FontAwesomeIcon
                                icon={faInr}
                                className={styles.customer_pay_amount}
                              />
                              {watch("customer_credit_amount")}
                            </Label>
                          </div>
                        )}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`${styles.opening_radio} ${styles.radio_div} mb-2`}
                  >
                    <Form.Label htmlFor="inputPassword5">Balance</Form.Label>
                    <InputGroup>
                      <Form.Control
                        disabled
                        type="number"
                        name="vendor_debit_amount"
                        placeholder="0"
                        value={watch("balance")}
                        className="balance-input"
                        {...register("balance")}
                      />
                    </InputGroup>
                  </div>
                  <Col md="6" className="mb-2">
                    <Form.Label htmlFor="inputPassword5">TDS</Form.Label>
                    <div className={`${styles.form_switch} form-check-primary`}>
                      <Switch
                        id="switch-primary"
                        name="tds"
                        checked={getTDSValue}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                        onChange={(value) => setTDSValue(value)}
                      />
                    </div>
                  </Col>
                  {getTDSValue && (
                    <div
                      className={`${styles.phone_col} ${styles.tds_switch_sub_div}`}
                    >
                      <Form.Label htmlFor="inputPassword5">
                        TDS Percentage
                      </Form.Label>
                      <select
                        placeholder="Select Tds"
                        type="text"
                        value={watch("tds_percentage")}
                        className={`${styles.state_select} ${styles.city_input} ${styles.tdsPercentage}`}
                        {...register("tds_percentage")}
                      >
                        {tdsPercentageList?.map((tds) => {
                          return (
                            <option
                              value={tds}
                              hidden={tds === "" ? true : false}
                            >
                              {tds === "" ? "Please select TDS" : tds}
                            </option>
                          );
                        })}
                      </select>

                      {/* <Controller
                        control={control}
                        name="tds_percentage"
                        render={({ field }) => (
                          <Select
                            defaultValue="1%"
                            style={{
                              width: 120,
                            }}
                            dropdownStyle={{
                              zIndex: 99999999,
                            }}
                            onChange={getTDSPercentage}
                            filterOption={false}
                            options={[
                              {
                                value: "1%",
                                label: "1%",
                              },
                              {
                                value: "2%",
                                label: "2%",
                              },
                              {
                                value: "3%",
                                label: "3%",
                              },
                            ]}
                          />
                        )}
                      /> */}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.more_details_section}>
              <Collapse>
                <Panel
                  header={
                    <div className={styles.tags_text}>
                      <span>More Details?</span>
                      <p>Add Notes, Tags, Discount, CC Emails</p>
                    </div>
                  }
                  key="1"
                >
                  <div className={styles.discount_section}>
                    <div className={styles.discount_fild}>
                      <Form.Group
                        className="mb-1"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Discount(%)</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="name@example.com"
                          value={watch("discount")}
                          {...register("discount", {
                            validate: (match) => {
                              return match < 100
                                ? true
                                : "Discount should be less than or equal to 100%";
                            },
                          })}
                        />
                        {errors?.discount && (
                          <p className={styles.error_message}>
                            {errors?.discount?.message}
                          </p>
                        )}
                      </Form.Group>
                    </div>
                    <div className={styles.discount_fild}>
                      <Form.Group
                        className="mb-1"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label>Notes</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          {...register("notes")}
                        />
                      </Form.Group>
                    </div>
                    <div className={`${styles.discount_fild} mb-1`}>
                      <Form.Label htmlFor="inputPassword5">Tags</Form.Label>
                      <Controller
                        control={control}
                        name="tags"
                        render={({ field }) => (
                          <Select
                            onChange={(value) => {
                              setValue("tags", value);
                            }}
                            value={watch("tags")}
                            mode="tags"
                            className="react-select"
                            dropdownStyle={{
                              zIndex: 99999999,
                            }}
                          />
                        )}
                      />
                    </div>
                    <div className={styles.discount_fild}>
                      <Form.Label>
                        CC Emails<em className={styles.new_text}>NEW</em>
                      </Form.Label>
                      <ReactMultiEmail
                        emails={emails}
                        onChange={(value) => {
                          console.log(value, "value");
                          setValue("customer_cc_emails", value);
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
                    </div>
                  </div>
                </Panel>
              </Collapse>
            </div>
            <div className={styles.footer}>
              <button
                type="button"
                className={styles.save_customer_btn}
                onClick={handleSubmit(addCustomerHandler)}
              >
                <span className={styles.save_customer_btn}>
                  {getCustomerLoader && (
                    <Spin
                      indicator={
                        <LoadingOutlined
                          spin
                          className={styles.customer_loader}
                        />
                      }
                    />
                  )}{" "}
                  Save
                  <span className={styles.arrow_right}>
                    <ArrowRight />
                  </span>
                </span>
              </button>
              <Button className="ms-2 btn btn-secondary" color="secondary">
                <span
                  className={`${styles.align_middle} ms-50`}
                  onClick={() => setSidebarOpen(false)}
                >
                  Close
                </span>
              </Button>
            </div>
          </Form>
        </div>
      </Drawer>
      <BillingAddress
        getBillingAndShippingModal={getBillingAndShippingModal}
        setBillingAndShippingModal={setBillingAndShippingModal}
        getUserId={getUserId}
        getBillingAndShippingInfo={getBillingAndShippingInfo}
        getBillingAndShippingId={getBillingAndShippingId}
        setBillingAndShippingId={setBillingAndShippingId}
        getBillingListHandler={getBillingListHandler}
        setBillingAndShippingInfo={setBillingAndShippingInfo}
      />
      <ShippingAddress
        getBillingAndShippingModal={getBillingAndShippingModal}
        setBillingAndShippingModal={setBillingAndShippingModal}
        getUserId={getUserId}
        getShippingListHandler={getShippingListHandler}
        getBillingAndShippingInfo={getBillingAndShippingInfo}
        getBillingAndShippingId={getBillingAndShippingId}
        setBillingAndShippingId={setBillingAndShippingId}
        setBillingAndShippingInfo={setBillingAndShippingInfo}
      />
    </>
  );
};

export default AddCustomerForm;
