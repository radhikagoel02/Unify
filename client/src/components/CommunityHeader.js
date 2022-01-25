import CommunityDropDown from "./CommunityDropDown";

const CommunityHeader = ({ communityId, community, communityRole, joined }) => {
  return (
    <>
      <div className="community-header-div1"></div>
      <div className="community-header-div2">
        <h3 className="header-name">{community.name}</h3>
        {joined ? (
          <CommunityDropDown
            communityId={communityId}
            communityRole={communityRole}
          />
        ) : null}
      </div>
      <img src={"http://localhost:8000" + ""} className="header-image" />
    </>
  );
};

export default CommunityHeader;
