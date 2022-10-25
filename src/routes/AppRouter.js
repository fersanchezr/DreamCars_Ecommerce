import React from "react";
import { Navigate, Route, Routes } from "react-router";

import UserLoginForm from "../components/UserLoginForm";
import UserRegisterForm from "../components/UserRegisterForm";
import { Grid } from "../components/Grid";
import { CarDetail } from "../components/CarDetail";
import { Profile } from "../components/Profile";
import { Cart } from "../components/Cart";
import { Greeting } from "../components/Greeting";
import { Addcar } from "../components/Addcar";

export const AppRouter = ({ status, admin }) => {
  return (
    <Routes>
      {/*rutas publicas*/}
      <Route path="/" element={<Grid />} />
      <Route path="/car/:id" element={<CarDetail />} />
      <Route path="/login" element={<UserLoginForm />} />
      <Route path="/register" element={<UserRegisterForm />} />
      {/* rutas privadas*/}
      <Route path="/addcar" element={admin ? <Addcar /> : "Unauthorized"} />
      <Route path="/profile" element={status ? <Profile /> : "Unauthorized"} />
      <Route path="/cart/:carId" element={status ? <Cart /> : "Unauthorized"} />
      <Route path="/checkout" element={status ? <Greeting /> : "Unauthorized"} />
    </Routes>
  );
};
