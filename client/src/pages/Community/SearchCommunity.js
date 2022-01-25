import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  fetchNotJoinedCommunities,
  joinCommunity,
} from "../../store/userCommunities/actions";

import { Button, List, Avatar, Menu } from "antd";
import { TeamOutlined, SearchOutlined } from "@ant-design/icons";
import "../../css/Community.css";

const SearchCommunity = ({
  fetchNotJoinedCommunities,
  communities,
  joinCommunity,
}) => {
  useEffect(() => {
    fetchNotJoinedCommunities();
  }, []);

  const join = (communityId) => {
    joinCommunity(communityId);
  };

  return (
    <>
      <Menu
        mode="horizontal"
        style={{ backgroundColor: "#05e8ba" }}
        selectedKeys={"searchCommunities"}
      >
        <Menu.Item key="communityPanel" icon={<TeamOutlined />}>
          My Communities
          <Link to="/community/communitypanel"></Link>
        </Menu.Item>
        <Menu.Item key="searchCommunities" icon={<SearchOutlined />}>
          Search Communities
          <Link to="/community/search"></Link>
        </Menu.Item>
      </Menu>
      <List
        className="frame"
        itemLayout="horizontal"
        size="large"
        pagination={{ pageSize: 2 }}
        dataSource={communities}
        renderItem={(community) => (
          <List.Item
            className="list-item"
            actions={[
              community.rule === "direct" ? (
                <Button
                  type="primary"
                  size="middle"
                  onClick={() => join(community.id)}
                >
                  Join
                </Button>
              ) : (
                <Button
                  type="primary"
                  size="middle"
                  onClick={() => join(community.id)}
                >
                  Request To Join
                </Button>
              ),
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  className="avatar"
                  size="large"
                  shape="square"
                  src={"http://localhost:8000" + ""}
                />
              }
              title={
                <Link to={`/communityprofile/${community.id}`}>
                  {community.name}
                </Link>
              }
              description={`${community.members} Members`}
            />
            {community.description}
          </List.Item>
        )}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return { communities: state.userCommunities.notJoinedCommunities };
};

export default connect(mapStateToProps, {
  fetchNotJoinedCommunities,
  joinCommunity,
})(SearchCommunity);
