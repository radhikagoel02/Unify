import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  fetchCommunities,
  fetchSearchedCommunities,
  updateActivationCommunity,
} from "../../store/communities/actions";

import { Table, Button, Space, Tooltip, Input } from "antd";
import {
  CloseCircleOutlined,
  InfoOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import "../../css/list.css";
const { Search } = Input;

const CommunityList = ({
  communities,
  fetchCommunities,
  fetchSearchedCommunities,
  updateActivationCommunity,
}) => {
  const [filteredinfo, setFilteredInfo] = useState(null);
  const [sortedinfo, setSortedInfo] = useState(null);

  useEffect(() => {
    fetchCommunities();
  }, []);

  const handleChange = (paginations, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const onSearch = (term) => {
    fetchSearchedCommunities(term);
  };

  const handleActivation = (record) => {
    let toDelete = null;
    if (record.isDeleted == 1) toDelete = 0;
    else toDelete = 1;
    const id = record.id;
    updateActivationCommunity(id, toDelete);
  };

  let sortedInfo = sortedinfo || {};
  let filteredInfo = filteredinfo || {};
  const columns = [
    {
      title: "Community Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "Membership Rule",
      dataIndex: "rule",
      width: "18%",
      key: "rule",
      filters: [
        { text: "Direct", value: "direct" },
        { text: "Permission", value: "permission" },
      ],
      filteredValue: filteredInfo.status || null,
      onFilter: (value, record) => record.rule.includes(value),
      sorter: (a, b) => a.rule.localeCompare(b.rule),
      sortOrder: sortedInfo.columnKey === "rule" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "Community Owner",
      dataIndex: "ownerName",
      key: "ownerName",
      sorter: (a, b) => a.owner.localeCompare(b.owner),
      sortOrder: sortedInfo.columnKey === "owner" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "Date Created",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      sortOrder: sortedInfo.columnKey === "createdAt" && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "Community Pic",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Tooltip title="Info">
            <Button
              type="primary"
              icon={<InfoOutlined />}
              style={{ backgroundColor: "#faad14", borderColor: "#faad14" }}
              // onClick={() => record}
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
      <div className="content-container">
        <Space direction="horizontal" className="list-header" align="start">
          <h1 className="title">Community List</h1>
          <Search
            placeholder="Search community"
            onSearch={onSearch}
            enterButton
          />
        </Space>
        <Table
          size="large"
          className="list"
          columns={columns}
          dataSource={communities}
          pagination={{ pageSize: 5 }}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    communities: state.communities.data,
  };
};

export default connect(mapStateToProps, {
  fetchCommunities,
  fetchSearchedCommunities,
  updateActivationCommunity,
})(CommunityList);
