import React from "react";
import { Route } from "react-router";

import Login from "../../pages/User/LoginPage";

const PublicRoutes = ({ isLoggedIn }) => {
  return (
    <Route path="/" exact render={() => (!isLoggedIn ? <Login /> : null)} />
  );
};

export default PublicRoutes;
