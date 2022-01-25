import { useEffect } from "react";
import { useParams } from "react-router";
import { List, Avatar, Button, Tabs } from "antd";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import CommunityHeader from "../../components/CommunityHeader";
import "../../css/Community.css";

import {
  acceptUserRequest,
  demoteUser,
  fetchCommunityDetails,
  promoteUser,
  rejectUserRequest,
  removeUser,
} from "../../store/community/actions";

import {
  CloseCircleTwoTone,
  UpCircleTwoTone,
  DownCircleTwoTone,
} from "@ant-design/icons";
const { TabPane } = Tabs;

const ManageCommunity = ({
  fetchCommunityDetails,
  community,
  acceptUserRequest,
  rejectUserRequest,
  promoteUser,
  removeUser,
  demoteUser,
}) => {
  const { id } = useParams();
  useEffect(() => {
    fetchCommunityDetails(id);
  }, []);

  return (
    <>
      <CommunityHeader
        communityId={id}
        communityRole={community.user.communityRole}
        community={community.communityData}
        joined={community.user.joined}
      />
      <div className="manage-frame">
        <div className="list-header">
          <h2>Manage Community</h2>
          <Link to={`/community/edit/${id}`}>Edit Community</Link>
        </div>
        <Tabs tabPosition="left">
          <TabPane tab={`Users (${community.members.user.length})`} key="users">
            <List
              itemLayout="horizontal"
              pagination={{
                pageSize: 4,
              }}
              dataSource={community.members.user}
              renderItem={(user) => (
                <List.Item
                  actions={[
                    community.user.communityRole === "owner" ? (
                      <Button
                        icon={<UpCircleTwoTone />}
                        onClick={() => promoteUser(user.id)}
                      ></Button>
                    ) : null,
                    <Button
                      icon={<CloseCircleTwoTone />}
                      onClick={() => removeUser(user.id, user.communityRole)}
                    ></Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar size="large" src={"http://localhost:8000" + ""} />
                    }
                    title={user.name}
                  />
                </List.Item>
              )}
            />
          </TabPane>
          <TabPane
            tab={`Admins (${community.members.admin.length})`}
            key="admins"
          >
            <List
              itemLayout="horizontal"
              pagination={{
                pageSize: 4,
              }}
              dataSource={community.members.admin}
              renderItem={(user) => (
                <List.Item
                  actions={
                    community.user.communityRole === "owner" &&
                    user.communityRole !== "owner"
                      ? [
                          <Button
                            icon={<DownCircleTwoTone />}
                            onClick={() => demoteUser(user.id)}
                          ></Button>,
                          <Button
                            icon={<CloseCircleTwoTone />}
                            onClick={() =>
                              removeUser(user.id, user.communityRole)
                            }
                          ></Button>,
                        ]
                      : null
                  }
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar size="large" src={"http://localhost:8000" + ""} />
                    }
                    title={user.name}
                  />
                </List.Item>
              )}
            />
          </TabPane>
          {community.user.communityRole === "owner" ? (
            <TabPane
              tab={`Requests (${community.members.requests.length})`}
              key="requests"
            >
              <List
                itemLayout="horizontal"
                pagination={{
                  pageSize: 4,
                }}
                dataSource={community.members.requests}
                renderItem={(requestedUser) => (
                  <List.Item
                    actions={[
                      <Button
                        onClick={() => acceptUserRequest(requestedUser.id)}
                        style={{
                          backgroundColor: "#52c41a",
                          borderColor: "#52c41a",
                        }}
                      >
                        Accept
                      </Button>,
                      <Button
                        type="primary"
                        danger
                        onClick={() => rejectUserRequest(requestedUser.id)}
                      >
                        Reject
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          size="large"
                          src={"http://localhost:8000" + ""}
                        />
                      }
                      title={requestedUser.name}
                    />
                  </List.Item>
                )}
              />
            </TabPane>
          ) : null}
        </Tabs>
      </div>
    </>
  );
};

const mapToStateProps = (state) => {
  return { community: state.community };
};

export default connect(mapToStateProps, {
  fetchCommunityDetails,
  promoteUser,
  demoteUser,
  acceptUserRequest,
  rejectUserRequest,
  removeUser,
})(ManageCommunity);
