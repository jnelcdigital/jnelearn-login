import { Button, Form, FormProps, Input, Modal, Select } from "antd";
import { Dispatch, SetStateAction } from "react";
import { userQueryClient } from "./UserProvider";
import { fetchAddUser } from "@/lib/api/users/fetchAddUser";
import { toast } from "react-toastify";
import { UserRole } from "@/lib/api/users/user.constant";

interface IAddUserModal {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
}

type FieldType = {
  kode_cabang: string;
  nama_cabang: string;
  username: string;
  role: string;
  password: string;
  confirm_password: string;
};

const AddUserModal = (props: IAddUserModal) => {
  const { modal, setModal } = props;
  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    if (values.password !== values.confirm_password) {
      alert("password not match");
      return;
    }

    const request = {
      kode_cabang: values.kode_cabang,
      nama_cabang: values.nama_cabang,
      username: values.username,
      password: values.password,
      role: values.role,
    };
    const result = await fetchAddUser(request);

    if (result.statusCode === 200) {
      toast.success("User berhasil ditambah");
      userQueryClient.invalidateQueries({ queryKey: ["fetchUserQuery"] });
      form.resetFields();
      setModal(false);
    } else {
      toast.error(`Error!\n ${result.message}`);
    }
  };

  const onFinishFailed = (errorInfo: any) => {};

  const handleCancel = () => {
    setModal(false);
  };

  return (
    <Modal
      title="Add User"
      open={modal}
      onCancel={() => {
        setModal(false);
      }}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
      ]}
    >
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Nama Cabang"
          name="nama_cabang"
          rules={[
            {
              required: true,
              message: "Mohon masukan nama cabang!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Kode Cabang"
          name="kode_cabang"
          rules={[
            {
              required: true,
              message: "Mohon masukan kode cabang!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[
            {
              required: true,
              message: "Mohon pilih kode role!",
            },
          ]}
        >
          <Select>
            <Select.Option value={UserRole.Admin}>Admin</Select.Option>
            <Select.Option value={UserRole.User}>User</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Mohon masukan username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Mohon masukan password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirm_password"
          rules={[
            {
              required: true,
              message: "Mohon masukan confirm password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUserModal;
