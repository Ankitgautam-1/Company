import React, { useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "./App.css";
import { BiEdit } from "react-icons/bi";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import initTheData, { Companies } from "./store/actions/action";
import { IoMdAddCircleOutline } from "react-icons/io";
function App() {
  const companiesData = useSelector((state: any) => state.CompanyReducer);
  console.log("companiesData", companiesData);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("http://localhost:3030/getCompany").then((res) =>
      res.json().then((data: Companies[]) => dispatch(initTheData(data)))
    );
  }, [dispatch]);

  const columns = [
    {
      dataField: "company_logo",
      text: "Logo",
      headerStyle: {},
      formatter: (cell: any, row: Companies) => {
        return (
          <div className="comapanyImage">
            <img
              src={row.company_logo}
              alt="logo"
              style={{ width: "50px", height: "50px" }}
            />
          </div>
        );
      },
    },
    {
      dataField: "company_id",
      text: "Company ID",
      sort: true,

      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      filter: textFilter({
        className: "CompanyIdTextFilter",
      }),
      formatter: (cell: any, row: Companies) => {
        return (
          <div style={{ maxWidth: "100%" }}>
            <textarea
              disabled
              value={row.company_id}
              style={{
                maxHeight: "70px",
                width: "100%",
                backgroundColor: "transparent",
                border: "none",
                textOverflow: "ellipsis",
              }}
            />
          </div>
        );
      },
    },
    {
      dataField: "company_name",
      text: "Name",
      sort: true,
      filter: textFilter({
        className: "CompanytextFilter",
      }),
      formatter: (cell: any, row: Companies) => {
        return (
          <div style={{ maxWidth: "100%" }}>
            <input
              disabled
              value={row.company_name}
              style={{
                width: "100%",
                backgroundColor: "transparent",
                border: "none",
                textOverflow: "ellipsis",
              }}
            />
          </div>
        );
      },
    },
    {
      dataField: "company_state",
      text: "State",
      sort: true,
      filter: textFilter({
        placeholder: "Filter by State",
        className: "CompanyStateFilter",
      }),
      formatter: (cell: any, row: Companies) => {
        return (
          <div style={{ maxWidth: "100%" }}>
            <input
              disabled
              value={row.company_state}
              style={{
                width: "100%",
                backgroundColor: "transparent",
                border: "none",
                textOverflow: "ellipsis",
              }}
            />
          </div>
        );
      },
    },
    {
      dataField: "company_city",
      text: "City",
      sort: true,
      filter: textFilter({
        placeholder: "Filter by City",
        className: "CompanyStateFilter",
      }),
      formatter: (cell: any, row: Companies) => {
        return (
          <div style={{ maxWidth: "100%" }}>
            <input
              disabled
              value={row.company_city}
              style={{
                width: "100%",
                backgroundColor: "transparent",
                border: "none",
                textOverflow: "ellipsis",
              }}
            />
          </div>
        );
      },
    },

    {
      dataField: "company_email",
      text: "Email",
      sort: true,
      filter: textFilter({
        placeholder: "Filter by Email",
        className: "CompanyStateFilter",
      }),
      formatter: (cell: any, row: Companies) => {
        return (
          <div style={{ maxWidth: "100%" }}>
            <textarea
              disabled
              value={row.company_email}
              style={{
                maxHeight: "70px",
                width: "100%",
                backgroundColor: "transparent",
                border: "none",
                textOverflow: "ellipsis",
              }}
            />
          </div>
        );
      },
    },

    {
      dataField: "company_description",
      text: "Description",
      sort: true,

      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      filter: textFilter({
        className: "CompanyIdTextFilter",
      }),
      formatter: (cell: any, row: Companies) => {
        return (
          <div style={{ maxWidth: "100%" }}>
            <textarea
              disabled
              value={row.company_description}
              style={{
                maxHeight: "200px",
                fontSize: "11px",
                width: "100%",
                backgroundColor: "transparent",
                border: "none",
                textOverflow: "ellipsis",
              }}
            />
          </div>
        );
      },
    },
    {
      dataField: "",
      text: "Actions",

      formatter: (cell: any, row: any) => {
        return (
          <div className="editColumn">
            <BiEdit
              style={{
                marginRight: "10px",
              }}
              size="20px"
              color="blue"
              onClick={() => {
                console.log("row", row);
                console.log("cell", cell);
              }}
            />
            <MdDeleteOutline
              size="20px"
              color="red"
              onClick={() => {
                console.log("row", row);
                console.log("cell", cell);
              }}
            />
          </div>
        );
      },
    },
  ];
  const opt = paginationFactory({
    sizePerPageList: [3, 5, 25, 50, 100],
    withFirstAndLast: true,
    alwaysShowAllBtns: true,
    firstPageText: "First",
    sizePerPage: 5,

    prePageText: "Pre",
    nextPageText: "Next",
    lastPageText: "Last",
    nextPageTitle: "First page",
    prePageTitle: "Pre page",
    firstPageTitle: "Next page",
    lastPageTitle: "Last page",
    showTotal: true,
    paginationTotalRenderer: (from: number, to: any, total: number) => {
      return (
        <div className="pagination-total">
          <span>
            Showing {from} to {to} of {total} entries
          </span>
        </div>
      );
    },
  });
  return (
    <div>
      <div className="BtnContainer">
        <button className="AddButton">
          {" "}
          <IoMdAddCircleOutline
            size={"20px"}
            style={{
              marginRight: "3px",
            }}
            color="white"
          />{" "}
          Add Company
        </button>
      </div>

      <div className="tableContainer">
        <BootstrapTable
          keyField="company_id"
          data={companiesData}
          striped
          hover
          columns={columns}
          pagination={opt}
          filter={filterFactory()}
        ></BootstrapTable>
      </div>
    </div>
  );
}

export default App;
