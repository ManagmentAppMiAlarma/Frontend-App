import { useQuery } from "@tanstack/react-query";
import { Global } from "../helpers/Global";

const fetchOrders = async (page = 1, limit = 20) => {
  const response = await fetch(
    `${Global.endpoints.backend}orders?page=${page}&limit=${limit}`
  );
  if (!response.ok) {
    throw new Error("Error fetching orders");
  }
  return response.json();
};

export const updateOrders = async (data) => {
  try {
    const response = await fetch(Global.endpoints.backend + "orders", {
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

export const deleteOrder = async (orderNumber) => {
  try {
    const response = await fetch(
      `${Global.endpoints.backend}orders/${orderNumber}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      console.log("Network response was not ok " + response.statusText);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

export const useOrders = (page, limit) => {
  return useQuery({
    queryKey: ["orders", page, limit],
    queryFn: () => fetchOrders(page, limit),
    keepPreviousData: true,
  });
};

export const useMutateAddOrders = () => {
  return useMutation(updateOrders);
};

export const updatingOrder = async (data, orderNumber) => {
  try {
    const response = await fetch(
      `${Global.endpoints.backend}orders/${orderNumber}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      console.log("Network response was not ok, " + response.statusText);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};
