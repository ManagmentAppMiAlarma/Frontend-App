import React from "react";

const Skeleton = () => {
  return (
    <article className="rounded-2xl px-4 py-2 my-3 mx-1 bg-slate-300 animate-pulse">
      <div className="mb-1 flex">
        <label className="font-bold">Nº orden:</label>
        <div className="inline-block ml-2 bg-gray-200 w-40 blur-[1px] rounded-xl"></div>
      </div>
      <div className="mb-1 flex">
        <label className="font-bold">Fecha:</label>
        <div className="inline-block ml-2 bg-gray-200 w-40 blur-[1px] rounded-xl"></div>
      </div>
      <div className="mb-1 flex">
        <label className="font-bold">Tarea:</label>
        <div className="inline-block ml-2 bg-gray-200 w-40 blur-[1px] rounded-xl"></div>
      </div>
      <div className="mb-1 flex">
        <label className="font-bold">Direccion:</label>
        <div className="inline-block ml-2 bg-gray-200 w-40 blur-[1px] rounded-xl"></div>
      </div>
      <div className="mb-1 flex">
        <label className="font-bold">Tecnico asignado:</label>
        <div className="inline-block ml-2 bg-gray-200 w-36 blur-[1px] rounded-xl"></div>
      </div>
    </article>
  );
};

export default Skeleton;
