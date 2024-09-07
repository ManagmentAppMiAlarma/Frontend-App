import { Global } from "../helpers";

export const getOrderByOrderNumber = async (orderNumber) => {
  try {
    const res = await fetch(`${Global.endpoints.backend}orders/${orderNumber}`);

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error("Ah ocurrido un error al obtener los datos de la orden.");
  }
};
