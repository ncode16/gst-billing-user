import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";

const ExpenseInvoice = ({ getViewButton }) => {
  return (
    <PDFViewer>
      <InvoiceDetails getViewButton={getViewButton} />
    </PDFViewer>
  );
};

export const InvoiceDetails = ({ getViewButton }) => {
  const dateFormateChangeHandler = (modifiedExpenseDate) => {
    const date = new Date(modifiedExpenseDate);
    const expenseDate = new Date(date).getDate();
    const expenseMonth = new Date(date).toLocaleString("default", {
      month: "long",
    });
    const expenseYear = new Date(date).getFullYear();
    return `${expenseDate} ${expenseMonth}  ${expenseYear}`;
  };
  return (
    <Document>
      <Page style={styles.body}>
        <View style={styles.Conatiner}>
          <View style={styles.ExpenseTextView}>
            <Text style={styles.ExpenseText}>EXPENSE RECEIPT</Text>
            <View>
              <View style={styles.BusinessNameTextView}>
                <Text style={styles.BusinessNameText}>YOUR BUSINESS NAME</Text>
              </View>
              <View style={styles.MobileEmailView}>
                <Text style={styles.MobileText}>Mobile</Text>
                <Text style={styles.MobileNmbrText}>9408920888</Text>
                <Text style={styles.EmailText}>Email</Text>
              </View>
            </View>
          </View>
          <View style={styles.BodyViewConatiner}>
            <View style={styles.ExpensesView}>
              <Text style={styles.ExpensesText}>Expense #:-</Text>
              <Text style={styles.ExpensesValueText}>
                EXP- {getViewButton?.list?.expense_id}
              </Text>
            </View>
            <View style={styles.PaymentDateView}>
              <Text style={styles.PaymentDateText}>Payment Date: </Text>
              <Text style={styles.PaymentDateValueText}>
                {dateFormateChangeHandler(getViewButton?.list?.expense_date)}
              </Text>
            </View>
            <View style={styles.PaymentView}>
              <Text style={styles.PaymentText}>Payment Serial Number #: </Text>
              <Text style={styles.PaymentValueText}>
                PAYOUT-{getViewButton?.list?.payment_id}
              </Text>
            </View>
            <View style={styles.CategoryView}>
              <Text style={styles.CategoryText}>Category:</Text>
              <Text style={styles.CategoryValueText}>
                {getViewButton?.list?.expense_category}
              </Text>
            </View>
            <View style={styles.ModeView}>
              <Text style={styles.ModeText}>Mode</Text>
              <Text style={styles.ModeValueText}>
                {getViewButton?.list?.payment_type}
              </Text>
            </View>
            <View style={styles.AmountView}>
              <Text style={styles.AmountText}>Amount</Text>
              <Text style={styles.AmountValueText}>
                {getViewButton?.list?.amount}
              </Text>
            </View>
            <View style={styles.DescriptionView}>
              <Text style={styles.DecriptionText}>Description</Text>
              <Text style={styles.DescriptionValueText}>
                {getViewButton?.list?.description}
              </Text>
            </View>
          </View>

          <View style={styles.CreatedPhoneTextView}>
            <Text style={styles.CreatedText}>Created By</Text>
            <Text style={styles.PhoneNmbrText}>Ph:9408920888</Text>
          </View>
          <View style={styles.GeneratedTextView}>
            <Text style={styles.GeneratedText}>
              This is a computer generated document and requires no signature
            </Text>
          </View>

          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
            fixed
          />
        </View>
      </Page>
    </Document>
  );
};

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 30,
    paddingLeft: 50,
    paddingRight: 50,
  },
  ExpenseText: {
    fontSize: 18,
    textAlign: "center",
    color: "#3176f5",
    paddingBottom: 10,
  },
  text: {
    // margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  view: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  GeneratedText: { fontSize: 12, color: "#000" },
  GeneratedTextView: { paddingTop: 400, left: -10 },
  PhoneNmbrText: { fontSize: 12, color: "#5d5e5b", fontWeight: "semibold" },
  CreatedText: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
    paddingBottom: 5,
  },
  CreatedPhoneTextView: { left: -6 },
  DescriptionValueText: {
    fontSize: 12,
    textAlign: "center",
    width: "80%",
    fontWeight: "bold",
    left: -15,
    color: "#1c1c1c",
    fontWeight: "bold",
  },
  DecriptionText: {
    fontSize: 12,
    textAlign: "center",
    width: "20%",
    color: "#969693",
    fontWeight: "bold",
  },
  DescriptionView: {
    flexDirection: "row",
    justifyContent: "space-between",
    left: -23,
    paddingBottom: 20,
  },
  AmountValueText: {
    fontSize: 12,
    textAlign: "center",
    width: "90%",
    right: 0,
    color: "#1c1c1c",
    fontWeight: "bold",
  },
  AmountText: {
    fontSize: 12,
    textAlign: "center",
    width: "20%",
    color: "#969693",
    fontWeight: "bold",
  },
  AmountView: {
    flexDirection: "row",
    justifyContent: "space-between",
    left: -30,
    paddingBottom: 10,
  },
  ModeValueText: {
    fontSize: 12,
    textAlign: "center",
    width: "80%",
    right: 0,
    color: "#1c1c1c",
    fontWeight: "bold",
  },
  ModeText: {
    fontSize: 12,
    textAlign: "center",
    width: "20%",
    color: "#969693",
    fontWeight: "bold",
  },
  ModeView: {
    flexDirection: "row",
    justifyContent: "space-between",
    left: -36,
    paddingBottom: 10,
  },
  CategoryValueText: {
    fontSize: 12,
    textAlign: "center",
    width: "80%",
    left: 43,
    color: "#1c1c1c",
    fontWeight: "bold",
  },
  CategoryText: {
    fontSize: 12,
    textAlign: "center",
    width: "20%",
    color: "#969693",
    fontWeight: "bold",
  },
  CategoryView: {
    flexDirection: "row",
    justifyContent: "space-between",
    left: -25,
    paddingBottom: 10,
  },
  PaymentValueText: {
    fontSize: 12,
    textAlign: "center",
    width: "60%",
    left: -32,
    color: "#1c1c1c",
    fontWeight: "bold",
  },
  PaymentText: {
    fontSize: 12,
    textAlign: "center",
    width: "40%",
    color: "#969693",
    fontWeight: "bold",
  },
  PaymentView: {
    flexDirection: "row",
    justifyContent: "space-between",
    left: -29,
    paddingBottom: 10,
  },
  PaymentDateValueText: {
    fontSize: 12,
    textAlign: "center",
    width: "80%",
    color: "#1c1c1c",
    fontWeight: "bold",
  },
  PaymentDateText: {
    fontSize: 12,
    textAlign: "center",
    width: "20%",
    color: "#969693",
    fontWeight: "bold",
  },
  PaymentDateView: {
    flexDirection: "row",
    justifyContent: "space-between",
    left: -9,
    paddingBottom: 10,
  },
  ExpensesValueText: {
    fontSize: 12,
    textAlign: "center",
    width: "80%",
    color: "#1c1c1c",
    fontWeight: "bold",
  },
  ExpensesText: {
    fontSize: 12,
    textAlign: "center",
    width: "20%",
    color: "#969693",
    fontWeight: "bold",
  },
  ExpensesView: {
    flexDirection: "row",
    justifyContent: "space-between",
    left: -18,
    paddingTop: 10,
    paddingBottom: 10,
  },
  BodyViewConatiner: { justifyContent: "center" },
  EmailText: {
    fontSize: 12,
    textAlign: "center",
    paddingTop: 2,
    fontWeight: "bold",
    color: "#4d4e4f",
  },
  MobileNmbrText: {
    fontSize: 12,
    textAlign: "center",
    paddingTop: 2,
    color: "#000",
    paddingRight: 5,
  },
  MobileText: {
    fontSize: 12,
    textAlign: "center",
    paddingTop: 2,
    fontWeight: "bold",
    color: "#4d4e4f",
    paddingRight: 5,
  },
  MobileEmailView: { flexDirection: "row", paddingBottom: 10 },
  BusinessNameText: {
    fontSize: 12,
    textAlign: "center",
    color: "#000",
    fontWeight: "bold",
  },
  BusinessNameTextView: { paddingBottom: 10 },
  ExpenseTextView: {
    flexDirection: "column",
    paddingTop: 20,
    alignSelf: "flex-start",
  },
  Conatiner: { flex: 1 },
});

export default ExpenseInvoice;
