import React, { useState } from "react";
import { Button, Modal, message } from "antd";
import styles from "./delete.module.css";
import {
  faCirclePlus,
  faBarcode,
  faBuildingColumns,
  faPencil,
  faArrowRight,
  faPlus,
  faXmark,
  faInr,
  faIndianRupeeSign,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  cancelExpenseDetail,
  deleteExpenseDetail,
} from "../../../api/expenseDataManage/expenseManagement";

const DeleteExpenseModal = ({
  getDeleteModalOpen,
  setDeleteModal,
  getExpenseList,
  active,
}) => {
  const deleteProductHandler = () => {
    if (active !== "cancelled") {
      cancelExpenseDetail(getDeleteModalOpen?.expense_id)
        .then((response) => {
          if (response.status === 200) {
            setDeleteModal((prev) => ({
              ...prev,
              deleteModal: false,
            }));
            message.success("Cancel Expense successfully");
            getExpenseList();
          }
        })
        .catch((error) => {
          message.success("something went wrong");
        });
    } else {
      deleteExpenseDetail(getDeleteModalOpen?.expense_id)
        .then((response) => {
          if (response.status === 200) {
            setDeleteModal((prev) => ({
              ...prev,
              deleteModal: false,
            }));
            message.success("Delete Expense successfully");
            getExpenseList();
          }
        })
        .catch((error) => {
          message.success("something went wrong");
        });
    }
  };

  const dateFormateChangeHandler = (modifiedExpenseDate) => {
    const date = new Date(modifiedExpenseDate);
    const expenseDate = new Date(date).getDate();
    const expenseMonth = new Date(date).toLocaleString("default", {
      month: "long",
    });
    const expenseYear = new Date(date).getFullYear();
    return `${expenseDate} ${expenseMonth}  ${expenseYear}`;
  };

  const handleCancel = () => {
    setDeleteModal((prev) => ({
      ...prev,
      deleteModal: false,
    }));
  };

  return (
    <>
      <Modal
        title={"Are You Sure Want to delete?"}
        open={getDeleteModalOpen?.deleteModal}
        className={styles.delete_modal_container}
        onCancel={handleCancel}
        width={740}
        footer={[
          <Button
            key="back"
            className={styles.close_modal_btn}
            onClick={handleCancel}
          >
            Close
          </Button>,
          <Button
            key="submit"
            type="primary"
            className={styles.delete_modal}
            onClick={deleteProductHandler}
          >
            Delete
          </Button>,
        ]}
      >
        <table class="table text-center mt-3">
          <thead>
            <tr>
              <th scope="col" class="text-left">
                ID
              </th>
              <th scope="col">Category</th>
              <th scope="col">Date</th>
              <th scope="col" class="text-right">
                Payment Mode
              </th>
              <th scope="col" class="text-right">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="row" class="text-left">
                {getDeleteModalOpen?.expense_id}
              </td>
              <td>{getDeleteModalOpen?.expense_category}</td>
              <td>
                {dateFormateChangeHandler(getDeleteModalOpen?.expense_date)}
              </td>
              <td>{getDeleteModalOpen?.payment_type}</td>
              <td>{getDeleteModalOpen?.amount}</td>
            </tr>
          </tbody>
        </table>
        <p class="text-danger">This action cannot be reversed.</p>
      </Modal>
    </>
  );
};

export default DeleteExpenseModal;
