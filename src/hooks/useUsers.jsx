import { useQuery, useMutation } from "@tanstack/react-query";
import { Global } from "../helpers/Global";

const fetchUsers = async (page = 1, limit = 10) => {
  const response = await fetch(
    `${Global.endpoints.backend}auth/user?page=${page}&limit=${limit}`
  );
  if (!response.ok) {
    throw new Error("Error fetching users");
  }
  return response.json();
};

export const useUsers = (page, limit) => {
  return useQuery({
    queryKey: ["users", page, limit],
    queryFn: () => fetchUsers(page, limit),
    keepPreviousData: true,
  });
};
