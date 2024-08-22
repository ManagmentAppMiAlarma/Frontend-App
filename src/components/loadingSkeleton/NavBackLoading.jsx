import React from "react";

const NavBackLoading = () => {
  return (
    <div className="border-b flex py-4 px-2 mb-2 animate-pulse">
      <button className="ml-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 w-6 h-6 blur-[1px]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
      </button>
      <div className="ml-11 flex">
        <div className="inline-block ml-2 bg-gray-200 w-52 h-5 blur-[1px] rounded-xl"></div>
      </div>
    </div>
  );
};

export default NavBackLoading;
