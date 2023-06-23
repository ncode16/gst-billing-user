// ** React Imports
import { Fragment, useState, useEffect } from "react";
import "../expenses/Expenses.css";
import { Search, Plus, Play } from "react-feather";
import AddExpenses from "./addExpense";
import TableBasic from "../expenses/table";
import dayjs from "dayjs";

import { DatePicker } from "antd";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Form,
  Input,
  InputGroup,
  InputGroupText,
  Button,
} from "reactstrap";

import moment from "moment";
import { GetExpenseData } from "../../../api/expenseDataManage/expenseManagement";
const { RangePicker } = DatePicker;
// ** Reactstrap Imports
const Expenses = () => {
  const [dates, setDates] = useState([]);
  console.log(dates);
  const [modal, setModal] = useState(false);
  const [date, setDate] = useState();
  // ** State
  const [active, setActive] = useState("");
  const [expenseData, setExpenseData] = useState([]);
  const [getExpenseModal, setExpenseModal] = useState(false);
  const [getLoading, setLoading] = useState(false);
  const [getTotalValue, setTotalValue] = useState(10);
  const [getExpenseListParamenter, setExpenseListParameter] = useState({
    page: 1,
    limit: 10,
    search: "",
    start_date: "",
    end_date: "",
    payment_status: active,
  });

  const toggle = (tab) => {
    setActive(tab);
    setExpenseListParameter((prev) => ({
      ...prev,
      payment_status: tab,
    }));
  };

  const getExpenseList = async () => {
    setLoading(true);
    GetExpenseData(getExpenseListParamenter)
      .then((response) => {
        if (response.status === 200) {
          setExpenseData(response?.data?.data?.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("data not found");
      });
  };

  useEffect(() => {
    getExpenseList();
  }, [
    getExpenseListParamenter?.page,
    getExpenseListParamenter?.limit,
    getExpenseListParamenter?.search,
    getExpenseListParamenter?.start_date,
    getExpenseListParamenter?.end_date,
    getExpenseListParamenter?.payment_status,
  ]);

  useEffect(() => {
    setExpenseListParameter((prev) => ({
      ...prev,
      start_date: dayjs().format("01/01/2023"),
      end_date: dayjs().format("30/06/2023"),
    }));
  }, []);

  return (
    <div class="shadow-lg p-2 mb-5 bg-white rounded">
      <div className="Heading-Expenses">
        <div className="purchase-button">
          <h3 className="purchase-header">Expenses</h3>
        </div>
        <div className="Heading-Expenses-one">
          <Button
            className="pop-up-btn-one"
            color="primary"
            onClick={() => setExpenseModal(true)}
          >
            <Plus size={14} />
            <span className="align-middle ms-50">Create Expense</span>
          </Button>
        </div>
      </div>

      <Fragment>
        <Nav tabs>
          <NavItem>
            <NavLink
              active={active === ""}
              onClick={() => {
                toggle("");
              }}
            >
              All Transactions
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={active === "pending"}
              onClick={() => {
                toggle("pending");
              }}
            >
              Pending
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={active === "paid"}
              onClick={() => {
                toggle("paid");
              }}
            >
              Paid
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={active === "cancelled"}
              onClick={() => {
                toggle("cancelled");
              }}
            >
              Cancelled
            </NavLink>
          </NavItem>
        </Nav>
        <div className="expense-search-box">
          <div className="Search-box">
            <Form className="faq-search-input">
              <InputGroup>
                <InputGroupText>
                  <Search size={14} />
                </InputGroupText>
                <Input
                  type="text"
                  className="expense-search-in"
                  placeholder="Search with Category,Discription,Model"
                  onChange={(e) =>
                    setExpenseListParameter((prev) => ({
                      ...prev,
                      search: e.target.value,
                    }))
                  }
                />
              </InputGroup>
            </Form>
          </div>
          <div className="date-picker">
            <div className="date-time-picker">
              <div style={{ margin: 0 }}>
                <RangePicker
                  onChange={(values, dateString) =>
                    setExpenseListParameter((prev) => ({
                      ...prev,
                      start_date: dateString[0],
                      end_date: dateString[1],
                    }))
                  }
                  defaultValue={[
                    dayjs("01/01/2023", "DD/MM/YYYY"),
                    dayjs("30/06/2023", "DD/MM/YYYY"),
                  ]}
                  format="DD/MM/YYYY"
                  allowClear={false}
                  // value={[
                  //   getExpenseListParamenter?.start_date,
                  //   getExpenseListParamenter?.end_date,
                  // ]}
                />
              </div>
            </div>
            <div className="Showing-result">
              <h4>Showing results for this year</h4>
            </div>
          </div>
        </div>
        <TableBasic
          active={active}
          setExpenseData={setExpenseData}
          expenseData={expenseData}
          getExpenseList={getExpenseList}
          getExpenseListParamenter={getExpenseListParamenter}
          setExpenseListParameter={setExpenseListParameter}
          loading={getLoading}
          setExpenseModal={setExpenseModal}
          getTotalValue={getTotalValue}
          setTotalValue={setTotalValue}
        />
        <AddExpenses
          open={getExpenseModal}
          setExpenseModal={setExpenseModal}
          getExpenseList={getExpenseList}
          expenseData={expenseData}
          getExpenseListParamenter={getExpenseListParamenter}
        />
      </Fragment>

      <hr></hr>
    </div>
  );
};

export default Expenses;
