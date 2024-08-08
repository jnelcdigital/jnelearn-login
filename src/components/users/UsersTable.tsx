"use client";
import { User, fetchUsers } from "@/lib/api/users/fetchUsers";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, Flex, Input, Table, TableProps } from "antd";
import { ChangeEvent, memo, useRef, useState } from "react";
import UpdateUserModal from "./UpdateUserModal";
import { SearchOutlined } from "@ant-design/icons";
import { userQueryClient } from "./UserProvider";

const UsersTable = () => {
  const timeout = useRef<any>(null);
  const [modal, setModal] = useState(false);
  const [record, setRecord] = useState<User>();
  const [filter, setFilter] = useState({
    page: 1,
    size: 10,
    nama_cabang: "",
  });

  const { data } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ["fetchUserQuery", filter],
    queryFn: async () => {
      const { page, size, nama_cabang } = filter;
      const request = {
        page,
        size,
        nama_cabang,
      };

      const result = await fetchUsers(request);
      if (result.statusCode === 200) {
        return { data: result.data?.data, total: result.data?.total };
      }

      return { data: [], total: 0 };
    },
  });

  const action = (record: User) => {
    setRecord(record);
    setModal(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(
      () => setFilter({ ...filter, nama_cabang: e.target.value }),
      700
    );
  };

  const columns: TableProps<User>["columns"] = [
    {
      title: "Nama Cabang",
      dataIndex: "nama_cabang",
      key: "nama_cabang",
    },
    {
      title: "Kode Cabang",
      dataIndex: "kode_cabang",
      key: "kode_cabang",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => {
            action(record);
          }}
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <Card>
      <Flex className="w-1/3">
        <Input
          onChange={handleChange}
          className="mb-6"
          size="large"
          placeholder="Search nama cabang"
          prefix={<SearchOutlined />}
        />
      </Flex>

      <Table
        columns={columns}
        dataSource={data?.data?.map((item, index) => {
          return { ...item, key: index };
        })}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50"],
          onChange(page, size) {
            setFilter({ ...filter, page, size });
          },
        }}
      />
      <UpdateUserModal record={record} modal={modal} setModal={setModal} />
    </Card>
  );
};

export default memo(UsersTable);
