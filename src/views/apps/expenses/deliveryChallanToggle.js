import { useState } from "react";
import styles from "./deliveryChallanToggle.module.css";
import { Button, Modal, Checkbox } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

// ** Reactstrap Imports
import { ModalBody } from "reactstrap";
import ExpenseInvoice from "./expenseInvoice";

const DeliveryChallanToggle = ({ getViewButton, setViewButton }) => {
  const onChange = (checkedValues) => {
    console.log("checked = ", checkedValues);
  };
  const plainOptions = [
    "Customer",
    "Transport",
    "Supplier",
    "Delivery Challan",
  ];

  const handleCancel = () => {
    setViewButton((prev) => ({
      ...prev,
      viewModal: false,
    }));
  };

  return (
    <>
      <Modal
        className={`${styles.delivery_modal} deilvery_modal_wrapper`}
        open={getViewButton?.viewModal}
        title="Expense View
        "
        width={800}
        zIndex={9999}
        footer={null}
        onCancel={() => handleCancel()}
      >
        <ModalBody>
          <ExpenseInvoice getViewButton={getViewButton} />
          <Button onClick={() => handleCancel()}> Cancel</Button>
        </ModalBody>
      </Modal>
    </>
  );
};
export default DeliveryChallanToggle;
