"use client";
import { fetchLogin } from "@/lib/api/auth/fetchLogin";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Flex, Form, FormProps, Input } from "antd";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { UserRole } from "@/lib/api/users/user.constant";

type FieldType = {
  username?: string;
  password?: string;
};

const LoginForm = () => {
  const router = useRouter();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const request = {
      username: values.username as string,
      password: values.password as string,
    };
    const result = await fetchLogin(request);
    if (result.message === "success") {
      if (result.data?.role === UserRole.Admin) {
        localStorage.setItem("user", JSON.stringify(result.data));
        Cookies.set("jne-cookie", result.data?.accessToken ?? "");
        router.push("/main");
      } else {
        window.location.assign("https://jnelearningcenter.co.id/");
      }
      return;
    }

    toast.error(`Error!\n ${result.message}`);
  };

  return (
    <Flex className="w-full" justify="center">
      <Form className="w-3/4" onFinish={onFinish} autoComplete="off">
        <Form.Item<FieldType>
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            size="large"
            placeholder="Username"
            prefix={<UserOutlined />}
          />
        </Form.Item>

        <Form.Item<FieldType>
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            size="large"
            placeholder="Password"
            prefix={<LockOutlined />}
          />
        </Form.Item>

        <Flex justify="flex-end" className="mb-6">
          <Link href={"/forgot-password"}>Forgot password</Link>
        </Flex>

        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit" className="w-full">
            Login
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default LoginForm;
