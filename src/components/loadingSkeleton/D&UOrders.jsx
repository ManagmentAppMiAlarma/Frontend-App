import React from "react";

const Skeleton = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 md:p-8 rounded-xl shadow-lg max-w-4xl mx-auto mt-4 sm:mt-6 md:mt-10 overflow-hidden animate-pulse">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6">
        <div className="bg-gray-200 h-8 sm:h-10 w-48 rounded-lg blur-[1px]"></div>
        <div className="bg-gray-200 h-6 sm:h-8 w-24 rounded-lg blur-[1px]"></div>
      </div>

      {/* Cliente Info */}
      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-inner mb-4 sm:mb-6">
        <div className="bg-gray-200 h-6 sm:h-8 w-56 mb-3 sm:mb-4 rounded-lg blur-[1px]"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="bg-gray-200 h-6 sm:h-8 w-40 rounded-lg blur-[1px]"></div>
          <div className="bg-gray-200 h-6 sm:h-8 w-40 rounded-lg blur-[1px]"></div>
          <div className="col-span-1 sm:col-span-2 bg-gray-200 h-6 sm:h-8 w-full rounded-lg blur-[1px]"></div>
          <div className="bg-gray-200 h-6 sm:h-8 w-40 rounded-lg blur-[1px]"></div>
          <div className="bg-gray-200 h-6 sm:h-8 w-32 rounded-lg blur-[1px]"></div>
        </div>
      </div>

      {/* Servicio Info */}
      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-inner mb-4 sm:mb-6">
        <div className="bg-gray-200 h-6 sm:h-8 w-56 mb-3 sm:mb-4 rounded-lg blur-[1px]"></div>
        <div className="space-y-3 sm:space-y-4">
          <div className="bg-gray-200 h-6 sm:h-8 w-40 rounded-lg blur-[1px]"></div>
          <div className="bg-gray-200 h-12 sm:h-16 w-full rounded-lg blur-[1px]"></div>
        </div>
      </div>

      {/* Estado y Asignación */}
      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-inner">
        <div className="bg-gray-200 h-6 sm:h-8 w-56 mb-3 sm:mb-4 rounded-lg blur-[1px]"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="bg-gray-200 h-6 sm:h-8 w-32 rounded-lg blur-[1px]"></div>
          <div className="bg-gray-200 h-6 sm:h-8 w-40 rounded-lg blur-[1px]"></div>
          <div className="col-span-1 sm:col-span-2 bg-gray-200 h-6 sm:h-8 w-full rounded-lg blur-[1px]"></div>
        </div>
      </div>

      {/* Botón */}
      <div className="mt-6">
        <div className="w-full sm:w-40 h-10 bg-gray-200 rounded-full blur-[1px]"></div>
      </div>
    </div>
  );
};

export default Skeleton;
