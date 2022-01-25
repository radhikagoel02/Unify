import { Card, Space, Button, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Profile = ({ user }) => {
  return (
    <div className="profile-frame">
      <div>
        <img
          src={"http://localhost:8000" + ""}
          className="user-image"
          alt="profile image"
        />
        <Button type="primary" className="edit-btn">
          <Link to="/profile/edit">Edit</Link>
        </Button>
      </div>
      <div className="section">
        <Space direction="vertical" style={{ width: "90%" }} size="middle">
          <Row>
            <Col span={11}>
              <Card className="details-card" size="small" title="Email">
                {user.email}
              </Card>
            </Col>
            <Col span={11} offset={1}>
              <Card className="details-card" size="small" title="Gender">
                {user.gender}
              </Card>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Card className="details-card" size="small" title="Name">
                {user.name}
              </Card>
            </Col>
            <Col span={11} offset={1}>
              <Card className="details-card" size="small" title="City">
                {user.city}
              </Card>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Card className="details-card" size="small" title="D.O.B.">
                {user.dob}
              </Card>
            </Col>
            <Col span={11} offset={1}>
              <Card className="details-card" size="small" title="Phone Number">
                {user.phoneNumber}
              </Card>
            </Col>
          </Row>
        </Space>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user.userData };
};

export default connect(mapStateToProps)(Profile);
