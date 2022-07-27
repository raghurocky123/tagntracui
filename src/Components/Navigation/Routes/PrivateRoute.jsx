import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return <Navigate to="/" />;
};

export default PrivateRoute;
