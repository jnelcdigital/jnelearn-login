"use client";
import { User, fetchUsers } from "@/lib/api/users/fetchUsers";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, Table, TableProps } from "antd";
import { memo, useState } from "react";
import UpdateUserModal from "./UpdateUserModal";

const UsersTable = () => {
  const [modal, setModal] = useState(false);
  const [record, setRecord] = useState<User>();
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
  });

  const { data } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ["fetchUserQuery", pagination],
    queryFn: async () => {
      const { page, size } = pagination;
      const request = {
        page,
        size,
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
      <Table
        columns={columns}
        dataSource={data?.data}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50"],
          onChange(page, size) {
            setPagination({ page, size });
          },
        }}
      />
      <UpdateUserModal record={record} modal={modal} setModal={setModal} />
    </Card>
  );
};

export default memo(UsersTable);
