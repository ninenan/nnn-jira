import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Hello from "./components/Hello";
import DemoHooks from "./components/demo/DemoHooks";
import { Button, Alert, Menu } from "nnn-toy-ui";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button btnType="primary" size="sm">
          test-button
        </Button>
        <Button btnType="danger" size="lg">
          danger-button
        </Button>
        <Alert
          title="alert-title"
          message="alert-message"
          type="warning"
        ></Alert>
        <Menu
          defaultIndex="0"
          onSelect={(index: string) => console.log(index)}
          defaultOpenSubMenus={["2"]}
          mode="horizontal"
        >
          <Menu.Item>test001</Menu.Item>
          <Menu.Item disabled>test002</Menu.Item>
          <Menu.SubMenu title="dropdown">
            <Menu.Item>dropdown01</Menu.Item>
            <Menu.Item>dropdown02</Menu.Item>
          </Menu.SubMenu>
          <Menu.Item>test004</Menu.Item>
          <Menu.SubMenu title="dropdown-04">
            <Menu.Item>dropdown0401</Menu.Item>
            <Menu.Item>dropdown0402</Menu.Item>
          </Menu.SubMenu>
        </Menu>

        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Hello message={"hello world"} />
        <DemoHooks />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
