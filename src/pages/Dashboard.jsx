import React from "react";
import { useAuth } from "../hooks";
import Admin from "../components/layout/subLayout/admin/Admin";
import User from "../components/layout/subLayout/user/User";

const Dashboard = () => {
  const { auth } = useAuth();
  const { role } = auth;

  if (role == "admin" || role == "owner") {
    return <Admin />;
  } else {
    return <User />;
  }
};

export default Dashboard;
