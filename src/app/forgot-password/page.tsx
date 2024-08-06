import ForgotPasswordForm from "@/components/forgot-password/ForgotPasswordForm";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Card, Flex } from "antd";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  return (
    <Flex
      style={{
        backgroundImage: `url('/images/bg-login.jpg')`,
      }}
      className="bg-center bg-cover bg-no-repeat h-screen"
      vertical
    >
      <Flex className="pl-6 pt-6">
        <Button>
          <Link href={"/login"}>
            <ArrowLeftOutlined className="color" />
            Back
          </Link>
        </Button>
      </Flex>

      <Flex flex={1} justify="center" align="center">
        <Card>
          <ForgotPasswordForm />
        </Card>
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

export default ForgotPassword;
