import React from "react";
import { Redirect, Route } from "react-router";

const AdminRoute = ({
  component: Component,
  isLoggedIn,
  userRole,
  ...rest
}) => {
  return isLoggedIn || userRole !== "user" ? (
    <Route {...rest} render={(props) => <Component {...props} />} />
  ) : (
    <Redirect to="/" />
  );
};

export default AdminRoute;
