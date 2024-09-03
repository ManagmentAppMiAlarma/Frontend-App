import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../hooks";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import { PuffLoader } from "react-spinners";

const PrivateLayout = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <PuffLoader color={"#dc2626"} loading={loading} size={50} />
      </div>
    );
  } else {
    return (
      <>
        <Header role={auth.role} />
        {auth.id ? <Outlet /> : <Navigate to="/login" />}
        <Footer />
      </>
    );
  }
};

export default PrivateLayout;
