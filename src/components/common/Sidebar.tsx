"use client";
import { UserOutlined, HomeOutlined } from "@ant-design/icons";
import { Button, Flex, Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Dashboard", "/main", <HomeOutlined />),
  getItem("Users", "/main/user", <UserOutlined />),
];

const Sidebar = () => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const handleClick: MenuProps["onClick"] = (e) => {
    router.push(e.key);
  };

  const handleLogout = ()=>{
    Cookies.remove('jne-cookie');
    router.replace('/login')
  }

  useEffect(() => {
    const clientToken = Cookies.get("jne-cookie");
    if (!clientToken) {
      redirect("/login");
    }
  }, []);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        defaultSelectedKeys={["/main"]}
        mode="inline"
        items={items}
        onClick={handleClick}
      />
      <Flex align="flex-end">
        <Button onClick={handleLogout}>Logout</Button>
      </Flex>
    </Sider>
  );
};

export default Sidebar;
