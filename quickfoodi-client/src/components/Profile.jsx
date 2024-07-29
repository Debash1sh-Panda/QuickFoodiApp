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
  // console.log(user)

  useEffect(() => {
    // Retrieve the token from local storage`
    const token = localStorage.getItem("token");
    if (token) {
      // Parse the token (assuming it's a JSON Web Token)
      try {
        const parsedToken = JSON.parse(atob(token.split(".")[1]));
        const role = parsedToken.role;
        if (role === "admin") {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Error parsing token:", error);
      }
    }
  }, []);

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
    <div>
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
                <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
              ) : (
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
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
