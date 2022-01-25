import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { loginUser } from "../../store/user/actions";

import { Form, Input, Button, Alert } from "antd";
import "../../css/loginpage.css";

const Login = ({ loginUser, err, status }) => {
  let history = useHistory();

  const onFinish = (data) => {
    loginUser(data);
    if (err !== null) {
      if (status === "pending") history.push("/profile/edit");
      history.push("/profile");
    }
  };

  return (
    <div className="container1">
      {err === null ? null : (
        <Alert message={err.message} type="error" showIcon />
      )}
      <h1 className="title1">Login Account</h1>
      <Form name="LoginPage" onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Email"
          name="email"
          required
          rules={[
            {
              required: true,
              message: "Please enter your email",
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          required
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please enter your password!",
            },
          ]}
        >
          <Input placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button id="btn" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { err: state.user.error, status: state.user.userData.status };
};

export default connect(mapStateToProps, { loginUser })(Login);
