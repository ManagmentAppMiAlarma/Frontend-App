import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Error404, Login } from '../pages'
import { PrivateLayout, PublicLayout } from '../components'
import Dashboard from '../pages/Dashboard'

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
        </Route>

        <Route path="/dashboard" element={<PrivateLayout />}>
          <Route index element={<Dashboard />} />
        </Route>

        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  )
}

export default Routing
