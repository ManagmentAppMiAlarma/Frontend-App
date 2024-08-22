import React from "react";
import NavBackLoading from "./NavBackLoading";

const Skeleton = ({ auth }) => {
  return (
    <main className="min-h-screen">
      <NavBackLoading />
      <section className="border rounded-2xl px-4 py-2 my-3 mx-3 bg-slate-300 animate-pulse">
        <div className="flex mb-2">
          <div className="bg-gray-200 w-32 h-4 blur-[1px] rounded-xl ml-2"></div>
        </div>
        <div className="flex mb-2">
          <div className="flex my-0.5">
            <div className="ml-2 bg-gray-200 w-32 h-4 blur-[1px] rounded-xl"></div>
          </div>
          <div className="flex ml-7 my-0.5">
            <div className="ml-2 bg-gray-200 w-32 h-4 blur-[1px] rounded-xl"></div>
          </div>
        </div>
        <div className="flex mb-2">
          <div className="ml-2 bg-gray-200 w-32 h-4 blur-[1px] rounded-xl"></div>
        </div>
        <div className="text-center mt-3">
          <h3 className="font-semibold bg-gray-200 w-24 h-4 blur-[1px] rounded-xl"></h3>
          <div className="bg-gray-200 w-64 h-4 blur-[1px] rounded-xl mx-auto mt-2"></div>
        </div>
      </section>
      <section className="border rounded-2xl px-4 py-2 my-3 mx-3 bg-slate-300 animate-pulse">
        <div className="text-center">
          <h3 className="font-semibold bg-gray-200 w-24 h-4 blur-[1px] rounded-xl"></h3>
          <div className="bg-gray-200 w-64 h-4 blur-[1px] rounded-xl mx-auto mt-2"></div>
        </div>
        <div className="text-center mt-3">
          <div className="flex mb-2">
            <div className="ml-2 bg-gray-200 w-32 h-4 blur-[1px] rounded-xl"></div>
          </div>
          <div className="flex mb-2">
            <div className="ml-2 bg-gray-200 w-32 h-4 blur-[1px] rounded-xl"></div>
          </div>
          <div className="flex mb-2">
            <div className="ml-2 bg-gray-200 w-32 h-4 blur-[1px] rounded-xl"></div>
          </div>
          <div className="flex mb-2 relative left-56">
            <div className="ml-2 bg-gray-200 w-16 h-4 w-24 blur-[1px] rounded-xl"></div>
          </div>
        </div>
      </section>
      {auth.role == "admin" || auth.role == "owner" ? (
        <section className="hidden sm:block border rounded-2xl px-4 py-2 my-3 mx-3 bg-slate-300 animate-pulse">
          <div className="text-center">
            <h3 className="font-semibold bg-gray-200 w-24 h-4 blur-[1px] rounded-xl"></h3>
          </div>
          <div className="text-center mt-3">
            <div className="flex mb-2">
              <label className="font-semibold bg-gray-200 w-24 h-4 blur-[1px] rounded-xl"></label>
              <div className="ml-2 bg-gray-200 w-32 h-4 blur-[1px] rounded-xl"></div>
            </div>
            <div className="flex mb-2">
              <label className="font-semibold bg-gray-200 w-24 h-4 blur-[1px] rounded-xl"></label>
              <div className="ml-2 bg-gray-200 w-32 h-4 blur-[1px] rounded-xl"></div>
            </div>
            <div className="flex mb-2">
              <label className="font-semibold bg-gray-200 w-24 h-4 blur-[1px] rounded-xl"></label>
              <div className="ml-2 bg-gray-200 w-32 h-4 blur-[1px] rounded-xl"></div>
            </div>
            <div className="flex mb-2 relative left-56">
              <label className="font-semibold bg-gray-200 w-24 h-4 blur-[1px] rounded-xl"></label>
              <div className="ml-2 bg-gray-200 w-16 h-4 blur-[1px] rounded-xl"></div>
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
};

export default Skeleton;
