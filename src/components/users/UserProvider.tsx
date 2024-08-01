"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

interface IUserProvider {
  children: ReactNode;
}
export const userQueryClient = new QueryClient();

const UserProvider = (props: IUserProvider) => {
  return (
    <QueryClientProvider client={userQueryClient}>
      {props.children}
    </QueryClientProvider>
  );
};

export default UserProvider;
