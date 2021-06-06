import React from "react";
import { getApp } from "../../tcb";
import "./index.css";
import ProTable from "@ant-design/pro-table";
import { Card, Tag, message } from "antd";
import login from "../Login";

const colors = [
  "magenta",
  "red",
  "volcano",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "geekblue",
  "purple",
];

export default function Repository({ load }) {
  const app = getApp();

  const request = async (params, sort, filter) => {
    const { pageSize, current } = params;
    const token = localStorage.getItem("token");
    const { public_repos: total } = JSON.parse(localStorage.getItem("user"));

    try {
      const { result: repositories } = await app.callFunction({
        name: "list-repositories-by-user",
        data: {
          pageSize,
          current,
          token,
        },
      });

      const success = repositories.message === "ok";
      if (!success) {
        login();
        return;
      }

      return {
        data: repositories.data,
        success,
        total,
      };
    } catch (error) {
      message.error(error);
      login();
    }
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
      title: "Language",
      dataIndex: "language",
      width: 100,
      render: (dom) => {
        const i = Math.round(Math.random() * 10);
        return <Tag color={colors[i]}>{dom}</Tag>;
      },
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
      title: "Description",
      dataIndex: "description",
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
          rel="noopener noreferrer"
        >
          <img
            src="https://main.qcloudimg.com/raw/95b6b680ef97026ae10809dbd6516117.svg"
            alt=""
          />
        </a>,
      ],
    },
  ];

  return (
    <div className="hello">
      <Card>
        {load ? (
          ""
        ) : (
          <ProTable rowKey="id" columns={columns} request={request} />
        )}
      </Card>
    </div>
  );
}
