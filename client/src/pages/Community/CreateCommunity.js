import React from "react";
import axios from "axios";
import { connect } from "react-redux";

import { addNewCommunity } from "../../store/communities/actions";

import { Form, Input, Radio, Button, message } from "antd";
import "../../css/Community.css";

const CreateCommunity = ({ addNewCommunity, error }) => {
  const onFinish = async (vals) => {
    addNewCommunity(vals);
    if (error === null) {
    } else {
      message.success("Community created sucessfully", 2);
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish} className="communityForm">
      <h2 className="name">Create Community</h2>
      <Form.Item
        label="Name:"
        rules={[{ required: true, message: "Please enter name" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Introduction">
        <Input.TextArea />
      </Form.Item>
      {/* add description wala edit textarea */}
      <Form.Item
        label="Rule:"
        name="rule"
        rules={[{ required: true, message: "Please select rule" }]}
      >
        <Radio.Group>
          <Radio.Button value="direct">Direct</Radio.Button>
          <Radio.Button value="permission">Permission</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item>
        <Button type="primary" style={{ width: "7rem" }}>
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};

const mapStateToProps = (state) => {
  return { error: state.community.error };
};

export default connect(mapStateToProps, { addNewCommunity })(CreateCommunity);
