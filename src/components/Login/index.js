import React from "react";
import { Modal } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import { GH_AUTH, CLIENT_ID } from "../../constant";

export default () => {
  const { origin, pathname } = new URL(window.location);
  localStorage.clear();

  return Modal.info({
    title: "GitHub Authorization",
    icon: "",
    content: "",
    okText: (
      <a
        href={
          `${GH_AUTH}?` +
          `client_id=${CLIENT_ID}&` +
          `redirect_uri=${origin + pathname}`
        }
      >
        Login with <GithubOutlined />
      </a>
    ),
  });
};
