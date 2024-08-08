import LoginForm from "@/components/login/LoginForm";
import { Flex } from "antd";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const page = () => {
  return (
    <Flex
      style={{
        backgroundImage: `url('/images/bg-login.jpg')`,
      }}
      className="bg-center bg-cover bg-no-repeat h-screen"
      justify="center"
      align="center"
    >
      <Flex
        className="bg-white w-1/4 rounded-lg pt-12 pb-6 bg-opacity-95"
        align="center"
        vertical
      >
        <LoginForm />
      </Flex>

      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={true}
        theme="colored"
        className="bg-red whitespace-pre-line"
        style={{ width: "30%" }}
      />
    </Flex>
  );
};

export default page;
