import { useQuery } from "@tanstack/react-query";
import { Global } from "../helpers/Global";

const fetchUsers = async () => {
  const response = await fetch(`${Global.endpoints.backend}/auth/user`);
  if (!response.ok) {
    throw new Error("Error fetching users");
  }
  return response.json();
};

export const useUsers = () => {
  return useQuery("auth", fetchUsers);
};
