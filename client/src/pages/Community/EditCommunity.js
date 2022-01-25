import React, { useState } from "react";
import { connect } from "react-redux";

import { addNewCommunity } from "../../store/communities/actions";

import { Form, Input, Radio, Button, message, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import "../../css/Community.css";
import { useEffect } from "react";
import { fetchCommunityDetails } from "../../store/community/actions";
import { useParams } from "react-router";

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

const CreateCommunity = ({ updateCommunity, error, communityData }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchCommunityDetails(id);
  });
  const onFinish = (vals) => {
    updateCommunity(vals);
    if (error === "") {
      message.success("Community updated sucessfully", 2);
    } else {
      message.error(error.message);
    }
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      // getBase64(info.file.originFileObj, (imageUrl) =>
      //   this.setState({
      //     imageUrl,
      //     loading: false,
      //   })
      // );
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <Form layout="vertical" onFinish={onFinish} className="communityForm">
      <Form.Item name="image">
        <Upload
          name="image"
          listType="picture-card"
          className="avatar-uploader"
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {communityData.image ? (
            <img
              src={"http://localhost:8000/" + imageUrl}
              alt="avatar"
              style={{ width: "100%" }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
      </Form.Item>
      <Form.Item
        name="name"
        label="Community Name:"
        rules={[{ required: true, message: "Please enter name" }]}
        initialValue={communityData.name}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Rule:"
        name="rule"
        rules={[{ required: true, message: "Please select rule" }]}
        initialValue={communityData.role}
      >
        <Radio.Group>
          <Radio.Button value="direct">Direct</Radio.Button>
          <Radio.Button value="permission">Permission</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name="description"
        label="Introduction"
        initialValue={communityData.description}
      >
        <Input.TextArea />
      </Form.Item>
      {/* add description wala edit textarea */}

      <Form.Item>
        <Button type="primary" style={{ width: "7rem" }}>
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.community.error,
    community: state.community.communityData,
  };
};

export default connect(mapStateToProps, { addNewCommunity })(CreateCommunity);
