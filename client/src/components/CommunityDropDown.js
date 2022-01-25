import { Link } from "react-router-dom";

import { Menu, Dropdown, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
const CommunityDropDown = ({ communityId, communityRole }) => {
  const menu = (
    <Menu>
      <Menu.Item>
        <Link to={`/community/discussions/${communityId}`}>Discussions</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={`/community/members/${communityId}`}>Members</Link>
      </Menu.Item>
      {communityRole !== "user" ? (
        <Menu.Item>
          <Link to={`/community/manage/${communityId}`}>Manage Community</Link>
        </Menu.Item>
      ) : null}
      <Menu.Item>
        <Link to={`/community/profile/${communityId}`}>Community Profile</Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu} placement="bottomLeft">
      <Button
        className="header-dropdown"
        style={{ backgroundColor: "#91d5ff" }}
        icon={<MenuOutlined />}
      ></Button>
    </Dropdown>
  );
};

export default CommunityDropDown;
