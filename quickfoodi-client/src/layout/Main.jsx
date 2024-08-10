import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../../src/App.css";
import Footer from "../components/Footer";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import Loading from "../components/Loading";

function Main() {
  const { loading } = useContext(AuthContext);
  return (
    <div>
      {loading ? (
        <Loading/>
      ) : (
        <div>
          <Navbar />
          <div className="">
          <Outlet />
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default Main;
