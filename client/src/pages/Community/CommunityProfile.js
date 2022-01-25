import { useEffect, useState } from "react";

import { Space, Card } from "antd";
import { connect } from "react-redux";
import { useParams } from "react-router";
import AdminCard from "./AdminCard";
import MembersCard from "./MembersCard";
import CommunityHeader from "../../components/CommunityHeader";

import { fetchCommunityDetails } from "../../store/community/actions";

import "../../css/Community.css";

const CommunityProfile = ({ fetchCommunityDetails, community }) => {
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
      <Space
        direction="horizontal"
        size={40}
        align="start"
        className="profile-container"
      >
        <Space direction="vertical" size="middle">
          <MembersCard
            communityId={id}
            allMembers={community.members.all}
            joined={community.user.joined}
            communityRule={community.communityData.rule}
          />
          <AdminCard
            adminMembers={community.members.admin}
            communityId={id}
            joined={community.user.joined}
          />
        </Space>
        <Card
          title="About Community"
          style={{ textAlign: "center", margin: "1rem", width: "43rem" }}
        >
          <p>{community.communityData.description}</p>
        </Card>
      </Space>
    </>
  );
};

const mapToStateProps = (state) => {
  return { community: state.community };
};

export default connect(mapToStateProps, { fetchCommunityDetails })(
  CommunityProfile
);
