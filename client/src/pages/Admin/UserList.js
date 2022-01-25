import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  fetchUsers,
  updateActivationUser,
  fetchSearchedUsers,
  updateUser,
} from "../../store/users/actions";
import { Table, Button, Space, Tooltip, Input, message } from "antd";
import {
  CloseCircleOutlined,
  EditOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import "../../css/list.css";
import EditUser from "./EditUser";
const { Search } = Input;

const UserList = ({
  fetchUsers,
  fetchSearchedUsers,
  updateActivationUser,
  users,
  userRole,
}) => {
  const [filteredinfo, setFilteredInfo] = useState(null);
  const [sortedinfo, setSortedInfo] = useState(null);
  const [editUser, setEditUser] = useState({});
  let disabled = false;

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (paginations, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const onSearch = (term) => {
    fetchSearchedUsers(term);
  };

  const handleActivation = async (record) => {
    let toDelete = null;
    if (record.isDeleted === 0) {
      toDelete = 1;
    } else {
      toDelete = 0;
    }
    const id = record.id;
    updateActivationUser(id, toDelete);
  };

  const onEditHandle = (record) => {
    setEditUser(record);
  };

  const onEditSucessfull = () => {
    message.success("User Details updated successfully");
  };

  let sortedInfo = sortedinfo || {};
  let filteredInfo = filteredinfo || {};
  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
      sortOrder: sortedInfo.columnKey === "email" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      sorter: (a, b) => a.city.localeCompare(b.city),
      sortOrder: sortedInfo.columnKey === "city" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Confirmed", value: "confirmed" },
        { text: "Pending", value: "pending" },
      ],
      filteredValue: filteredInfo.status || null,
      onFilter: (value, record) => record.status.includes(value),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      filters: [
        { text: "Super Admin", value: "super-admin" },
        { text: "Admin", value: "admin" },
        { text: "User", value: "user" },
      ],
      filteredValue: filteredInfo.role || null,
      onFilter: (value, record) => record.role.includes(value),
      sorter: (a, b) => a.role.localeCompare(b.role),
      sortOrder: sortedInfo.columnKey === "role" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          {(record.role !== "super-admin" && userRole == "admin") ||
          userRole === "super-admin"
            ? (disabled = false)
            : (disabled = true)}
          <Tooltip title="edit">
            <Button
              type="primary"
              disabled={disabled}
              icon={<EditOutlined />}
              onClick={() => onEditHandle(record)}
              style={{ backgroundColor: "#faad14", borderColor: "#faad14" }}
            />
          </Tooltip>
          {record.isDeleted === 0 ? (
            <Tooltip title="deactivate">
              <Button
                type="danger"
                icon={<CloseCircleOutlined />}
                onClick={() => handleActivation(record)}
              />
            </Tooltip>
          ) : (
            <Tooltip title="activate">
              <Button
                type="primary"
                icon={<CheckCircleOutlined />}
                onClick={() => handleActivation(record)}
                style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
              />
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];
  return (
    <>
      {Object.keys(editUser).length !== 0 ? (
        <EditUser
          editingUser={editUser}
          userRole={userRole}
          onEditSucessfull={() => onEditSucessfull()}
        />
      ) : null}
      <div className="content-container">
        <Space direction="horizontal" className="list-header" align="start">
          <h1 className="title">User List</h1>
          <Search
            placeholder="Search user email"
            onSearch={onSearch}
            enterButton
          />
        </Space>
        <Table
          className="list"
          columns={columns}
          dataSource={users}
          pagination={{ pageSize: 5 }}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users.data,
    userRole: state.user.userData.role,
    token: state.user.token,
  };
};

export default connect(mapStateToProps, {
  fetchUsers,
  updateActivationUser,
  fetchSearchedUsers,
  updateUser,
})(UserList);
