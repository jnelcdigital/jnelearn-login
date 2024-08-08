import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Learning Center",
  description: "JNE Learning Center",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/images/jne-tab.png" />
      </head>
      <body className={inter.className} style={{ padding: 0, margin: 0 }}>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
