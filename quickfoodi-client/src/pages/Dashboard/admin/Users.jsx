import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaTrashAlt, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { baseUrl } from "../../../urls";

function Users() {
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/api/user`);
      return res.json(); 
    },
  });

  const handleMakeAdmin = (user) => {
    fetch(`${baseUrl}/api/admin/${user._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role: 'admin' })  // Explicitly set the role in the request body
    })
    .then(async response => {
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      return response.json();
    })
    .then(data => {
      if (data.success) {
        toast.success(`${user.name} promoted to admin`);
        refetch();
      } else {
        toast.error(data.message);
      }
    })
    .catch(error => {
      console.error('Error promoting user to admin:', error);
      toast.error('Error promoting user to admin');
    });
  }

  const handleDelete = async (user) => {
    try{
    const response = await fetch(`${baseUrl}/api/user/${user._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json();
      if (data.success) {
        toast.success(`${user.name} deleted successfully`);
        refetch();
      } else {
        toast.error(data.message);
      }
    }catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Error deleting user');
    }
  }

  return (
    <div className="mt-4">
      <div className="mb-5 flex flex-col items-center justify-center">
        <h4 className="text-[#F1B24A] font-bold">All Users</h4>
        <h5>
          Total Users: <span className="text-[#4D774E]">{users.length}</span>
        </h5>
      </div>

      {/* table */}
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra md:w-[1167px] sm:w-[425px]">
            <thead className="bg-[#F1B24A] text-slate-800">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </thead>
            <tbody>
              {/* row-1 */}
              {users.map((user, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role === 'admin' ? <FaUser className="mx-2 text-[#278888]" title="Admin"/>:(
                    <button className="btn btn-ghost btn-xs hover:text-[#278888] hover:bg-black" title="mark as Admin"
                    onClick={() => handleMakeAdmin(user)}><FaUser/></button>
                  )}</td>
                  <td>
                    <button className="btn btn-ghost btn-xs text-red-800 hover:text-black hover:bg-slate-500"
                    onClick={() => handleDelete(user)}>
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
