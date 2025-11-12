import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ThemeContext } from "../contexts/ThemeContext";

export default function MainLayout() {
  const { theme } = useContext(ThemeContext);

  const color =
    theme === "dark" ? "bg-dark text-white py-3" : "bg-light text-dark py-3";
  return (
    <>
      <nav>
        <Navbar />
        <main className={color}>
          <Outlet />
        </main>
        <Footer />
      </nav>
    </>
  );
}
