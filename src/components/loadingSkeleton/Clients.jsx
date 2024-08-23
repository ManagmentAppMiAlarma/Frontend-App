import React from "react";

const Skeleton = () => {
  return (
    <article className="bg-slate-300 p-2 rounded-lg animate-pulse">
      <div className="mb-2">
        <label className="font-bold">Nº Cliente:</label>
        <div className="inline-block ml-2 bg-slate-200 h-4 w-24 rounded"></div>
      </div>
      <div className="mb-2">
        <label className="font-bold">Nombre y Apellido:</label>
        <div className="inline-block ml-2 bg-slate-200 h-4 w-40 rounded"></div>
      </div>
      <div className="mb-2">
        <label className="font-bold">Telefono:</label>
        <div className="inline-block ml-2 bg-slate-200 h-4 w-32 rounded"></div>
      </div>
      <div>
        <label className="font-bold">Direccion:</label>
        <div className="inline-block ml-2 bg-slate-200 h-4 w-56 rounded"></div>
      </div>
    </article>
  );
};

export default Skeleton;
