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

export const updateUsers = async (data) => {
  try {
    const response = await fetch(
      `${Global.endpoints.backend}auth/user/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      console.log("Network response was not ok " + response.statusText);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(
      "There was a problem with the fetch operation:",
      error,
      result
    );
  }
};

export const deleteUser = async (dni) => {
  try {
    const response = await fetch(
      `${Global.endpoints.backend}auth/user/${dni}`,
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

export const useUsers = (page, limit) => {
  return useQuery({
    queryKey: ["users", page, limit],
    queryFn: () => fetchUsers(page, limit),
    keepPreviousData: true,
  });
};

export const useMutateAddUsers = () => {
  return useMutation(updateUsers);
};
