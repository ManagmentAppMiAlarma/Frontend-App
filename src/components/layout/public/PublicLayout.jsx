import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../hooks";

const PublicLayout = () => {
  const { auth } = useAuth();
  return (
    <>
      <main>{!auth.id ? <Outlet /> : <Navigate to="/inicio" />}</main>
    </>
  );
};

export default PublicLayout;
