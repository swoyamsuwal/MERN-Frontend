import React, { useEffect, useState } from 'react';
import axios from "axios"
import { Link } from 'react-router-dom';

const User = () => {
const [user, setUsers] = useState([])
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/usersdata");
      setUsers(response.data.userData); // <- Access the array here
    } catch (error) {
      console.log("Error fetching data ", error);
    }
  };
  fetchData();
}, []);



  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-blue-600">User Table</h2>
          <Link to = "/addUser" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md">
            + Add User
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200 rounded-lg">
            <thead className="bg-blue-100">
            <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Address</th>  {/* Added Address header */}
                <th className="px-4 py-2 border">Actions</th>
            </tr>
            </thead>

            <tbody>
              {user.map((user) =>{
                return(
                <tr className="hover:bg-gray-50">
                <td className="px-4 py-2 text-center border">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                </td>
                <td className="px-4 py-2 border text-center">{user.name}</td>
                <td className="px-4 py-2 border text-center">{user.email}</td>
                <td className="px-4 py-2 border text-center">{user.address}</td>
                <td className="px-4 py-2 text-center border space-x-2">
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded">
                    Edit
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default User;
