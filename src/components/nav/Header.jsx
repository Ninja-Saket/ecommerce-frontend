import { useState } from "react";
import { App, Menu, Space } from "antd";
import { Link , useNavigate} from "react-router-dom";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
const { SubMenu, Item } = Menu;
import {auth} from '../../firebase'

const Header = () => {
  const [current, setCurrent] = useState("home");
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const logout = () => {
    auth.signOut()
    dispatch({
        type: 'LOGOUT',
        payload : null
    })
    navigate('/')
  }
  const itemsLeft = [
    {
      label: <Link to="/">Home</Link>,
      key: "home",
      icon: <AppstoreOutlined />,
    },
    {
      label: "Username",
      key: "username",
      icon: <SettingOutlined />,
      children: [
        {
          label: "Option 1",
          key: "option1",
        },
        {
          label: "Option 2",
          key: "option2",
        },
        {
          label: "Logout",
          key: "logout",
          icon: <LogoutOutlined />,
          onClick: logout,
        },
      ],
    },
  ];

  const itemsRight = [
    {
      label: <Link to="/login">Login</Link>,
      key: "login",
      icon: <UserOutlined />,
    },
    {
      label: <Link to="/register">Register</Link>,
      key: "register",
      icon: <UserAddOutlined />,
    },
  ];
  const onClick = (e) => {
    console.log("click", e);
    setCurrent(e.key);
  };
  return (
    <div className="container-fluid mx-0 p-0">
      <div className="row mx-0">
        <div className="col-6">
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            key="navmenuleft"
            items={itemsLeft}
          />
        </div>
        <div className="col-6 d-flex justify-content-end">
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            key="navmenuright"
            items={itemsRight}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
