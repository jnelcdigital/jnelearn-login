"use client";
import AddUserModal from "@/components/users/AddUserModal";
import UserProvider from "@/components/users/UserProvider";
import UsersTable from "@/components/users/UsersTable";
import { Button, Flex } from "antd";
import { useState } from "react";

const User = () => {
  const [modal, setModal] = useState(false);
  return (
    <UserProvider>
      <Flex className="h-full p-8" gap={"large"} vertical>
        <h1 className="text-2xl font-semibold">User</h1>
        <Flex justify="flex-end">
          <Button
            type="primary"
            onClick={() => {
              setModal(true);
            }}
          >
            + Create User
          </Button>
        </Flex>
        <UsersTable />
      </Flex>
      <AddUserModal modal={modal} setModal={setModal} />
    </UserProvider>
  );
};

export default User;
