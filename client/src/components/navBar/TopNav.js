import React from "react";

import { Menu, Tag, Avatar } from "antd";
import { ApartmentOutlined } from "@ant-design/icons";
import "../../css/NavBar.css";

const TopNav = (props) => {
  return (
    <Menu mode="horizontal" className="topNav" className="topNav">
      <span id="brand">
        <ApartmentOutlined />
        <h4>Unify</h4>
      </span>
      <span id="user">
        <Tag color="#10239e">{props.userData.role}</Tag>
        <Tag color="#1d39c4">{props.userData.name}</Tag>
        <Avatar size="large" src={"http://localhost:8000" + ""} />
      </span>
    </Menu>
  );
};

export default TopNav;
