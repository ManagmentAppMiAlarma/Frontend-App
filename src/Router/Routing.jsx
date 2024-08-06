import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Error404, Login, Dashboard } from '../pages'
import { PrivateLayout, PublicLayout } from '../components'
import { Logout } from '../services/Logout'
import Orders from '../components/orders/Orders'
import Clients from '../components/clients/Clients'
import Employee from '../components/employee/Employee'

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
          <Route path='ordenes' element={<Orders />} />
          <Route path='clientes' element={<Clients />} />
          <Route path='empleados' element={<Employee />} />
          <Route path='logout' element={<Logout />} />
        </Route>

        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  )
}

export default Routing
