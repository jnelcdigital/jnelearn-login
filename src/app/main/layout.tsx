import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "../globals.css";
import { Layout } from "antd";
import Sidebar from "@/components/common/Sidebar";
import { Content } from "antd/es/layout/layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="p-0 m-0">
      <Layout className="h-screen">
        <Sidebar />
        <Layout>
          <Content>
            <AntdRegistry>{children}</AntdRegistry>
          </Content>
        </Layout>
      </Layout>

      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={true}
        theme="colored"
        className="bg-red whitespace-pre-line"
        style={{ width: "30%" }}
      />
    </div>
  );
}
