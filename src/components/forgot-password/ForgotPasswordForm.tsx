"use client";
import { fetchForgotPassword } from "@/lib/api/auth/fetchForgotPassword";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { FormProps, Form, Input, Button } from "antd";
import { useForm } from "antd/es/form/Form";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

type FieldType = {
  username?: string;
  password?: string;
  confirm_password?: string;
};

const ForgotPasswordForm = () => {
  const router = useRouter();
  const [form] = useForm();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const request = {
      username: values.username as string,
      password: values.password as string,
    };
    const result = await fetchForgotPassword(request);
    if (result.message === "success") {
      toast.success('Password berhasil diubah')
      form.resetFields();
      router.push("/login");
    }
  };

  return (
    <Form form={form} className="w-full" onFinish={onFinish} autoComplete="off">
      <Form.Item<FieldType>
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input size="large" placeholder="Username" prefix={<UserOutlined />} />
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

      <Form.Item<FieldType>
        name="confirm_password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password
          size="large"
          placeholder="Confirm Password"
          prefix={<LockOutlined />}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Forgot Password
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ForgotPasswordForm;
