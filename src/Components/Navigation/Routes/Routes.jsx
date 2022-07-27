import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../../Login";
import Home from "../../Home";
import PrivateRoute from "./PrivateRoute";
import Orders from "../../Orders";
import Deliveries from "../../Deliveries";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/home" exact element={<Home />} />
        <Route path="/orders" exact element={<Orders />} />
        <Route path="/deliveries" exact element={<Deliveries />} />
        {/* <Route path="/home" exact element={<PrivateRoute />}>
          <Route path="/home" exact element={<Home />} />
        </Route> */}
      </Routes>
    </>
  );
}
