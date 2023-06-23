import { useState } from "react";
import Sidebar from "../../../@core/components/sidebar";
import { useForm, Controller } from "react-hook-form";
import { InputGroup, Form, Button, Col, Row } from "react-bootstrap";
import { Input, Label } from "reactstrap";
import { Plus } from "react-feather";
import "../sales/customer/add-customer.css";
import { countryList } from "../../../utility/Utils";
import BillingAddress from "./billingAddress";
import ShippingAddress from "./shippingAddress";
import { Drawer, Switch, Collapse } from "antd";
import { faInr } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { selectThemeColors } from "../../../utility/Utils";
import { ReactMultiEmail, isEmail } from "react-multi-email";
import Select from "react-select";

const { Panel } = Collapse;

const AddCustomerForm = ({ open, toggleSidebar }) => {
  const [getBillingAndShippingModal, setBillingAndShippingModal] = useState({
    billingModal: false,
    shippingModal: false,
  });
  const defaultValues = {
    email: "",
    contact: "",
    company: "",
    fullName: "",
    username: "",
    country: null,
  };
  const {
    control,
    setValue,
    setError,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ defaultValues });

  return (
    <>
      <Drawer
        title={
          <span className="add-item-heading-main-span billing_form_wrapper">
            <span className="add-item-heading-span">Add Customer</span>
            <span>
              <Button color="primary" className="save-update-button">
                Save Customer
              </Button>
            </span>
          </span>
        }
        width={"54%"}
        closable={true}
        onClose={() => toggleSidebar()}
        open={open}
      >
        <div>
          <Form>
            <div className="document-setting-text add_customer_form">
              <div className="add-custom-text-box">
                <div className="additional-text">Basic Details</div>
                <div className="add-custom-fields"></div>
              </div>
              <div className="card card-box">
                <div className="document-prefixes">
                  <Row className="first-prefix-row">
                    <Col sm="12">
                      <Form.Label htmlFor="inputPassword5">
                        <em>*</em> Name
                      </Form.Label>
                      <InputGroup size="sm" className="mb-1">
                        <Form.Control
                          className="name-input"
                          aria-label="Small"
                          aria-describedby="inputGroup-sizing-sm"
                          name="customer_name"
                          placeholder="Aditya"
                          {...register("customer_name", {
                            required: "Please enter your name",
                          })}
                        />
                        {errors.customer_name && (
                          <p className="error_message">
                            {errors?.customer_name?.message}
                          </p>
                        )}
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="first-prefix-row">
                    <Col md="12" lg="6" className="phone-col">
                      <Form.Label htmlFor="inputPassword5">Phone</Form.Label>
                      <div className="customer-phone">
                        <Row>
                          <Col md="12" lg="6" className="mb-2">
                            <Form.Select
                              size="sm"
                              id="sel1"
                              className="react-select"
                              name="customer_country_code"
                              {...register("customer_country_code")}
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
                          </Col>
                          <Col md="12" lg="6" className="mb-2">
                            <InputGroup size="sm">
                              <Form.Control
                                className="mobile-input"
                                aria-label="Small"
                                aria-describedby="inputGroup-sizing-sm"
                                name="customer_phone"
                                placeholder="Enter Mobile Number"
                                {...register("customer_phone")}
                              />
                            </InputGroup>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                    <Col md="12" lg="6">
                      <Form.Group
                        className="mb-1"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="gmail@gmail.com"
                          className="email"
                          name="customer_email"
                          {...register("customer_email", {
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Please enter valid email address",
                            },
                          })}
                        />
                        {errors.customer_email && (
                          <p className="error_message">
                            {errors.customer_email?.message}
                          </p>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
            <div className="document-setting-text">
              <div className="additional-text">Company Details (Optional)</div>
              <div className="card card-box">
                <div className="additional-form">
                  <Row className="first-prefix-row">
                    <Col md="12">
                      <Form.Label htmlFor="inputPassword5">GSTIN</Form.Label>
                      <div className="fetch-details">
                        <InputGroup className="mb-1">
                          <Form.Control
                            placeholder="27AADCB2230M1ZT"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            {...register("customer_gstin")}
                          />
                          <Button
                            type="button"
                            id="button-addon2"
                            className="gstin-input"
                          >
                            Fetch Details
                          </Button>
                        </InputGroup>
                      </div>
                    </Col>
                  </Row>
                  <Row className="first-prefix-row">
                    <Col md="12">
                      <Form.Label htmlFor="inputPassword5">
                        Company Name
                      </Form.Label>
                      <InputGroup size="sm" className="mb-1">
                        <Form.Control
                          placeholder="ABC Technologies Private Limited"
                          className="company-name-input"
                          aria-label="Small"
                          aria-describedby="inputGroup-sizing-sm"
                          {...register("customer_company")}
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
            <div className="billing-address-section">
              <div>
                <div className="billing-listing-heading">Billing Address</div>
                <div className="billing-listing-div"></div>
              </div>
              <div className="billing-address">
                <button
                  type="button"
                  className="billing-btn"
                  onClick={() =>
                    setBillingAndShippingModal((prev) => ({
                      ...prev,
                      billingModal: true,
                    }))
                  }
                >
                  <span className="plus-icon">
                    <Plus />
                  </span>
                  Billing Address
                </button>
              </div>
              <div>
                <div className="billing-listing-heading">Shipping Address</div>
                <div className="billing-address">
                  <button
                    type="button"
                    className="billing-btn shipping"
                    onClick={() =>
                      setBillingAndShippingModal((prev) => ({
                        ...prev,
                        shippingModal: true,
                      }))
                    }
                  >
                    <span className="plus-icon">
                      <Plus />
                    </span>
                    Shipping Address
                  </button>
                </div>
              </div>
            </div>
            <div className="document-setting-text export-invoice">
              <div className="additional-text">Optional Details</div>

              <div className="card card-box">
                <div className="additional-form">
                  <div className="opening-radio">
                    <label className="mb-2">Opening Balance</label>
                    <div className="mb-2" style={{ display: "flex" }}>
                      <div className="form-check">
                        <Input
                          type="radio"
                          id="ex1-active"
                          name="ex1"
                          value="debit"
                          // onChange={isDebit}
                          defaultChecked
                        />
                        <Label className="form-check-label" for="ex1-active">
                          Debit
                        </Label>
                      </div>
                      <div
                        className="form-check"
                        style={{ paddingLeft: "40px" }}
                      >
                        <Input
                          type="radio"
                          name="ex1"
                          id="ex1-inactive"
                          value="credit"
                          // onChange={isDebit}
                        />
                        <Label className="form-check-label" for="ex1-inactive">
                          Credit
                        </Label>
                      </div>
                    </div>
                    <div style={{ width: "100%" }} className="mb-2">
                      <span className="debit-span">
                        <InputGroup>
                          <Form.Control
                            type="number"
                            name="customer_debit_amount"
                            placeholder="Enter Debit Amount"
                            className="debit-amount"
                            {...register("customer_debit_amount")}
                          />
                        </InputGroup>
                        <div className="debit-div">
                          <Label className="vendor-debit-label">
                            Customer pays you
                            <FontAwesomeIcon
                              icon={faInr}
                              style={{
                                marginLeft: "4px",
                                marginRight: "4px",
                              }}
                            />
                          </Label>
                        </div>
                      </span>
                    </div>

                    {/* {selectedOption === "debit" ? (
                      <div style={{ marginTop: "25px", width: "100%" }}>
                        <span className="debit-span">
                          <InputGroup>
                            <Form.Control
                              type="number"
                              name="customer_debit_amount"
                              placeholder="Enter Debit Amount"
                              className="debit-amount"
                              {...register("customer_debit_amount")}
                            />
                          </InputGroup>
                          <div className="debit-div">
                            <Label className="vendor-debit-label">
                              Customer pays you
                              <FontAwesomeIcon
                                icon={faInr}
                                style={{
                                  marginLeft: "4px",
                                  marginRight: "4px",
                                }}
                              />
                            </Label>
                          </div>
                        </span>
                      </div>
                    ) : (
                      <div style={{ marginTop: "25px", width: "100%" }}>
                        <span className="debit-span">
                          <InputGroup>
                            <Form.Control
                              type="number"
                              name="customer_credit_amount"
                              placeholder="Enter Credit Amount"
                              className="debit-amount"
                              {...register("customer_credit_amount")}
                            />
                          </InputGroup>
                          <div className="debit-div">
                            <Label className="vendor-credit-label">
                              You pay the Customer{" "}
                              <FontAwesomeIcon
                                icon={faInr}
                                style={{
                                  marginLeft: "4px",
                                  marginRight: "4px",
                                }}
                              />
                            </Label>
                          </div>
                        </span>
                      </div>
                    )} */}
                  </div>
                  <div className="opening-radio radio-div mb-2">
                    <Form.Label htmlFor="inputPassword5">Balance</Form.Label>
                    <InputGroup>
                      <Form.Control
                        disabled
                        type="number"
                        name="vendor_debit_amount"
                        placeholder="0"
                        className="balance-input"
                        {...register("balance")}
                        value={0}
                      />
                    </InputGroup>
                  </div>
                  <Col md="6" className="mb-2">
                    <Form.Label htmlFor="inputPassword5">TDS</Form.Label>
                    <div className="form-switch form-check-primary">
                      <Switch
                        className="tds-switch-btn"
                        id="switch-primary"
                        name="tds"
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                      />
                    </div>
                  </Col>
                  <div className="tds-switch-sub-div">
                    <Form.Label htmlFor="inputPassword5">
                      TDS Percentage
                    </Form.Label>
                    <Form.Select
                      size="sm"
                      className="tds-percent-select"
                      {...register("tds_percentage")}
                    >
                      <option>Small select</option>
                      <option>Small sele</option>
                      <option>Small se</option>
                    </Form.Select>
                  </div>
                </div>
              </div>

              {/* <div className="more-details-section">
                <Collapse>
                  <Panel
                    header={
                      <div className="tags-text">
                        <span>More Details?</span>
                        <p>Add Notes, Tags, Discount, CC Emails</p>
                      </div>
                    }
                    key="1"
                  >
                    <div className="discount-section">
                      <div className="discount-fild">
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Discount(%)</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="name@example.com"
                            {...register("dicount")}
                          />
                        </Form.Group>
                      </div>
                      <div className="discount-fild">
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlTextarea1"
                        >
                          <Form.Label>Notes</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            {...register("notes")}
                          />
                        </Form.Group>
                      </div>
                      <div className="discount-fild">
                        <Form.Label htmlFor="inputPassword5">Tags</Form.Label>
                        <Select
                          isClearable={false}
                          theme={selectThemeColors}
                          isMulti
                          name="colors"
                          options={[]}
                          className="react-select"
                          classNamePrefix="select"
                          {...register("tags")}
                        />
                      </div>
                      <div className="discount-fild">
                        <Form.Label>
                          CC Emails<em className="new-text">NEW</em>
                        </Form.Label>
                        <ReactMultiEmail
                          placeholder="Input your email"
                          {...register(" customer_cc_emails")}
                          autoFocus={true}
                          getLabel={(email, index, removeEmail) => {
                            return (
                              <div data-tag key={index}>
                                <div data-tag-item>{email}</div>
                                <span data-tag-handle>×</span>
                              </div>
                            );
                          }}
                        />
                      </div>
                    </div>
                  </Panel>
                </Collapse>
              </div> */}
            </div>
          </Form>
        </div>
      </Drawer>
      <BillingAddress
        getBillingAndShippingModal={getBillingAndShippingModal}
        setBillingAndShippingModal={setBillingAndShippingModal}
      />
      <ShippingAddress
        getBillingAndShippingModal={getBillingAndShippingModal}
        setBillingAndShippingModal={setBillingAndShippingModal}
      />
    </>
  );
};

export default AddCustomerForm;
