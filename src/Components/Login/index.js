import React, { useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  let navigate = useNavigate();

  const handlesubmit = async (event) => {
    event.preventDefault();

    if (email.trim() === "" || email === null || email === undefined) {
      swal("Warning", "Please enter valid email", "warning");
      return;
    } else if (pass.trim() === "" || pass === null || pass === undefined) {
      swal("Warning", "Please enter valid password", "warning");
      return;
    }

    await axios({
      method: "POST",
      url: `${config.url}/login`,
      data: { email, password: pass },
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(function (response) {
        console.log(response);
        if (response.data.login === "Successfull") {
          localStorage.setItem("jwt", response.data.token);
          let userReqObj = {
            user_id: response.data.userObj.user_id,
            first_name: response.data.userObj.first_name,
            last_name: response.data.userObj.last_name,
            email: response.data.userObj.email,
            user_type: response.data.userObj.user_type,
            user_status: response.data.userObj.user_status,
          };
          localStorage.setItem("loggedInUserId", userReqObj.user_id);
          swal("Success", "Login Successfull", "success");
          if (response.data.userObj.user_type === 0) {
            navigate("/home");
          } else if (response.data.userObj.user_type === 1) {
            navigate("/orders");
          } else if (response.data.userObj.user_type === 2) {
            navigate("/deliveries");
          } else {
            return;
          }
        } else {
          swal("Failure", "Incorrect email or password", "error");
        }
      })
      .catch(function (error) {
        console.log(error);
        swal("Failure", "Incorrect email or password", "error");
      });
  };

  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color,
        backgroundColor: color,
        height: 3,
      }}
    />
  );
  return (
    <>
      <div className="bg-white dark:bg-gray-900">
        <div className="flex justify-center h-screen">
          <div className="hidden bg-cover lg:block lg:w-1/4">
            <div className="flex items-center h-full px-20 bg-blue-50">
              <img className="w-64" src="logo/LOGOWHITE.png" alt="" />
            </div>
          </div>

          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-3/4">
            <div className="flex-1">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white underline">
                  Welcome back!
                </h2>
              </div>

              <div className="mt-8">
                <form
                  onSubmit={handlesubmit}
                  className="bg-white  px-8 pt-6 pb-8 mb-4"
                >
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
                  <div className="mb-6">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      defaultValue={pass}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      name="password"
                      id="password"
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setPass(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center">
                    <div className="">
                      <button className="bg-dark-50 w-96 h-10 text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                        LOGIN
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
