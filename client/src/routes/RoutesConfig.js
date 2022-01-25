import React from "react";
import { BrowserRouter } from "react-router-dom";

import { connect } from "react-redux";
import PrivateRoutes from "./PrivateRoutes/index";
import PublicRoutes from "./PublicRoutes/index";

function RoutesConfig(props) {
  return (
    <div>
      <BrowserRouter>
        <PrivateRoutes
          isLoggedIn={props.isLoggedIn}
          userData={props.userData}
        />
        <PublicRoutes isLoggedIn={props.isLoggedIn} />
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userData: state.user.userData,
  };
};

export default connect(mapStateToProps)(RoutesConfig);
