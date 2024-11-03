import { useState } from "react";
import { App, Menu, Space } from "antd";
import { Link } from "react-router-dom";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
const { SubMenu, Item } = Menu;

const itemsLeft = [
    {
        label: <Link to='/'>Home</Link>,
        key : 'home',
        icon : <AppstoreOutlined/>
    },
    {
        label : 'Username',
        key : 'username',
        icon : <SettingOutlined/>,
        children : [
            {
                label : 'Option 1',
                key : 'option1'
            },
            {
                label : 'Option 2',
                key : 'option2'
            }
        ]
    }
]

const itemsRight = [
    {
        label : <Link to='/login'>Login</Link>,
        key : 'login',
        icon : <UserOutlined/>
    },
    {
        label : <Link to='/register'>Register</Link>,
        key : 'register',
        icon : <UserAddOutlined/>
    }
]

const Header = () => {
  const [current, setCurrent] = useState("home");
  const onClick = (e) => {
    console.log("click", e);
    setCurrent(e.key);
  };
  return (
    <div className="container-fluid mx-0 p-0">
        <div className="row mx-0">
            <div className="col-6"><Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" key="navmenuleft" items={itemsLeft}/></div>
            <div className="col-6 d-flex justify-content-end"><Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" key="navmenuright" items={itemsRight}/></div>
        </div>
    </div>
  );
};

export default Header;
