import { Drawer, message } from "antd";
import { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
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
import {
  addBillingAddress,
  updateAddBillingAddressData,
} from "../../api/billingAddressManagement";
import { stateList } from "../../utility/Utils";
import styles from "./add-customer.module.css";

const BillingAddress = ({
  getBillingAndShippingModal,
  setBillingAndShippingModal,
  getUserId,
  getBillingAndShippingInfo,
  getBillingAndShippingId,
  setBillingAndShippingId,
  getBillingListHandler,
  setBillingAndShippingInfo,
}) => {
  const [getBankLoader, setBankLoader] = useState(false);

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset({
      address_line_one: "",
      address_line_two: "",
      city: "",
      state: "",
      pincode: "",
    });
  }, [getBillingAndShippingModal.billingModal]);

  useEffect(() => {
    setValue("address_line_one", getBillingAndShippingInfo?.address_line_one);
    setValue("address_line_two", getBillingAndShippingInfo?.address_line_two);
    setValue("city", getBillingAndShippingInfo?.city);
    setValue("pincode", getBillingAndShippingInfo?.pincode);
    setValue("state", getBillingAndShippingInfo?.state);
  }, [getBillingAndShippingInfo]);

  const LoaderIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
        color: "#fff",
      }}
      spin
    />
  );

  const addBillingDetailsHandler = (billingInfo) => {
    const modifiedBillingInfo = { ...billingInfo, user_id: getUserId };
    const billingResonse =
      Object.keys(getBillingAndShippingInfo)?.length === 0
        ? addBillingAddress(modifiedBillingInfo)
        : updateAddBillingAddressData(
          getBillingAndShippingId,
          modifiedBillingInfo
        );
    billingResonse
      .then((response) => {
        setBankLoader(true);
        if (response.status === 200) {
          setBillingAndShippingModal((prev) => ({
            ...prev,
            billingModal: false,
          }));
          !getBillingAndShippingId
            ? message.success("Billing address added successfully")
            : message.success("Billing address updated successfully");
          getBillingListHandler();
          setBillingAndShippingId("");
          setBillingAndShippingInfo({});
          setBankLoader(false);
        }
      })
      .catch((err) => {
        message.error("Something went wrong");
        setBankLoader(false);
      });
  };

  return (
    <Drawer
      title={
        <span className={styles.add_item_heading_main_span}>
          <span className={styles.add_item_heading_span}>
            {getBillingAndShippingId
              ? "Edit Billing Address"
              : "Add Billing Address"}
          </span>
          <span>
            <Button
              color="primary"
              className={styles.save_update_button}
              onClick={handleSubmit(addBillingDetailsHandler)}
            >
              {getBankLoader && <Spin indicator={LoaderIcon} />} Save and Update
            </Button>
          </span>
        </span>
      }
      width={"50%"}
      closable={true}
      onClose={() =>
        setBillingAndShippingModal((prev) => ({
          ...prev,
          billingModal: false,
        }))
      }
      open={getBillingAndShippingModal?.billingModal}
    >
      <Form>
        <div
          className={`${styles.ant_drawer_body_div} ${styles.billing_form_container}`}
        >
          <div className={styles.addressline_1_div}>
            <label>Address line 1</label>
            <input
              type="text"
              placeholder="Address line 1 "
              className={styles.address_line_1_input}
              {...register("address_line_one")}
            />
          </div>

          <div className={styles.billing_input_field}>
            <label>Address line 2</label>
            <input
              type="text"
              placeholder="Address line 2 "
              className={styles.address_line_1_input}
              {...register("address_line_two")}
            />
          </div>

          <div className={styles.billing_input_field}>
            <label>City</label>
            <input
              type="text"
              placeholder="City"
              className={styles.city_input}
              {...register("city")}
            />
          </div>

          <div className={styles.billing_input_field}>
            <label>State</label>
            <select
              placeholder="Select State"
              type="text"
              className={`${styles.state_select} ${styles.city_input}`}
              {...register("state", {
                required: "Please enter your state name",
              })}
            >
              {stateList?.map((state) => {
                return (
                  <option
                    value={state}
                    hidden={state === "" ? true : false}
                    selected={
                      getBillingAndShippingInfo?.state
                        ? getBillingAndShippingInfo?.state
                        : ""
                    }
                  >
                    {state === "" ? "Please select state" : state}
                  </option>
                );
              })}
            </select>
            {errors.state && (
              <p className={styles.error_message}>{errors?.state?.message}</p>
            )}
            <small className={styles.address_small}>
              Billing State (like 36-Telangana) is responsible for deciding CGST
              + SGST or IGST calculation on the invoice. Please ignore this, if
              you do not have GST.
            </small>
          </div>

          <div className={styles.pincode_div}>
            <label>Pin Code</label>
            <input
              type="number"
              placeholder="Pincode"
              className={styles.address_line_1_input}
              {...register("pincode", { valueAsNumber: true })}
            />
          </div>
        </div>
        <div className={styles.footer}>
          <Button
            color="primary"
            type="button"
            className={styles.save_update_button}
            onClick={handleSubmit(addBillingDetailsHandler)}
          >
            {getBankLoader && <Spin indicator={LoaderIcon} />} Save and Update
          </Button>
        </div>
      </Form>
    </Drawer>
  );
};

export default BillingAddress;
