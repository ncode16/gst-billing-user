import React, { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { Drawer, message } from "antd";
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
import { addShippingAddress } from "../../api/shippingAddressManagement";
import { stateList } from "../../utility/Utils";
import { updateAddShippingAddressData } from "../../api/addCustomerManagement";
import styles from "./add-customer.module.css";

const ShippingAddress = ({
  getBillingAndShippingModal,
  setBillingAndShippingModal,
  getUserId,
  getShippingListHandler,
  getBillingAndShippingInfo,
  getBillingAndShippingId,
  setBillingAndShippingId,
  setBillingAndShippingInfo,
}) => {
  const [getShippingLoader, setShippingLoader] = useState(false);
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
      notes: "",
    });
  }, [getBillingAndShippingModal.shippingModal]);

  useEffect(() => {
    setValue("address_line_one", getBillingAndShippingInfo?.address_line_one);
    setValue("address_line_two", getBillingAndShippingInfo?.address_line_two);
    setValue("city", getBillingAndShippingInfo?.city);
    setValue("pincode", getBillingAndShippingInfo?.pincode);
    setValue("state", getBillingAndShippingInfo?.state);
    setValue("notes", getBillingAndShippingInfo?.notes);
  }, [getBillingAndShippingInfo]);

  const addShippingInfomationHandler = (shippingInformation) => {
    const modifiedShippingInfo = { ...shippingInformation, user_id: getUserId };
    const shippingResponse =
      Object.keys(getBillingAndShippingInfo)?.length === 0
        ? addShippingAddress(modifiedShippingInfo)
        : updateAddShippingAddressData(
            getBillingAndShippingId,
            modifiedShippingInfo
          );

    shippingResponse
      .then((response) => {
        setShippingLoader(true);
        if (response.status === 200) {
          setBillingAndShippingModal((prev) => ({
            ...prev,
            shippingModal: false,
          }));
          !getBillingAndShippingId
            ? message.success("Shipping address added successfully")
            : message.success("Shipping address updated successfully");
          getShippingListHandler();
          setBillingAndShippingId("");
          setBillingAndShippingInfo({});
          setShippingLoader(false);
        }
      })
      .catch((err) => {
        message.error("Something went wrong");
        setShippingLoader(false);
      });
  };

  const LoaderIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
        color: "#fff",
      }}
      spin
    />
  );

  return (
    <Drawer
      title={
        <span className={styles.add_item_heading_main_span}>
          <span className={styles.add_item_heading_span}>
            {getBillingAndShippingId
              ? "Edit Shipping Address"
              : "Add Shipping Address"}
          </span>
          <span>
            <Button
              color="primary"
              className={styles.save_update_button}
              onClick={handleSubmit(addShippingInfomationHandler)}
            >
              {getShippingLoader && <Spin indicator={LoaderIcon} />} Save and
              Update
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
      <Form className={`${styles.billing_form_container} ${styles.shipping_container}`}>
        <div className={styles.ant_drawer_body_div}>
          <div className={styles.addressline_1_div}>
            <label>Address Line 1</label>
            <input
              type="text"
              placeholder="Address Line 1 "
              className={styles.address_line_1_input}
              {...register("address_line_one")}
            />
          </div>

          <div className={styles.billing_input_field}>
            <label>Address Line 2</label>
            <input
              type="text"
              placeholder="Address Line 2"
              className={styles.address_line_1_input}
              {...register("address_line_two")}
            />
          </div>

          <div className={styles.billing_input_field}>
            <label>City</label>
            <input
              type="text"
              placeholder="City "
              className={styles.city_input}
              {...register("city")}
            />
          </div>

          <div className={styles.billing_input_field}>
            <label>State</label>
            <select
              className={styles.state_select}
              {...register("state", {
                required: "Please enter your state name",
              })}
              placeholder="Select State"
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
            <label>Pincode</label>
            <input
              type="text"
              placeholder="Pincode "
              className={styles.address_line_1_input}
              {...register("pincode", { valueAsNumber: true })}
            />
          </div>
          <div className={styles.notes_div}>
            <label>Notes</label>
            <textarea
              className={styles.shipping_note_textarea}
              {...register("notes")}
              placeholder="Add Notes,Contact Person Details etc..."
            />
          </div>
        </div>
        <div className={styles.footer}>
          <Button
            type="button"
            color="primary"
            className={styles.save_update_button}
            onClick={handleSubmit(addShippingInfomationHandler)}
          >
            {getShippingLoader && <Spin indicator={LoaderIcon} />} Save and
            Update
          </Button>
        </div>
      </Form>
    </Drawer>
  );
};

export default ShippingAddress;
