import { useQuery } from "@tanstack/react-query";
import { Global } from "../helpers/Global";

const fetchOrders = async () => {
  const response = await fetch(`Global.endpoints.backend}orders`);
  if (!response.ok) {
    throw new Error("Error fetching orders");
  }
  return response.json();
};

export const useOrders = () => {
  return useQuery("orders", fetchOrders);
};
