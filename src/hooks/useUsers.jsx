import { useQuery } from "@tanstack/react-query";
import { Global } from "../helpers/Global";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch(`${Global.endpoints.backend}auth/user`);
      if (!response.ok) {
        throw new Error("Error fetching users");
      }

      const data = await response.json();
      return data;
    },
  });
};
