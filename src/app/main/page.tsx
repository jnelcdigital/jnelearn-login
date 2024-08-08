"use client";
import { Flex } from "antd";
import { useEffect, useState } from "react";

const Main = () => {
  const [namaCabang, setNamaCabang] = useState("");
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") ?? "");
    setNamaCabang(user.nama_cabang);
  }, []);
  return (
    <Flex className="h-full p-8">
      <h1 className="text-2xl font-semibold">Welcome {namaCabang} </h1>
    </Flex>
  );
};

export default Main;
