import React from "react";
import UserDetailsForm from "./UserDetailsForm";
import { addNewUser } from "../../store/users/actions";
import { connect } from "react-redux";
import "../../css/User.css";
import { message } from "antd";

const AddNewUserForm = ({ addNewUser }) => {
  return (
    <div className="container">
      <UserDetailsForm
        onFinish={(data) => addNewUser(data)}
        editing={false}
        title="Add User"
        formName="AddNewUser"
      />
    </div>
  );
};
const mapStateToProps = (state) => {
  return { error: state.users.error };
};
export default connect(mapStateToProps, { addNewUser })(AddNewUserForm);
