import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-dom";
import { useParams } from "react-router-dom";
import { Tabs, Tag, List, Avatar } from "antd";
import CommunityHeader from "../../components/CommunityHeader";
import "../../css/Community.css";
const { TabPane } = Tabs;

const CommunityMembers = ({ community }) => {
  const { id } = useParams();
  return (
    <>
      <CommunityHeader
        communityId={id}
        communityRole={community.user.communityRole}
        community={community.communityData}
        joined={community.user.joined}
      />
      <Tabs className="tabs" defaultActiveKey="admins" centered>
        <TabPane tab="Admins" key="admins">
          <List
            itemLayout="horizontal"
            dataSource={community.members.admin}
            renderItem={(member) => (
              <List.Item className="member">
                <List.Item.Meta
                  avatar={
                    <Avatar
                      className="member-avatar"
                      size="large"
                      src={"http://localhost:8000" + ""}
                    />
                  }
                  title={
                    // <Link to="/">
                    member.name
                    // {member.name}
                    // { {member.comunityRole === "owner" ? (
                    //    <Tag color="#ffa940">Owner</Tag>
                    //  ) : null} }
                    // </Link>
                  }
                />
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane tab="Users" key="users">
          <List
            itemLayout="horizontal"
            dataSource={community.members.user}
            renderItem={(member) => (
              <List.Item className="member">
                <List.Item.Meta
                  avatar={
                    <Avatar
                      className="member-avatar"
                      size="large"
                      src={"http://localhost:8000" + ""}
                    />
                  }
                  title={
                    // <Link to="">
                    // {member.name}

                    member.name
                    // </Link>
                  }
                />
              </List.Item>
            )}
          />
        </TabPane>
      </Tabs>
    </>
  );
};
const mapToStateProps = (state) => {
  return {
    community: state.community,
  };
};
export default connect(mapToStateProps)(CommunityMembers);
