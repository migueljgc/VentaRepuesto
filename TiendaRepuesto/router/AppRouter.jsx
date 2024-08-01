import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from '../Navbar';
import { ProtectedRoute } from '../router/ProtectedRoute';
import { HomePages } from '../src/Pages/HomePages';
import { Ingreso } from '../src/Pages/vendedor/ingreso';
import { Login } from '../src/Pages/Login and Register/Login';
import { Registro } from '../src/Pages/Login and Register/Registro';
import { Compra } from '../src/Pages/user/Compra';
import { CarritoCompra } from '../src/Pages/user/CarritoCompra';



export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<HomePages />} />
        <Route path="/Recuperacion" element={""} />
        <Route path="/Registro" element={< Registro />} />
        <Route path="/activate/:token" element={""} />
        <Route path="/login" element={<Login />} />
        <Route path="/ingreso" element={<Ingreso />} />
        {/* Rutas protegidas */}
        <Route path="/compra" element={
          <ProtectedRoute allowedRoles={['User']} element={<Compra />} />
        } />
        <Route path="/carritocompra" element={
          <ProtectedRoute allowedRoles={['User']} element={<CarritoCompra />} />
        } />

        <Route path="/HomePages" element={
          <ProtectedRoute allowedRoles={['Admin']} element={<HomePages />} />
        } />
        <Route path="/HomePages" element={
          <ProtectedRoute allowedRoles={['User']} element={<HomePages />} />
        } />

      </Route>
    </Routes>
  );
};
