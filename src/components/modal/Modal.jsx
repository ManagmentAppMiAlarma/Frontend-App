import React, { useEffect } from "react";

const customSizes = {
  sm: "md:w-[90vw] md:h-[90vh] lg:w-[30vw] lg:h-min max-h-screen lg:max-h-[90vh]",
  md: "md:w-[90vw] md:h-[90vh] lg:w-[50vw] lg:h-min max-h-screen lg:max-h-[90vh]",
  lg: "md:w-[90vw] md:h-[90vh] lg:w-[70vw] lg:h-min max-h-screen lg:max-h-[90vh]",
};
export function Modal({
  open,
  onClose,
  children,
  size,
  title,
  footerChild,
  handlerCleanStates,
}) {
  useEffect(() => {
    open
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
      handlerCleanStates?.();
    };
  }, [open]);
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        open ? "visible bg-black/40" : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`flex flex-col gap-1 bg-white md:rounded-xl shadow p-4 pt-3 transition-all w-full h-full  ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        } ${customSizes[size] ?? customSizes.lg}`}
      >
        <ModalHeader title={title} onClose={onClose} />
        <ModalBody>{children}</ModalBody>
        {footerChild && <ModalFooter>{footerChild}</ModalFooter>}
      </div>
    </div>
  );
}

const ModalHeader = ({ onClose, title }) => {
  return (
    <header className="flex justify-between border-b border-gray-300 pb-2">
      <h2 className="sm:text-xl">{title}</h2>
      <button
        onClick={onClose}
        className="rounded-lg text-gray-500 bg-white hover:bg-gray-200 hover:text-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
          onClick={onClose}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </header>
  );
};

const ModalBody = ({ children }) => {
  return (
    <section className="flex flex-col overflow-y-auto h-full">
      {children}
    </section>
  );
};

const ModalFooter = ({ children }) => {
  return <footer className="flex justify-end gap-2">{children}</footer>;
};
