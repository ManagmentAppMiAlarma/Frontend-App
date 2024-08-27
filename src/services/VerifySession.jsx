import { Global } from "../helpers";

export const VerifySession = async () => {
  try {
    const res = await fetch(`${Global.endpoints.backend}auth/user/verify`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (res.status !== 200) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      console.log(res.statusText);
      return false;
    }
    return true;
  } catch (error) {
    throw new Error(error);
  }
};
