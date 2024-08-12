import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getClientbyId } from "../../services/getClientById";

const DetailClient = () => {
  const { clientNumber } = useParams();
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState({});
  console.log(client);

  useEffect(() => {
    getClientbyId(clientNumber, setLoading, setClient);
  }, []);

  if (loading) {
    return <h1>Cargando...</h1>;
  } else {
    return (
      <main>
        <h1>{`Detalle del cliente: ${clientNumber}`}</h1>
        <section>datos del cliente</section>
      </main>
    );
  }
};

export default DetailClient;
