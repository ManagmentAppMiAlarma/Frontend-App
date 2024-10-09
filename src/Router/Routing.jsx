import React from "react";
import { Routes, Route } from "react-router-dom";
import { Error404, Login, Dashboard } from "../pages";
import { Logout } from "../services/Logout";
import DetailUser from "../components/employee/DetailUser";
import PublicLayout from "../components/layout/public/PublicLayout";
import PrivateLayout from "../components/layout/private/PrivateLayout";
import Orders from "../components/orders/Orders";
import DetailOrder from "../components/orders/DetailOrder";
import Profile from "../components/profile/Profile";
import Clients from "../components/clients/Clients";
import DetailClient from "../components/clients/DetailClient";
import Employee from "../components/employee/Employee";

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
        </Route>

        <Route path="/inicio" element={<PrivateLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="ordenes" element={<Orders />} />
          <Route path="ordenes/:orderNumber" element={<DetailOrder />} />

          <Route path="perfil" element={<Profile />} />
          <Route path="clientes" element={<Clients />} />
          <Route path="clientes/:clientNumber" element={<DetailClient />} />

          <Route path="empleados" element={<Employee />} />
          <Route path="empleados/:dni" element={<DetailUser />} />
          <Route path="logout" element={<Logout />} />
        </Route>

        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
};

export default Routing;
