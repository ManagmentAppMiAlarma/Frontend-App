import { Global } from "../helpers/Global";

export const getClientbyId = async (clientNumber, setLoading, setClient) => {
  try {
    const res = await fetch(
      `${Global.endpoints.backend}clients/${clientNumber}`
    );
    const data = await res.json();

    if (res.status == 404) throw new Error("Ha ocurrido un error!");

    setClient(data);
    setLoading(false);
  } catch (err) {
    throw new Error("Error al cargar datos desde la API:", err);
  }
};
