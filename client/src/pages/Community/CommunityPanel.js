import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import {
  fetchJoinedCommunities,
  cancelRequest,
} from "../../store/userCommunities/actions";

import { Card, Button, List, Avatar, Tag, Menu, Tooltip } from "antd";
import {
  PlusSquareOutlined,
  SettingFilled,
  CloseOutlined,
  TeamOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import "../../css/Community.css";

const CommunityPanel = ({
  cancelRequest,
  fetchJoinedCommunities,
  communities,
}) => {
  let history = useHistory();
  useEffect(() => {
    fetchJoinedCommunities();
  }, []);

  return (
    <>
      <Menu
        mode="horizontal"
        style={{ backgroundColor: "#05e8ba" }}
        selectedKeys={"communityPanel"}
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
      <Card
        title="My Communities"
        extra={
          <Button
            type="primary"
            icon={<PlusSquareOutlined />}
            onClick={() => history.push("/community/create")}
          >
            Create
          </Button>
        }
        className="panel"
      >
        <List
          itemLayout="horizontal"
          dataSource={communities}
          pagination={{ pageSize: 4 }}
          renderItem={(community) => (
            <List.Item
              actions={[
                community.type === "owned" ? (
                  <Button
                    shape="circle"
                    size="large"
                    style={{ backgroundColor: "#52c41a" }}
                    onClick={() =>
                      history.push(`/community/manage/${community.id}`)
                    }
                    icon={<SettingFilled style={{ color: "white" }} />}
                  ></Button>
                ) : community.type === "requested" ? (
                  //iska doubt dekhna h ki press karke yeh query kyun nhi bna rha h
                  <Tooltip placement="bottom" title={"Cancel Request"}><Button
                    shape="circle"
                    size="large"
                    danger
                    onClick={() => cancelRequest(community.id)}
                    style={{ backgroundColor: "#ff4d4f" }}
                    icon={<CloseOutlined style={{ color: "white" }} />}
                  ></Button></Tooltip>
                ) : null,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    size="large"
                    shape="square"
                    src={"http://localhost:8000" + ""}
                  />
                }
                title={
                  <Link to={`/community/profile/${community.id}`}>
                    {community.name}
                  </Link>
                }
              />
              <span>
                {community.type === "owned" ? (
                  <Link to={`/community/manage/${community.id}`}>Requests</Link>
                ) : community.type === "joined" ? (
                  <Link to={`/community/members/${community.id}`}>Members</Link>
                ) : (
                  <Tag color="#cf1322">Requested</Tag>
                )}
              </span>
            </List.Item>
          )}
        />
      </Card>
    </>
  );
};

const mapStateToProps = (state) => {
  return { communities: state.userCommunities.joinedCommunities };
};

export default connect(mapStateToProps, {
  fetchJoinedCommunities,
  cancelRequest,
})(CommunityPanel);
