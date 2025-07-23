import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

const Task = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/TaskData");
      setTasks(response.data.TaskData);  // <-- Access the array inside TaskData
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
          <h2 className="text-2xl font-bold text-blue-600">Task Table</h2>
          <Link
            to="/addUser"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md"
          >
            + Add Task
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200 rounded-lg">
            <thead className="bg-blue-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 border">Task</th>
                <th className="px-4 py-2 border">User</th>
                <th className="px-4 py-2 border">Completed</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((tasks, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2 text-center border">{tasks.task}</td>
                  <td className="px-4 py-2 text-center border">{tasks.name}</td>
                  <td className="px-4 py-2 text-center border">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600"
                      checked={tasks.completed}
                      readOnly
                    />
                  </td>
                  <td className="px-4 py-2 text-center border space-x-2">
                    <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded">
                      Edit
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {tasks.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    No tasks found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Task;
