import React, { useEffect, useState, useRef } from "react";
import Repository from "./components/Repository";
import cloudbaseLogo from "./assets/cloudbase.png";
import reactLogo from "./assets/logo.png";
import "./App.css";
import { Modal, Input, Space } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";

function App() {
  const ref = useRef({
    username: localStorage.getItem("username"),
    token: localStorage.getItem("token"),
  });
  const [load, setLoad] = useState(true);

  useEffect(() => {
    if (ref.current.username && ref.current.token) {
      setLoad(false);
      return;
    }

    Modal.confirm({
      title: (
        <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer">
          Get GitHub Authorization
        </a>
      ),
      icon: "",
      content: (
        <Space direction="vertical" style={{ width: "100%" }}>
          <Input
            placeholder="Enter your username"
            prefix={<UserOutlined />}
            onChange={(e) => {
              ref.current.username = e.target.value;
              localStorage.setItem("username", e.target.value);
            }}
          />
          <Input
            placeholder="Enter your token"
            prefix={<KeyOutlined />}
            onChange={(e) => {
              ref.current.token = e.target.value;
              localStorage.setItem("token", e.target.value);
            }}
          />
        </Space>
      ),
      onOk: () => {
        setLoad(false);
      },
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img className="logo" alt="CloudBase logo" src={cloudbaseLogo} />
        <img src={reactLogo} className="react-logo" alt="logo" />
      </header>
      <main className="App-main">
        <Repository
          username={ref.current.username}
          token={ref.current.token}
          load={load}
        />
      </main>
    </div>
  );
}

export default App;
