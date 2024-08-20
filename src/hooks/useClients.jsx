import { useQuery } from "@tanstack/react-query";
import { Global } from "../helpers/Global";

const fetchClients = async () => {
  const response = await fetch(`${Global.endpoints.backend}clients`);
  if (!response.ok) {
    throw new Error("Error fetching clients");
  }
  return response.json();
};

export const useClients = () => {
  return useQuery("clients", fetchClients);
};
