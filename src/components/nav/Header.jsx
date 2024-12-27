import { useState } from "react";
import { App, Menu, Space } from "antd";
import { Link , useNavigate} from "react-router-dom";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import Search from "../forms/Search";
import {auth} from '../../firebase'

const Header = () => {
  const [current, setCurrent] = useState("home");
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state)=> state.user)
  const logout = () => {
    auth.signOut()
    dispatch({
        type: 'LOGOUT',
        payload : null
    })
    navigate('/')
  }
  const itemsLeftBeforeLogin = [
    {
      label: <Link to="/">Home</Link>,
      key: "home",
      icon: <AppstoreOutlined />,
    },
    {
      label: 'Username',
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

  const itemsLeftAfterLogin = [
    {
      label: <Link to="/">Home</Link>,
      key: "home",
      icon: <AppstoreOutlined />,
    },
    {
      label :<Link to='/shop'>Shop</Link>,
      key : 'shop',
      icon : <ShoppingOutlined/>
    }
  ];

  const itemsRightBeforeLogin = [
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
  ]
  const itemsRightAfterLogin = [
    {
      label : <Search/>,
      key: "search"
    },
    {
      label: 'User',
      key: "username",
      icon: <SettingOutlined />,
      children: [
        {
          label: (user && user.role === "admin") ? <Link to="/admin/dashboard">Dashboard</Link> : <Link to="/user/history">Dashboard</Link>,
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
        }
      ]
    }
  ]
  const onClick = (e) => {
    console.log("click", e);
    setCurrent(e.key);
  };
  return (
    <div className="container-fluid mx-0 p-0">
      <div className="row mx-0" style={{borderBottom : '1px solid rgba(5, 5, 5, 0.06)'}}>
        {!user && (<div className="col-6">
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            key="navmenuleft"
            items={itemsLeftBeforeLogin}
          />
        </div>)}
        {user && (<div className="col-6">
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            key="navmenuleft"
            items={itemsLeftAfterLogin}
          />
        </div>)}
        {!user && (<div className="col-6 d-flex justify-content-end">
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            key="navmenuright"
            items={itemsRightBeforeLogin}
          />
        </div>)}
        {user && (<div className="col-6">
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            key="navmenuright"
            items={itemsRightAfterLogin}
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          />
        </div>)}

      </div>
    </div>
  );
};

export default Header;
