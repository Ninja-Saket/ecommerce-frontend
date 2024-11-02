import { useState } from "react";
import { Menu, Space } from "antd";
import { Link } from "react-router-dom";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");
  const onClick = (e) => {
    console.log("click", e);
    setCurrent(e.key);
  };
  return (
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
      </Item>
      <SubMenu icon={<SettingOutlined />} title="Username">
        <Item key="option1">Option 1</Item>
        <Item key="option2">Option 2</Item>
      </SubMenu>

      <Item key="login" icon={<UserOutlined />} style={{ marginLeft: "auto" }}>
        <Link to="/login">Login</Link>
      </Item>
      <Item key="register" icon={<UserAddOutlined />}>
        <Link to="/register">Register</Link>
      </Item>
    </Menu>
  );
};

export default Header;
