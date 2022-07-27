import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import { FaPowerOff } from "react-icons/fa";

const Deliveries = (props) => {
  const [shipments, setShipments] = useState([]);

  let navigate = useNavigate();

  const getShipments = () => {
    let token = localStorage.getItem("jwt");
    let loggedInUserId = localStorage.getItem("loggedInUserId");
    console.log("loggedInUserId", loggedInUserId); //hereeeeeeeeeeeee
    axios({
      method: "GET",
      url: `${config.url}/deliveries?id=${loggedInUserId}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        "Access-Control-Allow-Origin": "*",
        jwt: token,
      },
    })
      .then(function (response) {
        console.log(response);
        if (response && response.data && response.data.shipments) {
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
    getShipments();
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

  const updateDeliveryStatus = (data, status) => {
    let token = localStorage.getItem("jwt");

    axios({
      method: "POST",
      url: `${config.url}/shipments/update`,
      data: {
        status: status,
        shipId: data.shipment_id,
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
        if (response && response.data && response.data.message === "Success") {
          swal("Success", "Shipment Status Updated Successfully", "success");
          getShipments();
        } else {
          swal("Failure", "Something went wrong", "error");
        }
      })
      .catch(function (error) {
        console.log(error);
        swal("Failure", "Something went wrong", "error");
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
                {data.delivery_status === 0 ? (
                  <button
                    onClick={() => updateDeliveryStatus(data, 1)}
                    className="btn btn-secondary"
                  >
                    Mark as shipped
                  </button>
                ) : data.delivery_status === 1 ? (
                  <button
                    onClick={() => updateDeliveryStatus(data, 2)}
                    className="btn btn-secondary"
                  >
                    Mark as delivered
                  </button>
                ) : data.delivery_status === 2 ? (
                  <button className="btn btn-success">Delivered</button>
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
              <h1 style={{ textAlign: "center" }}>Deliveries</h1>
              {renderTableData(shipments)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Deliveries;
