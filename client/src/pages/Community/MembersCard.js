import { Avatar, Space, Card, Button } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  joinCommunity,
  leaveCommunity,
} from "../../store/userCommunities/actions";

const MembersCard = ({
  communityId,
  allMembers,
  joined,
  communityRule,
  joinCommunity,
  leaveCommunity,
}) => {
  return (
    <>
      <Card
        size="small"
        title="Members"
        extra={
          <Link to={`/community/members/${communityId}`}>All Members</Link>
        }
        className="side-card"
      >
        {joined === true ? (
          <Space direction="vertical">
            <Space size="middle">
              {allMembers.map((member, index) => {
                if (index < 4) {
                  return <Avatar src={"http://localhost:8000" + ""} />;
                }
              })}
            </Space>
            <div className="members-section">
              <Link
                to={`/community/members/${communityId}`}
              >{`${allMembers.length} Members`}</Link>
              <span
                style={{ color: "#1890ff" }}
                onClick={() => leaveCommunity(communityId)}
              >
                Leave Community
              </span>
            </div>
          </Space>
        ) : (
          <Button type="primary" onClick={() => joinCommunity(communityId)}>
            {communityRule === "direct" ? "Join" : "Request to Join"}
          </Button>
        )}
      </Card>
    </>
  );
};
export default connect(null, { joinCommunity, leaveCommunity })(MembersCard);
