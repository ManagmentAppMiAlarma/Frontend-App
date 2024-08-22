import { useQuery } from "@tanstack/react-query";
import { Global } from "../helpers/Global";

const fetchOrders = async (page = 1, limit = 10) => {
  const response = await fetch(
    `${Global.endpoints.backend}orders?page=${page}&limit=${limit}`
  );
  if (!response.ok) {
    throw new Error("Error fetching orders");
  }
  return response.json();
};

export const useOrders = (page, limit) => {
  return useQuery({
    queryKey: ["orders", page, limit],
    queryFn: () => fetchOrders(page, limit),
    keepPreviousData: true,
  });
};
