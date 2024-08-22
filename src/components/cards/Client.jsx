const Client = ({ client }) => {
  return (
    <article className=" bg-slate-300 rounded-2xl px-4 py-2 my-3 mx-1">
      <div className="my-0.5">
        <label className="font-bold">Nº Cliente:</label>
        <p className="inline-block ml-2">{client.clientNumber}</p>
      </div>
      <div className="my-0.5">
        <label className="font-bold">Nombre y Apellido:</label>
        <p className="inline-block ml-2">{`${client.firstname} ${client.lastname}`}</p>
      </div>
      <div className="my-0.5">
        <label className="font-bold">Telefono:</label>
        <p className="inline-block ml-2">{client.phone}</p>
      </div>
      <div className="my-0.5">
        <label className="font-bold">Direccion:</label>
        <p className="inline-block ml-2">{client.address}</p>
      </div>
    </article>
  );
};

export default Client;
