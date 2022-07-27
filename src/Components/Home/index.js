import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import AddUser from "./AddUser";
import { FaPowerOff } from "react-icons/fa";

const Home = () => {
  const [addUser, setAddUser] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [deliveryPartners, setDeliveryPartners] = useState([]);
  const [showCustomers, setShowCustomers] = useState(true);
  const [showDelPartners, setShowDelPartners] = useState(false);
  const [shipments, setShipments] = useState([]);

  let navigate = useNavigate();

  const handlesubmit = (event) => {
    event.preventDefault();
  };

  const getUsers = () => {
    let token = localStorage.getItem("jwt");
    axios({
      method: "GET",
      url: `${config.url}/users`,
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        "Access-Control-Allow-Origin": "*",
        jwt: token,
      },
    })
      .then(function (response) {
        console.log(response);
        if (response && response.data) {
          let customersData = response.data.filter(
            (data) => data.user_type === 1
          );
          let deliveryPartnersData = response.data.filter(
            (data) => data.user_type === 2
          );
          setCustomers(customersData);
          setDeliveryPartners(deliveryPartnersData);
        } else {
          swal("Failure", "Something went wrong", "error");
        }
      })
      .catch(function (error) {
        console.log(error);
        swal("Failure", "Something went wrong", "error");
      });
  };

  const getAllShipments = () => {
    let token = localStorage.getItem("jwt");
    axios({
      method: "GET",
      url: `${config.url}/allShipments`,
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        "Access-Control-Allow-Origin": "*",
        jwt: token,
      },
    })
      .then(function (response) {
        console.log(response);
        if (response && response.data) {
          setShipments(response.data.shipments);
        } else {
          swal("Failure", "Something went wrong", "error");
        }
      })
      .catch(function (error) {
        console.log(error);
        swal("Failure", "Something went wrong", "error");
      });
  };

  useEffect(() => {
    getUsers();
    getAllShipments();
  }, []);

  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color,
        backgroundColor: color,
        height: 3,
      }}
    />
  );

  const enableOrDisbaleUser = (row) => {
    let token = localStorage.getItem("jwt");
    swal({
      title: `Are you sure want to ${
        row.user_status === 1 ? "Disable" : "Enable"
      } user?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios({
          method: "POST",
          url: `${config.url}/users/update`,
          data: {
            email: row.email,
            status: row.user_status === 1 ? 2 : row.user_status === 2 ? 1 : "",
          },
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            "Access-Control-Allow-Origin": "*",
            jwt: token,
          },
        })
          .then(function (response) {
            console.log(response);
            if (
              response &&
              response.data &&
              response.data.message === "Success"
            ) {
              getUsers();
              swal("Success", "User Status Updated", "success");
            } else {
              swal("Failure", "Something went wrong", "error");
            }
          })
          .catch(function (error) {
            console.log(error);
            swal("Failure", "Something went wrong", "error");
          });
      } else {
        return;
      }
    });
  };

  const renderTableData = (tableData) => {
    return (
      <table className="table">
        <thead
          style={{
            backgroundColor: "rgb(0 141 185 / var(--tw-bg-opacity))",
          }}
        >
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data) => (
            <tr key={data.email}>
              <th>{data.first_name}</th>
              <th>{data.last_name}</th>
              <th>{data.email}</th>
              <th>{config.userStatus[data.user_status]}</th>
              <th>
                <button
                  type="button"
                  className={`btn ${
                    data.user_status === 1 ? "btn-danger" : "btn-success"
                  }`}
                  onClick={() => enableOrDisbaleUser(data)}
                >
                  {`${data.user_status === 1 ? "Disable" : "Enable"}`}
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const renderShipmentsData = (tableData) => {
    return (
      <table className="table">
        <thead
          style={{
            backgroundColor: "rgb(0 141 185 / var(--tw-bg-opacity))",
          }}
        >
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Source Location</th>
            <th scope="col">Target Location</th>
            <th scope="col">Delivery Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data) => (
            <tr key={data.shipment_id}>
              <th>{data.shipment_id}</th>
              <th>{data.name}</th>
              <th>{data.source_loc}</th>
              <th>{data.target_loc}</th>
              <th>{config.deliveryStatus[data.delivery_status]}</th>
              <th>
                {" "}
                {data.delivery_status !== 2 ? (
                  <button
                    // onClick={() => updateDeliveryStatus(data, 1)}
                    className="btn btn-secondary"
                  >
                    Assign
                  </button>
                ) : (
                  <></>
                )}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  const logout = () => {
    localStorage.setItem("jwt", "");
    localStorage.setItem("loggedInUserId", "");
    navigate("/");
  };
  return (
    <>
      <div className="bg-white dark:bg-gray-900">
        <div className="flex justify-center" style={{ height: "100vh" }}>
          <div className="hidden bg-cover lg:block lg:w-1/4">
            <div className="flex items-center h-full px-20 bg-blue-50">
              <img className="w-64" src="logo/LOGOWHITE.png" alt="" />
            </div>
          </div>
          {!addUser ? (
            <div
              className=""
              style={{
                width: "75%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{ width: "80%", marginLeft: "10%", marginRight: "10%" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "20px",
                  }}
                >
                  <FaPowerOff size={30} onClick={() => logout()} />
                </div>
                <h1 style={{ textAlign: "center" }}>All Users</h1>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "row",
                    marginBottom: "30px",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <button
                      type="button"
                      className={`btn ${
                        showCustomers ? "btn-success" : "btn-light"
                      }`}
                      style={{ marginRight: "20px" }}
                      onClick={() => {
                        setShowCustomers(true);
                        setShowDelPartners(false);
                      }}
                    >
                      Customers
                    </button>
                    <button
                      type="button"
                      className={`btn ${
                        showDelPartners ? "btn-success" : "btn-light"
                      }`}
                      onClick={() => {
                        setShowCustomers(false);
                        setShowDelPartners(true);
                      }}
                    >
                      Delivery Partners
                    </button>
                  </div>
                  <button
                    type="button"
                    className="btn"
                    style={{
                      backgroundColor: "rgb(0 141 185 / var(--tw-bg-opacity))",
                      color: "white",
                    }}
                    onClick={() => setAddUser(true)}
                  >
                    Add User
                  </button>
                </div>
                {showCustomers ? renderTableData(customers) : <></>}
                {showDelPartners ? renderTableData(deliveryPartners) : <></>}
                <h1 style={{ textAlign: "center" }}>All Shipments</h1>
                {shipments ? renderShipmentsData(shipments) : <></>}
              </div>
            </div>
          ) : (
            <AddUser
              getUsers={() => getUsers()}
              closeAddUser={() => setAddUser(false)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
