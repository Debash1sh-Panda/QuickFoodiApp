import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaTrashAlt, FaUser } from "react-icons/fa";

function Users() {
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3001/api/user`);
      return res.json();
    },
  });
  // console.log(users)
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
                    <button className="btn btn-ghost btn-xs hover:text-[#278888] hover:bg-black" title="mark as Admin"><FaUser/></button>
                  )}</td>
                  <td>
                    <button className="btn btn-ghost btn-xs text-red-800 hover:text-black hover:bg-slate-500">
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
