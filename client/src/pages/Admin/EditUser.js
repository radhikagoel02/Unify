import React, { useState } from "react";
import { Modal } from "antd";
import { connect } from "react-redux";

import UserDetailsForm from "./UserDetailsForm";

import { updateUser } from "../../store/users/actions";

const EditUser = (props) => {
  const [modalVisible, setModalVisible] = useState(true);
  const onFinish = async (data) => {
    updateUser(data, props.editingUser.id);
    setModalVisible(true);
    props.onEditSucessfull();
  };

  return (
    <Modal
      style={{ top: 20 }}
      visible={modalVisible}
      footer={null}
      onCancel={() => setModalVisible(false)}
    >
      <UserDetailsForm
        onFinish={onFinish}
        editing={true}
        user={props.editingUser}
        title="Edit User"
        formName="EditUser"
      />
    </Modal>
  );
};

export default connect(null, { updateUser })(EditUser);
