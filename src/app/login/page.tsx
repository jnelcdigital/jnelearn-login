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
        style={{ backgroundColor: "white", width: "30%", borderRadius: "8px" }}
        align="center"
        vertical
      >
        <Image
          src={"/images/banner-login.jpg"}
          alt="banner login"
          width={100}
          height={100}
          style={{
            width: "100%",
            height: "60%",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
          }}
        />

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
