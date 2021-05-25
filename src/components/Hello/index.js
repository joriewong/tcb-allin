import React from "react";
import { getApp } from "../../tcb";
import "./index.css";
import ProTable from "@ant-design/pro-table";
import { Card } from "antd";

export default function Hello() {
  const app = getApp();

  const request = async (params, sort, filter) => {
    const { pageSize, current } = params;
    const { result: user } = await app.callFunction({
      name: "user",
    });
    const { result: repositories } = await app.callFunction({
      name: "list-repositories-by-user",
      data: {
        pageSize,
        current,
      },
    });

    return {
      data: repositories.data,
      success: repositories.message === "ok",
      total: user.data.public_repos,
    };
  };

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
      key: "option",
      valueType: "option",
      render: (_, record) => [
        <a
          key={record.id}
          href={`https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=${record.html_url}&branch=${record.default_branch}`}
          target="_blank"
          rel="noreferrer"
        >
          <img src="https://main.qcloudimg.com/raw/95b6b680ef97026ae10809dbd6516117.svg" alt="" />
        </a>,
      ],
    },
  ];

  return (
    <div className="hello">
      <Card>
        <ProTable rowKey="id" columns={columns} request={request} />
      </Card>
    </div>
  );
}
