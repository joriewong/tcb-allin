/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Repository from "./components/Repository";
import cloudbaseLogo from "./assets/cloudbase.png";
import reactLogo from "./assets/logo.png";
import "./App.css";
import { Modal, Input, Space } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";

function App() {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [load, setLoad] = useState(true);

  useEffect(() => {
    if (username && token) {
      setLoad(false);
      return;
    }

    Modal.confirm({
      title: "GitHub Authorization",
      icon: "",
      content: (
        <Space direction="vertical" style={{ width: "100%" }}>
          <Input
            placeholder="Enter your username"
            prefix={<UserOutlined />}
            onChange={(e) => {
              setUsername(e.target.value);
              localStorage.setItem("username", e.target.value);
            }}
          />
          <Input
            placeholder="Enter your token"
            prefix={<KeyOutlined />}
            onChange={(e) => {
              setToken(e.target.value);
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
        <Repository username={username} token={token} load={load} />
      </main>
    </div>
  );
}

export default App;
