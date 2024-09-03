import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../hooks";
import { PuffLoader } from "react-spinners";

const PublicLayout = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <PuffLoader color={"#dc2626"} loading={loading} size={50} />
      </div>
    );
  }
  return (
    <>
      <main>{!auth.id ? <Outlet /> : <Navigate to="/inicio" />}</main>
    </>
  );
};

export default PublicLayout;
