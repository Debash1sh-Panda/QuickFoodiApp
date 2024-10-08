import React, { useContext, useEffect, useState } from "react";
import QuickFoodilogo from "/QuickFoodilogo.png";
import { FaRegUser } from "react-icons/fa";
import Login from "./Login";
// import { AuthContext } from "../contexts/AuthProvider";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();

  const [isSticky, setSticky] = useState(false);

  //custom hook
  const [cart, refetch] = useCart();

  //handle scroll function
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    // window.addEventListener("scroll", handleScroll);

    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);

  const hoverEffect = "hover:bg-[#f0c684] hover:text-slate-800 rounded-md";
  const navItems = (
    <>
      <li>
        <a href="/" className={hoverEffect}>
          Home
        </a>
      </li>
      <li tabIndex={0}>
        <details>
          <summary className="hover:bg-[#9DCBBD] hover:text-slate-800">
            Menu
          </summary>
          <ul className="p-2">
            <li className={hoverEffect}>
              <Link to="/menu">All</Link>
            </li>
            <li className={hoverEffect}>
              <a>Salad</a>
            </li>
            <li className={hoverEffect}>
              <a>Pizza</a>
            </li>
          </ul>
        </details>
      </li>
      <li tabIndex={0}>
        <details>
          <summary className="hover:bg-[#9DCBBD] hover:text-slate-800">
            Services
          </summary>
          <ul className="p-2">
            <li className={hoverEffect}>
              <a>Online Order</a>
            </li>
            <li>
              <a className={hoverEffect}>Table Booking</a>
            </li>
            <li>
              <a className={hoverEffect}>Order Tracking</a>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <a className={hoverEffect}>Offers</a>
      </li>
    </>
  );
  return (
    <header className="max-w-screen-2xl container mx-auto fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out z-50 shadow-md">
      <div
        className={`navbar xl:px-24 ${isSticky} ? "shadow-md bg-base-100 transition-all duration-300 ease-in-out" : ""`}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navItems}
            </ul>
          </div>
          <a href="/">
            <img
              src={QuickFoodilogo}
              className=" w-15 h-5 md:w-30 md:h-8"
            ></img>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end">
          {/* search icon */}
          <button className="btn btn-ghost btn-circle hidden lg:flex hover:bg-[#9DCBBD] hover:text-slate-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {/* Cart icon */}
          <Link to='/cart'>
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle mr-3 lg:flex hidden items-center justify-center hover:bg-[#9DCBBD] hover:text-slate-800"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">{cart.length || 0}</span>
              </div>
            </label>
          </Link>

          {/* button */}
          {user ? (
            <Profile user={user} />
          ) : (
            <button
              className="btn bg-[#F1B24A] hover:bg-[#f0c684] hover:text-slate-800 rounded-full px-6 text-white flex items-center gap-2"
              onClick={() => document.getElementById("my_modal_5").showModal()}
            >
              <FaRegUser />
              Login
            </button>
          )}
          <Login />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
