import React, { useState } from "react";
import { Redirect, Route } from "react-router";

import SideNavBar from "../../components/navBar/sideNavBar";
import UserList from "../../pages/Admin/UserList";
import CommunityList from "../../pages/Admin/CommunityList";
import TopNav from "../../components/navBar/TopNav";
import ChangePassword from "../../pages/User/ChangePassword";
import AddUserForm from "../../pages/Admin/AddUserForm";
import CommunityPanel from "../../pages/Community/CommunityPanel";
import CommunityMembers from "../../pages/Community/CommunityMember";
import ManageCommunity from "../../pages/Community/ManageCommunity";

import AdminRoute from "./AdminRoute";

import { Layout } from "antd";
import CreateCommunity from "../../pages/Community/CreateCommunity";
import SearchCommunity from "../../pages/Community/SearchCommunity";
import CommunityProfile from "../../pages/Community/CommunityProfile";
import Profile from "../../pages/User/Profile";
import EditProfile from "../../pages/User/EditProfile";
const { Header, Sider, Content } = Layout;

const PrivateRoutes = (props) => {
  const [collapse, setCollapse] = useState(false);

  const onCollapse = () => {
    setCollapse(!collapse);
  };
  if (!props.isLoggedIn) {
    return <Redirect to="/" />;
  }
  return (
    <Layout>
      <Header className="header">
        <TopNav userData={props.userData} />
      </Header>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={collapse}>
          <SideNavBar collapsed={collapse} toggleCollapsed={onCollapse} />
        </Sider>
        <Content className="content">
          <AdminRoute
            component={UserList}
            isLoggedIn={props.isLoggedIn}
            userRole={props.userData.role}
            path="/admin/userlist"
            exact
          />
          <AdminRoute
            component={CommunityList}
            isLoggedIn={props.isLoggedIn}
            userRole={props.userData.role}
            path="/admin/communityList"
            exact
          />
          <AdminRoute
            component={AddUserForm}
            isLoggedIn={props.isLoggedIn}
            userRole={props.userData.role}
            path="/admin/addUser"
            exact
          />
          <Route component={EditProfile} path="/profile/edit" exact />
          {props.userData.status === "confirmed" ? (
            <Route component={Profile} path="/profile" exact />
          ) : (
            <Redirect to="/profile/edit" />
          )}
          <Route
            component={CommunityPanel}
            path="/community/communityPanel"
            exact
          />
          <Route component={SearchCommunity} path="/community/search" exact />
          <Route component={CreateCommunity} path="/community/create" exact />
          <Route component={CommunityMembers} path="/community/members/:id" />
          <Route
            component={CommunityProfile}
            path="/community/profile/:id"
            exact
          />
          <Route
            component={ManageCommunity}
            path="/community/manage/:id"
            exact
          />
          <Route component={ChangePassword} path="/changePassword" exact />
        </Content>
      </Layout>
    </Layout>
  );
};

export default PrivateRoutes;
