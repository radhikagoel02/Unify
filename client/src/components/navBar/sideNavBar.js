import React, { useState } from "react";
import { updateUserMode } from "../../store/user/actions";
import { logOut } from "../../store/user/actions";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { Button, Menu, Modal } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  IdcardOutlined,
  LogoutOutlined,
  LockOutlined,
  BarsOutlined,
  ProfileOutlined,
  UserAddOutlined,
  InteractionOutlined,
  TeamOutlined,
} from "@ant-design/icons";

function SideNavBar(props) {
  const [isSwitchModalVisible, setIsSwitchModalVisible] = useState(false);
  const [isLogOutModalVisible, setIsLogOutModalVisible] = useState(false);
  let history = useHistory();
  let switchTo = "";
  if (props.userMode === "admin") switchTo = "user";
  else switchTo = "admin";
  let disable = false;
  if (props.user.status === "pending") disable = true;
  else disable = false;
  return (
    <>
      <Modal
        title={`Switch as ${switchTo}`}
        centered
        visible={isSwitchModalVisible}
        onOk={() => {
          setIsSwitchModalVisible(false);
          props.updateUserMode(switchTo);
          history.push("/profile");
        }}
        onCancel={() => {
          setIsSwitchModalVisible(false);
        }}
      >
        <p>Do you really want to switch the state...</p>
      </Modal>
      <Modal
        title="LogOut"
        centered
        visible={isLogOutModalVisible}
        onOk={() => {
          props.logOut();
          setIsLogOutModalVisible(false);
          history.push("/");
        }}
        onCancel={() => {
          setIsLogOutModalVisible(false);
        }}
      >
        <p>Do you really want to logout?</p>
      </Modal>
      <Menu defaultSelectedKeys={["profile"]} className="sideNav">
        <Button className="btn-collapse" onClick={props.toggleCollapsed}>
          {props.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Menu.Item key="profile" icon={<IdcardOutlined />}>
          Profile
          <Link to="/profile"></Link>
        </Menu.Item>
        {props.userMode === "admin" ? (
          <>
            <Menu.Item
              key="add-user"
              icon={<UserAddOutlined />}
              disabled={disable}
            >
              Add User
              <Link to="/admin/addUser"></Link>
            </Menu.Item>
            <Menu.Item
              key="user-list"
              icon={<BarsOutlined />}
              disabled={disable}
            >
              All Users
              <Link to="/admin/userList"></Link>
            </Menu.Item>
            <Menu.Item
              key="community-list"
              icon={<ProfileOutlined />}
              disabled={disable}
            >
              All Communities
              <Link to="/admin/communityList"></Link>
            </Menu.Item>
          </>
        ) : (
          <Menu.Item
            key="my-communities"
            icon={<TeamOutlined />}
            disabled={disable}
          >
            My Communities
            <Link to="/community/communityPanel"></Link>
          </Menu.Item>
        )}
        {props.user.role !== "user" ? (
          <Menu.Item
            key="switch"
            icon={<InteractionOutlined />}
            onClick={() => {
              setIsSwitchModalVisible(true);
            }}
            disabled={disable}
          >
            {`Switch as ${switchTo[0].toUpperCase() + switchTo.slice(1)}`}
          </Menu.Item>
        ) : null}
        <Menu.Item
          key="change-password"
          icon={<LockOutlined />}
          disabled={disable}
        >
          Change Password
          <Link to="/changePassword"></Link>
        </Menu.Item>
        <Menu.Item
          key="logout"
          icon={<LogoutOutlined />}
          disabled={disable}
          onClick={() => setIsLogOutModalVisible(true)}
        >
          LogOut
        </Menu.Item>
      </Menu>
    </>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user.userData, userMode: state.user.userMode };
};

export default connect(mapStateToProps, { updateUserMode, logOut })(SideNavBar);
