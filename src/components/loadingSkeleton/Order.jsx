import React from "react";

const OrderSkeleton = () => {
  return (
    <div className="bg-gray-50 shadow-lg rounded-lg overflow-hidden border border-gray-200 animate-pulse">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-gray-200 w-40 h-6 rounded"></div>
          <div className="flex items-center text-gray-600">
            <div className="bg-gray-200 w-16 h-4 rounded mr-2"></div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-gray-700">
            <div className="bg-blue-200 w-4 h-4 rounded mr-2" />
            <div className="bg-gray-200 w-32 h-4 rounded"></div>
          </div>

          <div className="flex items-center text-gray-700">
            <div className="bg-green-200 w-4 h-4 rounded mr-2" />
            <div className="bg-gray-200 w-32 h-4 rounded"></div>
          </div>

          <div className="flex items-center text-gray-700">
            <div className="bg-red-200 w-4 h-4 rounded mr-2" />
            <div className="bg-gray-200 w-64 h-4 rounded"></div>
          </div>

          <div className="flex items-center text-gray-700">
            <div className="bg-yellow-200 w-4 h-4 rounded mr-2" />
            <div className="bg-gray-200 w-48 h-4 rounded"></div>
          </div>

          <div className="flex items-center text-gray-700">
            <div className="bg-purple-200 w-4 h-4 rounded mr-2" />
            <div className="bg-gray-200 w-48 h-4 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSkeleton;
