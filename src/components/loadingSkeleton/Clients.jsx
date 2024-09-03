import React from "react";

const Skeleton = () => {
  return (
    <article className="rounded-2xl px-4 py-2 my-3 mx-1 bg-slate-300 animate-pulse">
      <div className="my-0.5 flex">
        <label className="font-bold">Nº Cliente:</label>
        <div className="inline-block ml-2 bg-gray-200 w-40 blur-[1px] rounded-xl"></div>
      </div>
      <div className="my-0.5 flex">
        <label className="font-bold">Nombre y Apellido:</label>
        <div className="inline-block ml-2 bg-gray-200 w-40 blur-[1px] rounded-xl"></div>
      </div>
      <div className="my-0.5 flex">
        <label className="font-bold">Teléfono:</label>
        <div className="inline-block ml-2 bg-gray-200 w-40 blur-[1px] rounded-xl"></div>
      </div>
      <div className="my-0.5 flex">
        <label className="font-bold">Dirección:</label>
        <div className="inline-block ml-2 bg-gray-200 w-64 blur-[1px] rounded-xl"></div>
      </div>
    </article>
  );
};

export default Skeleton;
