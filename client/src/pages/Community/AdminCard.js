import { Avatar, Card, List, Tag } from "antd";
import { Link } from "react-router-dom";

const AdminCard = ({ adminMembers, communityId }) => {
  return (
    <Card
      size="small"
      title="Admin Members"
      extra={<Link to={`/community/members/${communityId}`}></Link>}
      className="side-card"
    >
      <List
        itemLayout="horizontal"
        dataSource={adminMembers}
        renderItem={(member) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar src={"http://localhost:8000" + ""} size="large" />
              }
              title={member.name}
              description={<Tag color="#87d068">{member.communityRole}</Tag>}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default AdminCard;
