"use client";
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
    </Sider>
  );
};

export default Sidebar;
