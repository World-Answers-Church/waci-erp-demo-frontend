import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import LoginPage from "../appPages/loginPage";
import Layout from "../layout/layout";
export default function NavigationContainer() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/dashboard" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
}
