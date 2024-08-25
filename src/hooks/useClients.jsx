import { useMutation, useQuery } from "@tanstack/react-query";
import { Global } from "../helpers";

const fetchClients = async (page = 1, limit = 10) => {
  const response = await fetch(
    `${Global.endpoints.backend}clients?page=${page}&limit=${limit}`
  );
  if (!response.ok) {
    throw new Error("Error fetching clients");
  }
  return response.json();
};

export const updateClients = async (data) => {
  try {
    const response = await fetch(Global.endpoints.backend + 'clients', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.log("Network response was not ok " + response.statusText);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

export const useClients = (page, limit) => {
  return useQuery({
    queryKey: ["clients", page, limit],
    queryFn: () => fetchClients(page, limit),
    keepPreviousData: true,
  });
};

export const useMutateAddClients = () => {
  return useMutation(updateClients);
}