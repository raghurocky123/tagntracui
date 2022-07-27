import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import { FaPowerOff } from "react-icons/fa";

const Home = (props) => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [type, setType] = useState("");
  const [pass, setPass] = useState("");
  const [conPass, setConPass] = useState("");

  let navigate = useNavigate();

  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color,
        backgroundColor: color,
        height: 3,
      }}
    />
  );

  const addUser = (event) => {
    event.preventDefault();
    let token = localStorage.getItem("jwt");

    if (
      firstName.trim() === "" ||
      firstName === null ||
      firstName === undefined
    ) {
      swal("Warning", "Please enter valid firstname", "warning");
      return;
    } else if (
      lastName.trim() === "" ||
      lastName === null ||
      lastName === undefined
    ) {
      swal("Warning", "Please enter valid lastname", "warning");
      return;
    } else if (email.trim() === "" || email === null || email === undefined) {
      swal("Warning", "Please enter valid email", "warning");
      return;
    } else if (type.trim() === "" || type === null || type === undefined) {
      swal("Warning", "Please select valid type", "warning");
      return;
    } else if (pass.trim() === "" || pass === null || pass === undefined) {
      swal("Warning", "Please enter valid password", "warning");
      return;
    } else if (pass !== conPass) {
      swal("Warning", "Both passwords must match", "warning");
      return;
    }

    axios({
      method: "POST",
      url: `${config.url}/users`,
      data: {
        email: email,
        first_name: firstName,
        last_name: lastName,
        password: pass,
        user_type: parseInt(type),
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
          swal("Success", "User added successfully", "success");
          props.getUsers();
          props.closeAddUser();
        } else {
          swal("Failure", "Something went wrong", "error");
        }
      })
      .catch(function (error) {
        console.log(error);
        swal("Failure", "Something went wrong", "error");
      });
  };
  const logout = () => {
    localStorage.setItem("jwt", "");
    localStorage.setItem("loggedInUserId", "");
    navigate("/");
  };
  return (
    <>
      <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-3/4">
        <div className="flex-1">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "20px",
            }}
          >
            <FaPowerOff size={30} onClick={() => logout()} />
          </div>
          <div className="text-center">
            <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white underline">
              ADD USER
            </h2>
          </div>

          <div className="mt-6">
            <form className="bg-white  px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="first_name"
                >
                  First Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="first_name"
                  id="first_name"
                  type="text"
                  placeholder="Name"
                  defaultValue={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="last_name"
                >
                  Last Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="last_name"
                  id="last_name"
                  type="text"
                  placeholder="Name"
                  defaultValue={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="email"
                  id="email"
                  type="text"
                  placeholder="Email"
                  defaultValue={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="profile"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                  Select an option
                </label>
                <select
                  id="profile"
                  defaultValue={type}
                  onChange={(e) => setType(e.target.value)}
                  className="bg-gray-50 border text-gray-900 text-sm focus:ring-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Choose a profile</option>
                  <option value={1}>Customer</option>
                  <option value={2}>Delivery Partner</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Password"
                  defaultValue={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="confirmpassword"
                >
                  Confirm Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  name="confirmpassword"
                  id="confirmpassword"
                  type="text"
                  placeholder="Confirm Password"
                  defaultValue={conPass}
                  onChange={(e) => setConPass(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center justify-center pt-2">
                  <button
                    onClick={addUser}
                    className="bg-dark-50 w-96 h-10 text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                  >
                    Submit
                  </button>
                </div>
                <div className="flex items-center justify-center pt-2">
                  <button
                    onClick={() => props.closeAddUser()}
                    className="bg-dark-50 w-96 h-10 text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
