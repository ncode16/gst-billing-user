// ** React Import
import { useState } from "react";

// ** Custom Components
import Sidebar from "../../../../@core/components/sidebar";
import "./bank.css";

// ** Utils
import { selectThemeColors } from "../../../../utility/Utils";

// ** Third Party Components
// import Select from 'react-select'
import classnames from "classnames";
import { useForm, Controller } from "react-hook-form";

// ** Reactstrap Imports
import { Button, Label, FormText, Input, Row, Col } from "reactstrap";
import { Select, Collapse, Tooltip } from "antd";
import { Option } from "antd/es/mentions";

// ** Store & Actions
import { addUser } from "../../user/store";
import { useDispatch } from "react-redux";
import { Heart } from "react-feather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faInr,
  faCircleInfo,
  faArrowRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import { CaretRightOutlined } from "@ant-design/icons";
// import { addBank } from '../../../../api/bank/index'
import jwtDecode from "jwt-decode";
import { Form, InputGroup } from "react-bootstrap";

const { Panel } = Collapse;

const defaultValues = {
  account_number: 0,
  ifsc_code: "",
  bank_name: "",
  branch_name: "",
  upi: "",
  opening_balance: 0,
  upi_number: "",
  notes: "",
  user_id: 0,
};

const AddBank = ({ open, toggleBankSidebar }) => {
  // ** States
  const [data, setData] = useState(null);
  const [plan, setPlan] = useState("basic");
  const [role, setRole] = useState("subscriber");
  const [selectedOption, setSelectedOption] = useState("");

  // ** Store Vars
  const dispatch = useDispatch();

  // ** Vars
  const {
    control,
    register,
    reset,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  // ** Function to handle form submit

  const handleSidebarClosed = () => {
    for (const key in defaultValues) {
      setValue(key, "");
    }
    setRole("subscriber");
    setPlan("basic");
  };

  const isDebit = (event) => {
    setSelectedOption(event.target.value);
  };

  const onSubmit = (data) => {
    const decoded = localStorage.getItem("userDetails");
    const token = jwtDecode(decoded);
    const body = {
      account_number: Number(data.account_number),
      ifsc_code: data.ifsc_code,
      bank_name: data.bank_name,
      branch_name: data.branch_name,
      upi: data.upi,
      opening_balance: Number(data.opening_balance),
      upi_number: data.upi_number,
      notes: data.notes,
      default: data.default,
      user_id: token.user_id,
    };
    console.log("fsdfds", data);
    // addBank(body).then((res) => {
    //     console.log('add-bank', res)
    //     toggleBankSidebar()
    //     reset()
    // }).catch((error) => {
    //     console.log('fdf', error?.response?.data?.message?.vendor_name?.message)
    // })
  };

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
    <Sidebar
      size="lg"
      open={open}
      title={
        <span className="add-item-heading-main-span">
          <span className="add-item-heading-span">Bank Details</span>
          <span>
            <Button color="primary" className="save-update-button">
              Save & Update
              <FontAwesomeIcon
                icon={faArrowRight}
                style={{ marginLeft: "8px" }}
                color="primary"
              />
            </Button>
          </span>
        </span>
      }
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleBankSidebar}
      onClosed={handleSidebarClosed}
    >
      <div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="basic-details-card">
            <div className="basic-details-card-body">
              <div>
                <Label className="basic-details-label">
                  <em>*</em>Account No
                </Label>
                <InputGroup>
                  <Form.Control
                    type="number"
                    name="account_number"
                    placeholder="Bank Account No."
                    {...register("account_number")}
                  />
                </InputGroup>
              </div>
              <div className="field-down">
                <Label className="basic-details-label">
                  <em>*</em>Confirm Bank Account No
                </Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    name="account_number"
                    placeholder="Confirm Bank Account No"
                  />
                </InputGroup>
              </div>
              <div className="field-down">
                <Label className="basic-details-label">
                  <em>*</em>IFSC Code
                </Label>
                <div style={{ display: "flex" }}>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      name="ifsc_code"
                      placeholder="Bank IFSC"
                      {...register("ifsc_code")}
                    />
                  </InputGroup>
                  <span className="fetch-bank">
                    <Button color="primary" className="bank-details">
                      Fetch Bank Details
                    </Button>
                  </span>
                </div>
              </div>
              <div className="field-down">
                <Label className="basic-details-label">
                  <em>*</em>Bank Name
                </Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    name="bank_name"
                    placeholder="Bank Name"
                    {...register("bank_name")}
                  />
                </InputGroup>
              </div>
              <div className="field-down">
                <Label className="basic-details-label">
                  <em>*</em>Branch Name
                </Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    name="branch_name"
                    placeholder="Bank Branch Name"
                    {...register("branch_name")}
                  />
                </InputGroup>
              </div>
              <div className="field-down">
                <Label className="basic-details-label">
                  UPI
                  <span className="optional-badge">OPTIONAL</span>
                  <Tooltip placement="top" title={text}>
                    <FontAwesomeIcon
                      icon={faCircleInfo}
                      style={{ marginRight: "16px", marginLeft: "4px" }}
                    />
                  </Tooltip>
                </Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    name="upi"
                    placeholder="UPI ID eg.username@okicici"
                    {...register("upi")}
                  />
                </InputGroup>
              </div>
              <div className="field-down">
                <Label className="basic-details-label">
                  Opening Balance
                  <span className="optional-badge">OPTIONAL</span>
                </Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    name="opening_balance"
                    placeholder="Opening Balance (Optional)"
                    {...register("opening_balance")}
                  />
                </InputGroup>
              </div>
              <div className="field-down">
                <Label className="basic-details-label">
                  UPI Number<span className="optional-badge">OPTIONAL</span>
                </Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    name="upi_number"
                    placeholder="GPay/PhonePe Number (Optional)"
                    {...register("upi_number")}
                  />
                </InputGroup>
              </div>
              <div className="field-down">
                <Label className="basic-details-label">Notes</Label>
                <InputGroup>
                  <Form.Control
                    as="textarea"
                    type="text"
                    name="notes"
                    placeholder="Beneficiary Name, SWIFT Code etc.."
                    {...register("notes")}
                  />
                </InputGroup>
              </div>
              <div className="field-down">
                <Label className="basic-details-label">Default</Label>
                <div className="form-switch form-check-primary">
                  <Input
                    type="switch"
                    id="switch-primary"
                    name="primary"
                    {...register("default")}
                  />
                </div>
                <div className="default-bank">
                  This will override you previous default bank
                </div>
              </div>
            </div>
          </div>
          <div className="button-position">
            <Button color="primary" className="save-update-button">
              Save & Update
              <FontAwesomeIcon
                icon={faArrowRight}
                style={{ marginLeft: "8px" }}
              />
            </Button>
          </div>
        </Form>
      </div>
    </Sidebar>
  );
};

export default AddBank;
