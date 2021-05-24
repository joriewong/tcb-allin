/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { getApp } from "../../tcb";
import "./index.css";
import ProTable from "@ant-design/pro-table";
import { Card, message } from "antd";

export default function Hello() {
  const app = getApp();
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  const getRepos = async () => {
    try {
      const { result } = await app.callFunction({
        name: "helloworld",
        data: {},
      });
      setRepos(result.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      message.error(e.message);
    }
  };

  useEffect(() => {
    getRepos();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Full Name",
      dataIndex: "full_name",
    },
    {
      title: "HTTPS",
      dataIndex: "clone_url",
    },
    {
      title: "SSH",
      dataIndex: "ssh_url",
    },
    {
      title: "Deploy",
      key: "deploy",
      render: (_, record) => [
        <a
          href={`https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=${record.html_url}&branch=${record.default_branch}`}
          target="_blank"
        >
          <img src="https://main.qcloudimg.com/raw/95b6b680ef97026ae10809dbd6516117.svg" />
        </a>,
      ],
    },
  ];

  return (
    <div className="hello">
      <Card>
        <ProTable loading={loading} columns={columns} dataSource={repos} />
      </Card>
    </div>
  );
}
