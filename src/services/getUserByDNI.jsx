import { Global } from "../helpers/Global";

export const getUserByDNI = async (dni, setLoading, setUser) => {
  try {
    const res = await fetch(`${Global.endpoints.backend}auth/user/${dni}`);
    const data = await res.json();

    if (res.status == 404) throw new Error("Ha ocurrido un error!");

    setUser(data);
    setLoading(false);
  } catch (err) {
    throw new Error("Error al cargar datos desde la API:", err);
  }
};
