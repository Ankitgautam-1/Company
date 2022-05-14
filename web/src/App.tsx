import React, { useEffect, useRef, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "./App.css";
import { BiEdit } from "react-icons/bi";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import initTheData, {
  addCompany,
  Companies,
  deleteCompany,
  updateCompany,
} from "./store/actions/action";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import data from "./files.json";
import city from "./city.json";
import cities from "./data";
import { v4 } from "uuid";
import { createClient } from "@supabase/supabase-js";
import axiosConfig from "./Utils/axiosInit";
import axios from "axios";

function App() {
  const companiesData = useSelector((state: any) => state.CompanyReducer);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [selected, setSelected] = useState<any>("Andaman and Nicobar Islands");
  const formref = useRef<HTMLFormElement | null>(null);
  const [cities, setCities] = useState(["Port Blair*"]);
  const [company_name, setcompany_name] = useState("");
  const [selectedRow, setSelectedRow] = useState<Companies | any>();
  const [company_description, setcompany_description] = useState("");
  const [company_logo, setCompany_logo] = useState<
    | string
    | File
    | Blob
    | ArrayBuffer
    | ArrayBufferView
    | Buffer
    | FormData
    | NodeJS.ReadableStream
    | ReadableStream<any>
    | URLSearchParams
  >();

  const [company_email, setCompany_email] = useState("");
  const [company_phone, setCompany_phone] = useState(0);
  const [company_state, setCompany_state] = useState(
    "Andaman and Nicobar Islands"
  );
  const [company_city, setCompany_city] = useState("Port Blair*");
  const handleClose = () => {
    setShow(false);
    formref.current?.reset();
    setSelected("Andaman and Nicobar Islands");
    setCities(["Port Blair*"]);
  };
  const handleShow = () => setShow(true);
  const handleEditClose = () => setEditShow(false);
  const handleEditShow = () => setEditShow(true);

  const editForm = useRef<HTMLFormElement | null>(null);
  const client = createClient(
    "https://ugxqtrototfqtawjhnol.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjM5NjQ0MzM2LCJleHAiOjE5NTUyMjAzMzZ9.7ZRfV8ekUJBSLVQWA6ylO5gdbE5BNnnD8lyZDflOgU0"
  );
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
      dataField: "company_contact_number",
      text: "Contact Number",
      sort: true,
      filter: textFilter({
        className: "CompanyContactNumberFilter",
      }),
      formatter: (cell: any, row: Companies) => {
        return (
          <div style={{ maxWidth: "100%" }}>
            <input
              disabled
              value={row.company_contact_number}
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
        className: "CompanyContactNumberFilter",
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
                setSelectedRow({
                  company_id: row.company_id,
                  company_name: row.company_name,
                  company_state: row.company_state,
                  company_city: row.company_city,
                  company_email: row.company_email,
                  company_description: row.company_description,
                  company_logo: row.company_logo,
                  company_contact_number: row.company_contact_number,
                });
                handleEditShow();
              }}
            />
            <MdDeleteOutline
              size="20px"
              color="red"
              onClick={async () => {
                const res = await axiosConfig.delete(
                  `/deleteCompany/${row.company_id}`
                );
                if (res.status === 200) {
                  dispatch(deleteCompany(row.company_id));
                } else {
                  alert("Error in deleting company");
                }
              }}
            />
          </div>
        );
      },
    },
  ];
  const opt = paginationFactory({
    sizePerPageList: [5, 10, 15, 25],
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
        <button className="AddButton" onClick={handleShow}>
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
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Form
          ref={formref}
          onSubmit={async (e: any) => {
            e.preventDefault();

            if (company_phone.toString().length !== 10) {
              return alert("Phone number must be 10 digits");
            } else {
              const uid = v4();
              const upload_logo = await client.storage
                .from("travel-treat-storage")
                .upload(`company_logo/${uid}/${uid}`, company_logo as any);
              console.log("upload_logo", upload_logo);

              if (upload_logo.error === null) {
                const image_url = `https://ugxqtrototfqtawjhnol.supabase.co/storage/v1/object/public/travel-treat-storage/company_logo/${uid}/${uid}`;
                axiosConfig
                  .post("/addCompany", {
                    company_id: uid,
                    company_name: company_name,
                    company_contact_number: company_phone,
                    company_email: company_email,
                    company_state: company_state,
                    company_city: company_city,
                    company_description: company_description,
                    company_logo: image_url,
                  })
                  .then((res: any) => {
                    console.log("res", res);
                    handleClose();
                    formref.current?.reset();
                    dispatch(
                      addCompany({
                        company_id: uid,
                        company_name: company_name,
                        company_contact_number: company_phone.toString(),
                        company_email: company_email,
                        company_state: company_state,
                        company_city: company_city,
                        company_description: company_description,
                        company_logo: image_url,
                      })
                    );
                  })
                  .catch((err: any) => {
                    alert(err.response.data);
                  });
              } else {
                console.log("logo not uploaded", upload_logo.error);
              }
            }
          }}
        >
          <Modal.Header>
            <div className="FormHead">Add new company</div>
          </Modal.Header>
          <Modal.Body className="formbody">
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  autoFocus
                  onChange={(e: {
                    target: { value: React.SetStateAction<string> };
                  }) => {
                    setcompany_name(e.target.value);
                  }}
                  required
                  placeholder="Enter name"
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  onChange={(e: {
                    target: { value: React.SetStateAction<string> };
                  }) => {
                    setCompany_email(e.target.value);
                  }}
                  required
                  placeholder="Enter email"
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  onChange={(e) => {
                    setcompany_description(e.target.value);
                  }}
                  required
                  placeholder="Enter the description"
                  style={{ height: "60px", fontSize: "small" }}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Contact No</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e: any) => {
                    setCompany_phone(e.target.value);
                  }}
                  required
                  minLength={10}
                  placeholder="9892"
                  style={{ fontSize: "small" }}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} className="StateCol">
                <Form.Label>Logo</Form.Label>
                <Form.Control
                  onChange={(e: any) => {
                    if (e.target.files[0] !== null) {
                      setCompany_logo(e.target.files[0]);
                    }
                  }}
                  required
                  type="file"
                  accept="image/png,image/jpg,image/jpeg"
                ></Form.Control>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} className="StateCol">
                <Form.Label>State</Form.Label>
                <Form.Select
                  onChange={(e: any) => {
                    setSelected(e.target.value);
                    const res: any = city.filter((city) => {
                      return city.state === e.target.value;
                    });
                    setCompany_city(res[0].cities[0]);
                    setCompany_state(e.target.value);
                    setCities(res[0].cities);
                  }}
                >
                  {data.map((state) => {
                    return (
                      <option key={state.code} value={state.name}>
                        {state.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} className="StateCol">
                <Form.Label>City</Form.Label>
                <Form.Select
                  onChange={(e: {
                    target: { value: React.SetStateAction<string> };
                  }) => {
                    setCompany_city(e.target.value);
                  }}
                >
                  {cities.map((city: any) => {
                    return (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            </Row>
          </Modal.Body>
          <Modal.Footer className="footer">
            <Button variant="text" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      {/* Edit form----------------------------------------- */}
      <Modal
        show={editShow}
        onHide={handleEditClose}
        backdrop="static"
        keyboard={false}
      >
        <Form
          ref={editForm}
          onSubmit={async (e: any) => {
            e.preventDefault();
            axiosConfig
              .patch("/updateCompany", {
                company_id: selectedRow?.company_id,
                company_name: selectedRow?.company_name,
                company_contact_number: selectedRow?.company_contact_number,
                company_email: selectedRow?.company_email,
                company_state: selectedRow?.company_state,
                company_logo: selectedRow?.company_logo,
                company_city: selectedRow?.company_city,
                company_description: selectedRow?.company_description,
              })
              .then((res: any) => {
                console.log("res", res);
                handleEditClose();
                editForm.current?.reset();
                dispatch(
                  updateCompany({
                    company_id: selectedRow?.company_id,
                    company_name: selectedRow?.company_name,
                    company_contact_number: selectedRow?.company_contact_number,
                    company_email: selectedRow?.company_email,
                    company_state: selectedRow?.company_state,
                    company_city: selectedRow?.company_city,
                    company_description: selectedRow?.company_description,
                    company_logo: selectedRow?.company_logo,
                  })
                );
              })
              .catch((err: any) => {
                alert(err.response.data);
              });
          }}
        >
          <Modal.Header>
            <div className="FormHead">Edit Company</div>
          </Modal.Header>
          <Modal.Body className="formbody">
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedRow?.company_name || ""}
                  autoFocus
                  onChange={(e: {
                    target: { value: React.SetStateAction<string> };
                  }) => {
                    setSelectedRow({
                      ...selectedRow,
                      company_name: e.target.value,
                    });
                  }}
                  required
                  placeholder="Enter name"
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  defaultValue={selectedRow?.company_email || ""}
                  type="email"
                  onChange={(e: {
                    target: { value: React.SetStateAction<string> };
                  }) => {
                    setSelectedRow({
                      ...selectedRow,
                      company_email: e.target.value,
                    });
                  }}
                  required
                  placeholder="Enter email"
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  defaultValue={selectedRow?.company_description || ""}
                  as="textarea"
                  onChange={(e) => {
                    setSelectedRow({
                      ...selectedRow,
                      company_description: e.target.value,
                    });
                  }}
                  required
                  placeholder="Enter the description"
                  style={{ height: "60px", fontSize: "small" }}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Contact No</Form.Label>
                <Form.Control
                  defaultValue={selectedRow?.company_contact_number || ""}
                  type="number"
                  onChange={(e: any) => {
                    setSelectedRow({
                      ...selectedRow,
                      company_phone: e.target.value,
                    });
                  }}
                  required
                  minLength={10}
                  placeholder="9892"
                  style={{ fontSize: "small" }}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} className="StateCol">
                <Form.Label>State</Form.Label>
                <Form.Select
                  defaultValue={selectedRow?.company_state || ""}
                  onChange={(e: any) => {
                    setSelected(e.target.value);
                    const res: any = city.filter((city) => {
                      return city.state === e.target.value;
                    });
                    setSelectedRow({
                      ...selectedRow,
                      company_state: e.target.value,
                      company_city: res[0].cities[0],
                    });

                    setCities(res[0].cities);
                  }}
                >
                  {data.map((state) => {
                    return (
                      <option key={state.code} value={state.name}>
                        {state.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} className="StateCol">
                <Form.Label>City</Form.Label>
                <Form.Select
                  defaultValue={selectedRow?.company_city || ""}
                  onChange={(e: {
                    target: { value: React.SetStateAction<string> };
                  }) => {
                    console.log("selected in city", selectedRow);
                    setSelectedRow({
                      ...selectedRow,
                      company_city: e.target.value,
                    });
                  }}
                >
                  {cities.map((city: any) => {
                    return (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            </Row>
          </Modal.Body>
          <Modal.Footer className="footer">
            <Button variant="text" onClick={handleEditClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
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
