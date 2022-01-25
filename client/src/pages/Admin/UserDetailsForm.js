import React from "react";
import { Form, Input, Select, Button } from "antd";
import { PlusSquareOutlined, UserOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    sm: { span: 24 },
    md: { span: 7, offset: 1 },
    lg: { span: 6, offset: 1 },
  },
  wrapperCol: {
    sm: { span: 24 },
    md: { span: 14 },
    lg: { span: 16, offset: 0.5 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    sm: {
      span: 24,
      offset: 0,
    },
    md: {
      offset: 6,
    },
  },
};

const UserDetailsForm = (props) => {
  return (
    <div>
      <h1 className="title">
        {props.title}
        <UserOutlined className="userIcon" />
      </h1>
      <Form
        {...formItemLayout}
        name={props.formName}
        scrollToFirstError
        onFinish={(data) => {
          props.onFinish(data);
        }}
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            { required: true, message: "Please input the email!" },
          ]}
          initialValue={props.user !== undefined ? props.user.email : null}
        >
          <Input />
        </Form.Item>

        {props.editing === false ? (
          <Form.Item
            name="password"
            label="Password"
            hasFeedback
            rules={[{ required: true, message: "Please input the password!" }]}
          >
            <Input.Password autoComplete="true" />
          </Form.Item>
        ) : null}

        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[
            { required: true, message: "Please input the phone number!" },
            { type: "string", min: 10, max: 10 },
          ]}
          initialValue={
            props.user !== undefined ? props.user.phoneNumber : null
          }
        >
          <Input style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="city"
          label="City"
          rules={[{ required: true, message: "Please input the city!" }]}
          initialValue={props.user !== undefined ? props.user.city : null}
        >
          <Input style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: "Please select the role!" }]}
          initialValue={props.user !== undefined ? props.user.role : null}
        >
          <Select placeholder="Select the Role">
            <Option value="user">User</Option>
            <Option value="admin">Admin</Option>
            <Option
              value="super-admin"
              disabled={props.userRole === "admin" ? true : false}
            >
              Super Admin
            </Option>
          </Select>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            icon={<PlusSquareOutlined />}
          >
            {props.title}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { userRole: state.user.userData.role };
};

export default connect(mapStateToProps)(UserDetailsForm);
