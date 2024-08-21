import React from "react";

const Skeleton = () => {
  return (
    <article className="border rounded-2xl px-4 py-2 my-3 mx-6 bg-[#d0d3d4] animate-pulse">
      <div className="mb-1">
        <label className="font-bold">Nº orden:</label>
        <div className="inline-block ml-2 bg-gray-300 h-4 w-24 rounded"></div>
      </div>
      <div className="mb-1">
        <label className="font-bold">Tarea:</label>
        <div className="inline-block ml-2 bg-gray-300 h-4 w-40 rounded"></div>
      </div>
      <div className="mb-1">
        <label className="font-bold">Direccion:</label>
        <div className="inline-block ml-2 bg-gray-300 h-4 w-56 rounded"></div>
      </div>
      <div className="mb-1">
        <label className="font-bold">Tecnico asignado:</label>
        <div className="inline-block ml-2 bg-gray-300 h-4 w-48 rounded"></div>
      </div>
    </article>
  );
};

export default Skeleton;
