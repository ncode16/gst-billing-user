// ** React Import
import { useState, useEffect } from "react";

// ** Custom Components
import { addUpdatedSetting } from "../../api/settingManagement/index";
// import "./settings.css";
// import "../media.css";
import "./document-setting.css";
// react coloful imports
import { HexColorPicker } from "react-colorful";
// antd imports
import { Spin, Select, Drawer } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

// ** Utils
import { selectThemeColors } from "../../utility/Utils";

// ** Third Party Components
// import TabsBasic from "..";

import { useForm, Controller } from "react-hook-form";

// ** Reactstrap Imports
import { Button, Label, Input, Row, Col } from "reactstrap";
import { Form, InputGroup } from "react-bootstrap";

// ** Store & Actions
import { Heart } from "react-feather";
import { Option } from "antd/es/mentions";

const DocumentSettingForm = ({
  open,
  setSettingModal,
  getSettingData,
  getDocumentId,
  getSetting,
}) => {
  // ** States
  const [data, setData] = useState(null);
  const [plan, setPlan] = useState("basic");
  const [role, setRole] = useState("subscriber");
  const [color, setColor] = useState("#aabbcc");
  const [loading, setLoading] = useState(false);

  // ** Vars
  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (getSettingData && Object.keys(getSettingData)?.length > 0) {
      setValue("document_id", getSettingData?.document_id);
      setValue("invoice_prefix", getSettingData?.invoice_prefix);
      setValue("purchase_order_prefix", getSettingData?.purchase_order_prefix);
      setValue(
        "purchase_invoice_prefix",
        getSettingData?.purchase_invoice_prefix
      );
      setValue("quotation_prefix", getSettingData?.quotation_prefix);
      setValue("sales_return_prefix", getSettingData?.sales_return_prefix);
      setValue(
        "purchase_return_prefix",
        getSettingData?.purchase_return_prefix
      );
      setValue(
        "delivery_challan_prefix",
        getSettingData?.delivery_challan_prefix
      );
      setValue(
        "pro_forma_invoice_prefix",
        getSettingData?.pro_forma_invoice_prefix
      );
      setValue("subscription_prefix", getSettingData?.subscription_prefix);
      setValue("show_images", getSettingData?.show_images);
      setValue("show_netbalance", getSettingData?.show_netbalance);
      setValue("show_payments", getSettingData?.show_payments);
      setValue("show_round_off", getSettingData?.show_round_off);
      setValue(
        "show_transaction_sorted_by",
        getSettingData?.show_transaction_sorted_by
      );
      setValue("pdf_language", getSettingData?.pdf_language);
      setValue("negative_quantity", getSettingData?.negative_quantity);
      setValue("document_color", getSettingData?.document_color);
      setValue("show_due_date", getSettingData?.show_due_date);
      setValue(
        "show_conversion_factor",
        getSettingData?.show_conversion_factor
      );
      setValue("show_inr", getSettingData?.show_inr);
    }
  }, [getSettingData]);

  const updateSetting = (settingInfo) => {
    const updateSettingInfo = { ...settingInfo };
    console.log(updateSettingInfo, "gggdfgdfgdfgdfgdfg");
    addUpdatedSetting(getDocumentId, updateSettingInfo).then((response) => {
      console.log(response, "response");
      setSettingModal(false);
      getSetting();
    });
  };

  return (
    <Drawer
      size="lg"
      open={open}
      title={
        <span className="save-setting-heading-main-span">
          <span className="save-setting-heading-span">Document Settings</span>
          <span>
            <Button color="primary" className="save-update-setting-button">
              {loading && (
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{ fontSize: 24, color: "white" }}
                      spin
                    />
                  }
                />
              )}
              Save & Update
            </Button>
          </span>
        </span>
      }
      headerClassName="mb-1"
      contentClassName="pt-0"
      width={"54%"}
      onClose={() => setSettingModal(false)}
    >
      <button type="button" className="invoice-template-button">
        <span className="heart">
          <Heart />
        </span>
        Invoice Templates
      </button>
      <Form>
        <div className="additional-text">Document prefixes</div>
        <div className="card card-box">
          <Row className="first-prefix-row">
            <Col md="6">
              <Label className="label-text">Invoice Prefix</Label>

              <InputGroup>
                <Form.Control
                  type="text"
                  name="invoice_prefix"
                  className="invoice_prefix"
                  placeholder="INV-"
                  // value="INV -"
                  {...register("invoice_prefix")}
                />
              </InputGroup>
              {/* <Input
                type="text"
                className="invoice_prefix"
                placeholder="INV-"
                value="INV -"
              /> */}
              <div className="example-prefix">
                <small className="small-text">
                  Example INV/22-23/, JIO/, AMZN- or you can leave it blank
                  also.
                </small>
              </div>
            </Col>
            <Col md="6">
              <Label className="label-text">Purchase Order Prefix</Label>

              <InputGroup>
                <Form.Control
                  name="purchase_order_prefix"
                  type="text"
                  className="purchase_order_prefix"
                  placeholder="PO-"
                  // value="PO -"
                  {...register("purchase_order_prefix")}
                />
              </InputGroup>
              {/* <Input
                type="text"
                className="purchase_order_prefix"
                placeholder="PO-"
                value="PO -"
              /> */}
            </Col>
          </Row>
          <Row className="first-prefix-row">
            <Col md="6">
              <Label className="label-text">Purchase Invoice Prefix</Label>

              <InputGroup>
                <Form.Control
                  name="purchase_invoice_prefix"
                  type="text"
                  className="purchase_invoice_prefix"
                  placeholder="PINV-"
                  // value="PINV -"
                  {...register("purchase_invoice_prefix")}
                />
              </InputGroup>
              {/* <Input
                type="text"
                className="purchase_invoice_prefix"
                placeholder="PINV-"
                value="PINV -"
              /> */}
            </Col>
            <Col md="6">
              <Label className="label-text">Quotation Prefix</Label>
              <InputGroup>
                <Form.Control
                  name="quotation_prefix"
                  type="text"
                  className="quotation_prefix"
                  placeholder="EST-"
                  // value="EST -"
                  {...register("quotation_prefix")}
                />
              </InputGroup>
              {/* <Input
                type="text"
                className="quotation_prefix"
                placeholder="EST-"
                value="EST -"
              /> */}
            </Col>
          </Row>
          <Row className="first-prefix-row">
            <Col md="6">
              <Label className="label-text">Sales Return Prefix</Label>

              <InputGroup>
                <Form.Control
                  name="sales_return_prefix"
                  type="text"
                  className="sales_return_prefix"
                  placeholder="SRTN-"
                  // value="SRTN -"
                  {...register("sales_return_prefix")}
                />
              </InputGroup>
              {/* <Input
                type="text"
                className="sales_return_prefix"
                placeholder="SRTN-"
                value="SRTN -"
              /> */}
            </Col>
            <Col md="6">
              <Label className="label-text">Purchase Return Prefix</Label>
              <InputGroup>
                <Form.Control
                  name="purchase_return_prefix"
                  type="text"
                  className="purchase_return_prefix"
                  placeholder="PRTN-"
                  // value="PRTN -"
                  {...register("purchase_return_prefix")}
                />
              </InputGroup>
              {/* <Input
                type="text"
                className="purchase_return_prefix"
                placeholder="PRTN-"
                value="PRTN -"
              /> */}
            </Col>
          </Row>
          <Row className="first-prefix-row">
            <Col md="6">
              <Label className="label-text">Delivery Challan Prefix</Label>
              <InputGroup>
                <Form.Control
                  name="delivery_challan_prefix"
                  type="text"
                  className="delivery_challan_prefix"
                  placeholder="DC-"
                  // value="DC -"
                  {...register("delivery_challan_prefix")}
                />
              </InputGroup>
              {/* <Input
                type="text"
                className="delivery_challan_prefix"
                placeholder="DC-"
                value="DC -"
              /> */}
            </Col>
            <Col md="6">
              <Label className="label-text">Pro Forma Invoice Prefix</Label>
              <InputGroup>
                <Form.Control
                  name="pro_forma_invoice_prefix"
                  type="text"
                  className="pro_forma_invoice_prefix"
                  placeholder="PFI-"
                  // value="PFI -"
                  {...register("pro_forma_invoice_prefix")}
                />
              </InputGroup>
              {/* <Input
                type="text"
                className="pro_forma_invoice_prefix"
                placeholder="PFI-"
                value="PFI -"
              /> */}
            </Col>
          </Row>
          <Row className="first-prefix-row">
            <Col md="6">
              <Label className="label-text">Subscription Prefix</Label>
              <InputGroup>
                <Form.Control
                  name="subscription_prefix"
                  type="text"
                  className="subscription_prefix"
                  placeholder="SUB-"
                  // value="SUB -"
                  {...register("subscription_prefix")}
                />
              </InputGroup>
              {/* <Input
                type="text"
                className="subscription_prefix"
                placeholder="SUB-"
                value="SUB -"
              /> */}
            </Col>
          </Row>
        </div>
        <div className="additional-text-second">Additional Customizations</div>
        <div className="card card-box">
          <Row className="first-prefix-row">
            <Col md="6">
              <Label className="label-text">Show Images</Label>
              <div className="form-switch form-check-primary">
                <Form.Check
                  className="document-setting-switch"
                  type="switch"
                  id="custom-switch"
                  label=""
                  name="show_images"
                  {...register("show_images")}
                />
              </div>
              <div className="extra-information-setting">
                <small className="small-text">
                  This will show images on all documents, provided images are
                  uploaded for the product. Upto 5 images only.
                </small>
              </div>
            </Col>
            <Col md="6">
              <Label className="label-text">Show Net Balance</Label>
              <div className="form-switch form-check-primary">
                <Form.Check
                  className="document-setting-switch"
                  type="switch"
                  id="custom-switch"
                  label=""
                  name="show_netbalance"
                  {...register("show_netbalance")}
                />
              </div>
              <div className="extra-information-setting">
                <small className="small-text">
                  Only receivable balance (i.e customer is in Debit and you have
                  to collect the payment) will be shown on the invoices.
                </small>
              </div>
            </Col>
          </Row>
          <Row className="first-prefix-row">
            <Col md="6">
              <Label className="label-text">Show Due Date</Label>
              <div className="form-switch form-check-primary">
                <Form.Check
                  className="document-setting-switch"
                  type="switch"
                  id="custom-switch"
                  label=""
                  name="show_due_date"
                  {...register("show_due_date")}
                />
              </div>
              <div className="extra-information-setting">
                <small className="small-text">
                  To show due date in invoice documents.
                </small>
              </div>
            </Col>
            <Col md="6">
              <Label className="label-text">Show Payments</Label>
              <div className="form-switch form-check-primary">
                <Form.Check
                  className="document-setting-switch"
                  type="switch"
                  id="custom-switch"
                  label=""
                  name="show_payments"
                  {...register("show_payments")}
                />
              </div>
              <div className="extra-information-setting">
                <small className="small-text">
                  Payment mode and date will be shown on the invoices if
                  payments are recorded.
                </small>
              </div>
            </Col>
          </Row>
          <Row className="first-prefix-row">
            <Col md="6">
              <Label className="label-text">Allow Negative Quantity</Label>
              <div className="form-switch form-check-primary">
                <Form.Check
                  className="document-setting-switch"
                  type="switch"
                  id="custom-switch"
                  label=""
                  name="negative_quantity"
                  {...register("negative_quantity")}
                />
              </div>
              <div className="extra-information-setting">
                <small className="small-text">
                  If this is enabled, you can create bills with quantity less
                  than 0.
                </small>
              </div>
            </Col>
            <Col md="6">
              <Label className="label-text">Show Round Off</Label>
              <div className="form-switch form-check-primary">
                <Form.Check
                  className="document-setting-switch"
                  type="switch"
                  id="custom-switch"
                  label=""
                  name="show_round_off"
                  {...register("show_round_off")}
                />
              </div>
              <div className="extra-information-setting">
                <small className="small-text">
                  Round off amount will be shown in the invoices if this is
                  enabled.
                </small>
              </div>
            </Col>
          </Row>
          <Row className="first-prefix-row">
            <Col md="6">
              <Label className="label-text">Show Transactions sorted by</Label>
              <Select
                theme={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                isClearable={false}
                {...register("show_transaction_sorted_by")}
              >
                <Option value="Created Date">Created Date</Option>
                <Option value="Document Date">Document Date</Option>
              </Select>
            </Col>
            <Col md="6">
              <Label className="label-text">Document Color</Label>

              <InputGroup>
                <Form.Control
                  type="text"
                  name="document_color"
                  value={color}
                  style={{ color: color }}
                  {...register("document_color")}
                />
              </InputGroup>
              {/* <Input
                type="text"
                name="document_color"
                value={color}
                style={{ color: color }}
                {...register('')}
              /> */}
              <HexColorPicker
                className="react-hex-color-picker"
                color={color}
                onChange={setColor}
              />
            </Col>
          </Row>
          <Row className="first-prefix-row">
            <Col md="6">
              <Label className="label-text">Select Language in PDF</Label>
              <Select
                theme={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                isClearable={false}
                {...register("pdf_language")}
              >
                <Option value="English">English</Option>
                <Option value="Hindi(हिंदी)">Hindi(हिंदी)</Option>
                <Option value="Telugu(తెలుగు)">Telugu(తెలుగు)</Option>
                <Option value="Tamil(தமிழ்)">Tamil(தமிழ்)</Option>
                <Option value="Bengali(বাংলা)">Bengali(বাংলা)</Option>
                <Option value="Kannada(ಕನ್ನಡ)">Kannada(ಕನ್ನಡ)</Option>
                <Option value="Malayalam(മലയാളം)">Malayalam(മലയാളം)</Option>
                <Option value="Gujarati(ગુજરાતી)">Gujarati(ગુજરાતી)</Option>
                <Option value="Odia(ଓଡିଆ)">Odia(ଓଡିଆ)</Option>
              </Select>
            </Col>
          </Row>
        </div>
        <div className="additional-text">Export Invoice Settings</div>
        <div className="card card-box export_invoice_setting">
          <Row className="first-prefix-row">
            <Col md="6">
              <Label className="label-text">Show Conversion Factor</Label>
              <div className="form-switch form-check-primary">
                <Form.Check
                  className="document-setting-switch"
                  type="switch"
                  id="custom-switch"
                  label=""
                  name="show_conversion_factor"
                  {...register("show_conversion_factor")}
                />
              </div>
              <div className="extra-information-setting">
                <small className="small-text">
                  Conversion rate will be shown in the invoices if this is
                  enabled.
                </small>
              </div>
            </Col>
            <Col md="6">
              <Label className="label-text">Show in INR</Label>
              <div className="form-switch form-check-primary">
                <Form.Check
                  className="document-setting-switch"
                  type="switch"
                  id="custom-switch"
                  label=""
                  name="show_inr"
                  {...register("show_inr")}
                />
              </div>
              <div className="extra-information-setting">
                <small className="small-text">
                  Currency will be shown in INR for export invoices if this is
                  enabled.
                </small>
              </div>
            </Col>
          </Row>
        </div>
        <div className="button-position-setting">
          <Button
            type="button"
            onClick={handleSubmit(updateSetting)}
            className="update-setting-btn"
            color="primary"
          >
            Update Settings
          </Button>
          <Button type="button" className="close-btn">
            Close
          </Button>
        </div>
      </Form>
      {/* <TabsBasic /> */}
    </Drawer>
  );
};

export default DocumentSettingForm;
