import React from "react";
// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Invoice List Sidebar
// import Sidebar from "./Sidebar";

// ** Table Columns
// import { columns } from './columns'

// ** Store & Actions
// import { getAllData, getData } from '../store'
import { useDispatch, useSelector } from "react-redux";

// ** Third Party Components
import Select from "react-select";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import {
  ChevronDown,
  Share,
  Printer,
  FileText,
  File,
  Grid,
  Copy,
} from "react-feather";

import $ from 'jquery'

// ** Utils
// import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

// ** Styles
import "../../../@core/scss/react/libs/react-select/_react-select.scss";
import "../../../@core/scss/react/libs/tables/react-dataTable-component.scss";

const CustomTable = ({
  columns,
  handleSort,
  CustomPagination,
  dataToRender,
  pagination,
}) => {

  // $(document).ready(() => {
  //   $(".rdt_TableCell").css("height", "auto");
  //   const datatable = $(".react-dataTable");
  //   if(datatable[0].innerText === 'There are no records to display'){
  //     datatable.hide();
  //     window.location.reload();
  //     // $('#datalist').load(location.href + " #datalist");
  //   }
  // })

  return (
    <div>
      <Card className="overflow-hidden">
        <div className="react-dataTable">
          <DataTable
            // noHeader
            // subHeader
            sortServer
            pagination={pagination}
            responsive
            paginationServer
            columns={columns}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            paginationComponent={CustomPagination}
            data={dataToRender}
            // title={'TestTitle'}
            // subHeader subHeaderComponent={'TestSubHeader'}
            // subHeaderComponent={
            //   <CustomHeader
            //     store={store}
            //     searchTerm={searchTerm}
            //     rowsPerPage={rowsPerPage}
            //     handleFilter={handleFilter}
            //     handlePerPage={handlePerPage}
            //     toggleSidebar={toggleSidebar}
            //   />
            // }
          />
        </div>
      </Card>
    </div>
  );
};

export default CustomTable;
