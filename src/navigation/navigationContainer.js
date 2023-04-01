import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import LoginPage from "../appPages/LoginPage";
import Layout from "../layout/Layout";
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
