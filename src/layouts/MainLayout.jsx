import React from "react";
import { NavLink, Outlet } from "react-router";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <>
      <nav>
        <Navbar />
        <main className="">
          <Outlet />
        </main>
      </nav>
    </>
  );
}
