import React, { useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import { connect } from "react-redux";
import { updatePassword } from "../../store/user/actions";

const ChangePassword = ({ updatePassword, error }) => {
  const onFinish = (vals) => {
    updatePassword(vals.oldPassword, vals.newPassword);
  };
  return (
    <div className="container">
      {error !== null ? <Alert message={error} type="error" showIcon /> : null}
      <h1 class="title">Change Password</h1>
      <Form
        name="ChangePasswordForm"
        onFinish={(vals) => onFinish(vals)}
        layout="vertical"
        allowClear
      >
        <Form.Item
          label="Old Password"
          name="oldPassword"
          required
          rules={[
            {
              required: true,
              message: "Please enter your old password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="New Password"
          name="newPassword"
          required
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please enter your new password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("old-password") !== value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Please do not enter old password!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Change Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { error: state.user.error };
};

export default connect(mapStateToProps, { updatePassword })(ChangePassword);
