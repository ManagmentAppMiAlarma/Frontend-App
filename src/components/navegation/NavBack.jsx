import React from "react";
import { BackTo } from "../../helpers";
import { useAuth } from "../../hooks";

const NavBack = ({
  text,
  valueKey,
  value = false,
  disable = false,
  handleOpenModal,
}) => {
  const { auth } = useAuth();
  const { role } = auth;

  return (
    <div className="border-b flex py-4 px-2 mb-2 justify-center gap-11">
      <button onClick={BackTo} className="ml-2 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
      </button>
      <div className="">
        <label className="font-semibold">{text}</label>
        {value ? <h1 className="inline-block ml-2">{valueKey}</h1> : null}
      </div>
      <div className={disable ? "hidden" : null}>
        {role || role == "admin" || role == "owner" ? (
          <svg
            onClick={handleOpenModal}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 cursor-pointer"
          >
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
              clipRule="evenodd"
            />
          </svg>
        ) : null}
      </div>
    </div>
  );
};

export default NavBack;
