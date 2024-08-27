const User = ({ user }) => {
    return (
      <article className="bg-slate-300 rounded-2xl px-4 py-2 my-3 mx-1">
        <div className="my-0.5">
          <label className="font-bold">Nombre y Apellido:</label>
          <p className="inline-block ml-2">{`${user.firstname} ${user.lastname}`}</p>
        </div>
        <div className="my-0.5">
          <label className="font-bold">Correo Electronico:</label>
          <p className="inline-block ml-2">{user.email}</p>
        </div>
        <div className="my-0.5">
          <label className="font-bold">Cedula:</label>
          <p className="inline-block ml-2">{user.dni}</p>
        </div>
        <div className="my-0.5">
          <label className="font-bold">Telefono:</label>
          <p className="inline-block ml-2">{user.phone}</p>
        </div>
        <div className="my-0.5">
          <label className="font-bold">Permiso:</label>
          <p className="inline-block ml-2">{user.role == "admin" || user.role == "owner" ? "Administrador" : "Tecnico"}</p>
        </div>
      </article>
    );
  };
  
  export default User;