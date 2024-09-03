import React from "react";
import { Routes, Route } from "react-router-dom";
import { Error404, Login, Dashboard } from "../pages";
import {
  ClientsComponent,
  DetailClient,
  DetailOrder,
  Employee,
  OrdersComponent,
  PrivateLayout,
  Profile,
  PublicLayout,
  UpdateOrder,
} from "../components";
import { Logout } from "../services/Logout";
import DetailUser from "../components/employee/DetailUser";

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
          <Route path="ordenes" element={<OrdersComponent />} />
          <Route path="ordenes/:orderNumber" element={<DetailOrder />} />
          <Route
            path="ordenes/:orderNumber/actualizar"
            element={<UpdateOrder />}
          />

          <Route path="perfil" element={<Profile />} />
          <Route path="clientes" element={<ClientsComponent />} />
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
