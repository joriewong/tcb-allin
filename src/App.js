import React, { useEffect, useState } from "react";
import Repository from "./components/Repository";
import cloudbaseLogo from "./assets/cloudbase.png";
import reactLogo from "./assets/logo.png";
import "./App.css";
import { message } from "antd";
import { getApp } from "./tcb";
import qs from "query-string";
import login from "./components/Login";

function App() {
  const [load, setLoad] = useState(true);
  const { searchParams } = new URL(window.location);
  const app = getApp();

  useEffect(() => {
    if (localStorage.getItem("user") && localStorage.getItem("token")) {
      setLoad(false);
      return;
    }

    const code = searchParams.get("code");
    if (code) {
      app
        .callFunction({
          name: "oauth",
          data: {
            code,
          },
        })
        .then(({ result }) => {
          if (result.message === "ok") {
            const { access_token } = qs.parse(result.data);
            localStorage.setItem("token", access_token);

            app
              .callFunction({
                name: "user",
                data: { token: access_token },
              })
              .then(({ result }) => {
                if (result.message === "ok") {
                  localStorage.setItem("user", JSON.stringify(result.data));
                  setLoad(false);
                } else {
                  login();
                }
              })
              .catch((error) => {
                login();
                message.error(error);
              });
          } else {
            login();
          }
        })
        .catch((error) => {
          login();
          message.error(error);
        });
    } else {
      login();
    }
  }, [app, searchParams]);

  return (
    <div className="App">
      <header className="App-header">
        <img className="logo" alt="CloudBase logo" src={cloudbaseLogo} />
        <img src={reactLogo} className="react-logo" alt="logo" />
      </header>
      <main className="App-main">
        <Repository load={load} />
      </main>
    </div>
  );
}

export default App;
