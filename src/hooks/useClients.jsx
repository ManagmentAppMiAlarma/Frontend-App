import { useQuery } from "@tanstack/react-query";
import { Global } from "../helpers";

const fetchClients = async (page = 1, limit = 10) => {
  const response = await fetch(
    `${Global.endpoints.backend}clients?page=${page}&limit=${limit}`
  );
  const data = await response.json();
  return data;
};

export const useClients = (page, limit) => {
  return useQuery({
    queryKey: ["clients", page, limit],
    queryFn: () => fetchClients(page, limit),
    keepPreviousData: true,
  });
};
