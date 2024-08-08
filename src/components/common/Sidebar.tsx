"use client";
import {
  UserOutlined,
  HomeOutlined,
  LogoutOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { Button, Flex, Menu, MenuProps, Modal } from "antd";
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
  getItem("Logut", "logout", <LogoutOutlined />),
];

const Sidebar = () => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const { confirm } = Modal;

  const handleClick: MenuProps["onClick"] = (e) => {
    if (e.key !== "logout") {
      router.push(e.key);
      return;
    }

    confirm({
      title: "Are you sure want to logout?",
      icon: <ExclamationCircleFilled />,
      onOk() {
        handleLogout();
      },
    });
  };

  const handleLogout = () => {
    Cookies.remove("jne-cookie");
    router.replace("/login");
  };

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
      className="relative"
    >
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
