import React from "react";
import { Link, Outlet } from "react-router-dom";
import { MdDashboard, MdDashboardCustomize } from "react-icons/md";
import {
  FaEdit,
  FaLocationArrow,
  FaPlusCircle,
  FaQuestionCircle,
  FaShoppingBag,
  FaUser,
} from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import QuickFoodilogo from "/QuickFoodilogo.png";

const sharedLinks = (
  <>
    <li className="mt-5">
      <Link to="/">
        <MdDashboard />
        Home
      </Link>
    </li>
    <li>
      <Link to="/menu">
        <FaCartShopping /> Menu
      </Link>
    </li>
    <li>
      <Link to="/">
        <FaLocationArrow />
        Order Tracking
      </Link>
    </li>
    <li>
      <Link to="/">
        <FaQuestionCircle />
        Customer Support
      </Link>
    </li>
  </>
);

function Dashboard() {
  return (
    <div>
      <div className="drawer sm:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col sm:items-start sm:justify-start my">
          {/* Page content here */}
          <div className="flex items-center justify-between mx-4">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              <MdDashboardCustomize />
            </label>
            <button className="btn sm:hidden bg-[#F1B24A] hover:bg-[#f0c684] hover:text-slate-800 rounded-full px-6 text-white flex items-center gap-2">
              <FaUser /> Logout
            </button>
          </div>
          <div>
            <Outlet className="mt-5 md:mt-2 mx-4" />
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full md:w-80 md:p-4 sm:p-2 sm:w-20">
            {/* Sidebar content here */}
            <li>
              <Link to="/dashboard">
                {" "}
                <img
                  src={QuickFoodilogo}
                  className="w-15 h-5 md:w-30 md:h-8"
                ></img>
                <div className="badge badge-accent">Admin</div>
              </Link>
            </li>
            <hr />
            <li className="mt-5">
              <Link to="/dashboard">
                <MdDashboard /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/dashboard">
                <FaShoppingBag /> Manage Bookings
              </Link>
            </li>
            <li>
              <Link to="/dashboard">
                <FaPlusCircle /> Add Menu
              </Link>
            </li>
            <li>
              <Link to="/dashboard">
                <FaEdit /> Manage Items
              </Link>
            </li>
            <li className="mb-5">
              <Link to="/dashboard/users">
                <FaUser /> All Users
              </Link>
            </li>

            <hr/>
            {/* sharedLinks */}
            {sharedLinks}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
