"use client";
import { fetchLogin } from "@/lib/api/auth/fetchLogin";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Flex, Form, FormProps, Input } from "antd";

const LoginForm = () => {
  type FieldType = {
    username?: string;
    password?: string;
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Success:", values);
    const request = {
      username: values.username as string,
      password: values.password as string,
    };
    const result = await fetchLogin(request);
    console.log('result', result)
  };

  return (
    <Flex className="w-full py-5" justify="center">
      <Form className="w-1/2" onFinish={onFinish} autoComplete="off">
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

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default LoginForm;
