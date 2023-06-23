import { Drawer } from "antd";
import {
  Button,
  Label,
  FormText,
  Row,
  Col,
  Input,
  Form,
} from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";

const ShippingAddress = ({
  getBillingAndShippingModal,
  setBillingAndShippingModal,
}) => {
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <Drawer
      title={
        <span className="add-item-heading-main-span billing_form_wrapper">
          <span className="add-item-heading-span">Add Shipping Address</span>
          <span>
            <Button color="primary" className="save-update-button">
              Save and Update
            </Button>
          </span>
        </span>
      }
      width={"50%"}
      closable={true}
      onClose={() =>
        setBillingAndShippingModal((prev) => ({
          ...prev,
          shippingModal: false,
        }))
      }
      open={getBillingAndShippingModal?.shippingModal}
    >
      <Form className="billing_form_container">
        <div className="ant-drawer-body-div">
          <div className="addressline-1-div">
            <label>Address Line 1</label>
            <input
              type="text"
              placeholder="Address Line 1 "
              className="address-line-1-input"
              {...register("address_line_one")}
            />
          </div>

          <div className="addressline-2-div">
            <label>Address Line 2</label>
            <input
              type="text"
              placeholder="Address Line 2"
              className="address-line-2-input"
              {...register("address_line_two")}
            />
          </div>

          <div className="city-div">
            <label>City</label>
            <input
              type="text"
              placeholder="City "
              className="city-input"
              {...register("city")}
            />
          </div>

          <div className="state-div">
            <label>State</label>
            <select
              className="state-select"
              {...register("state")}
              placeholder="Select State"
            >
              <option value="" selected hidden>
                Please Select State
              </option>
              <option value="01-JAMMUANDKASHMIR">01-JAMMUANDKASHMIR</option>
              <option value="02-HIMACHALPRADESH">02-HIMACHALPRADESH</option>
              <option value="03-PANJAB">03-PANJAB</option>
              <option value="04-CHANDIGARDH">04-CHANDIGARDH</option>
              <option value="05-UTTARAKHAND">05-UTTARAKHAND</option>
              <option value="06-HARYANA">06-HARYANA</option>
              <option value="07-DELHI">07-DELHI</option>
              <option value="08-RAJASTHAN">08-RAJASTHAN</option>
              <option value="09-UTTARPRADESH">09-UTTARPRADESH</option>
              <option value="10-BIHAR">10-BIHAR</option>
              <option value="11-SIKKIM">11-SIKKIM</option>
              <option value="12-ARUNACHALPRADESH">12-ARUNACHALPRADESH</option>
              <option value="13-NAGALAND">13-NAGALAND</option>
              <option value="14-MANIPUR">14-MANIPUR</option>
              <option value="15-MIZORAM">15-MIZORAM</option>
              <option value="16-TRIPURA">16-TRIPURA</option>
              <option value="17-MEGHALAYA">17-MEGHALAYA</option>
              <option value="18-ASSAM">18-ASSAM</option>
              <option value="19-WESTBENGA">19-WESTBENGAL</option>
              <option value="20-JHARKHAND">20-JHARKHAND</option>
              <option value="21-ODISHA">21-ODISHA</option>
              <option value="22-CHATTISGARH">22-CHATTISGARH</option>
              <option value="23-MADHYAPRADSH">23-MADHYAPRADSH</option>
              <option value="24-GUJARAT">24-GUJARAT</option>
              <option value="26-DADARAANDNAGARHAVELIANDDAMANANDDIU-NEWMERGEDUT">
                26-DADARAANDNAGARHAVELIANDDAMANANDDIU-NEWMERGEDUT
              </option>
              <option value="27-MAHARASHTRA">27-MAHARASHTRA</option>
              <option value="28-ANDHRAPRADESH(BEFOREADDED)">
                28-ANDHRAPRADESH(BEFOREADDED)
              </option>
              <option value="29-KARNATAKA">29-KARNATAKA</option>
              <option value="30-GOA">30-GOA</option>
              <option value="31-LAKSHWADEEP">31-LAKSHWADEEP</option>
              <option value="32-KERALA">32-KERALA</option>
              <option value="33-TAMILNADU">33-TAMILNADU</option>
              <option value="34-PUDUCHERRY">34-PUDUCHERRY</option>
              <option value="35-ANDAMANANDNICOBARISLANDS">
                35-ANDAMANANDNICOBARISLANDS
              </option>
              <option value="36-TELANGANA">36-TELANGANA</option>
              <option value="37-ANDHRAPRADESH">37-ANDHRAPRADESH</option>
              <option value="38-LADAKH(NEWLYADDED)">
                38-LADAKH(NEWLYADDED)
              </option>
              <option value="97-OTHERTERRYTORY">97-OTHERTERRYTORY</option>
            </select>

            <small className="address-small">
              Billing State (like 36-Telangana) is responsible for deciding CGST
              + SGST or IGST calculation on the invoice. Please ignore this, if
              you do not have GST.
            </small>
          </div>

          <div className="pincode-div">
            <label>Pincode</label>
            <input
              type="text"
              placeholder="Pincode "
              className="pincode-input"
              {...register("pincode", { valueAsNumber: true })}
            />
          </div>
          <div className="notes-div">
            <label className="notes-label">Notes</label>
            <textarea
              className="shipping-note-textarea"
              {...register("notes")}
              placeholder="Add Notes,Contact Person Details etc..."
            />
          </div>
        </div>
        <div className="footer">
          <Button
            type="button"
            color="primary"
            className="save-update-btn"
            // onClick={handleSubmit(onSubmit2)}
          >
            Save and Update
          </Button>
        </div>
      </Form>
    </Drawer>
  );
};

export default ShippingAddress;
