import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function Profile({ user }) {
  const { logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3001/api/admin/${user.email}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const role = data.data.role;
          // console.log(role);
          setIsAdmin(role === "admin");
        }
        //  else {
        //   toast.error(data.message);
        // }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        toast.error("Error fetching user data");
      });
  }, [user]);

  const handleLogout = () => {
    logout()
      .then(() => {
        toast.success("Logout Successfully");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
<div className="relative">
  {user.photoURL && (
    <span className="absolute top-0 right-0 flex h-3 w-3 z-10">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-600"></span>
    </span>
  )}
  <div className="drawer drawer-end z-10">
    <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content">
      {/* Page content here */}
      <label
        htmlFor="my-drawer-4"
        className="drawer-button btn btn-ghost btn-circle avatar"
      >
        <div className="w-10 rounded-full">
          {user.photoURL ? (
            <img alt="User Profile" src={user.photoURL} className="relative z-0" />
          ) : (
            <img
              alt="Default Profile"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              className="relative z-0"
            />
          )}
        </div>
      </label>
    </div>
    <div className="drawer-side">
      <label
        htmlFor="my-drawer-4"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
        {/* Sidebar content here */}
        <li>
          <a href="/update-profile">Profile</a>
        </li>
        <li>
          <a href="/orders">Orders</a>
        </li>
        {isAdmin && (
          <li>
            <a href="/dashboard">Dashboard</a>
          </li>
        )}
        <li>
          <a href="/settings">Setting</a>
        </li>
        <li>
          <a onClick={handleLogout}>Logout</a>
        </li>
      </ul>
    </div>
  </div>
</div>


  );
}

export default Profile;
