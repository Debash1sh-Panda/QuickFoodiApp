import React from "react";
import useMenu from "../../../hooks/useMenu";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../../urls";

function ManageItem() {
  const [menu, refetch] = useMenu();

  const handleDelete = async (item) => {
    try {
      const response = await axios.delete(
        `${baseUrl}/api/deleteitem/${item._id}`
      );
      if (response.status === 200) {
        toast.success("Item Deleted Successfully");
        if (typeof refetch === "function") {
          refetch();
        }
      } else {
        toast.error("Item is not deleting");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("An error occurred while deleting the item");
    }
  };

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-bold my-4">
        Manage All Menu <span className="text-[#4D774E] text-3xl">Items</span>
      </h2>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {menu.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>₹{item.price}.00</td>
                <td>
                  <Link
                    to={`/dashboard/update-menu/${item._id}`}
                    className="btn btn-ghost btn-xs text-yellow-400"
                  >
                    <FaEdit />
                  </Link>
                </td>
                <th>
                  <button
                    onClick={() => handleDelete(item)}
                    className="btn btn-ghost btn-xs text-red-800 hover:text-black hover:bg-slate-500"
                  >
                    <FaTrashAlt />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageItem;
