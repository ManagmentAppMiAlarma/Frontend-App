import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home } from '../pages'

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </>
  )
}

export default Routing
