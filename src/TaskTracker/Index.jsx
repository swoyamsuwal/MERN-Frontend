import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header'

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

 useEffect(() => {
  // ✅ 1. Extract token from URL
  const urlParams = new URLSearchParams(window.location.search);
  const tokenFromUrl = urlParams.get("token");

  // ✅ 2. If token exists in URL, store it
  if (tokenFromUrl) {
    localStorage.setItem("token", tokenFromUrl);
    // Optional: Clean the URL
    window.history.replaceState({}, document.title, "/task");
  }

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:8000/api/taskdata", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setTasks(response.data.TaskData);
    } catch (error) {
      console.log("Error fetching data ", error);
      if (error.response && error.response.status === 401) {
        navigate("/login"); // Redirect to login if unauthorized
      }
    }
  };
  fetchData();
}, [navigate]);


  // Toggle completed status handler
  const toggleCompleted = async (taskId, currentCompleted) => {
  try {
    const token = localStorage.getItem("token"); // get token

    // Send PUT request to update completed status with Authorization header
    await axios.put(
      `http://localhost:8000/api/update/task/${taskId}`,
      { completed: !currentCompleted },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Update local state immediately
    setTasks(tasks.map(task =>
      task._id === taskId ? { ...task, completed: !currentCompleted } : task
    ));
  } catch (error) {
    console.error("Error updating completed status:", error);
  }
};


  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this task?")) return;

  try {
    const token = localStorage.getItem("token"); // get token

    await axios.delete(`http://localhost:8000/api/delete/task/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setTasks(tasks.filter(task => task._id !== id));
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header />
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-blue-600">Task Table</h2>
          <Link
            to="/addUser"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md"
          >
            + Add Task
          </Link>
        </div>

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
              {tasks.map((task) => (
                <tr key={task._id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2 text-center border">{task.task}</td>
                  <td className="px-4 py-2 text-center border">{task.name}</td>
                  <td className="px-4 py-2 text-center border">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600 cursor-pointer"
                      checked={task.completed}
                      onChange={() => toggleCompleted(task._id, task.completed)}
                    />
                  </td>
                  <td className="px-4 py-2 text-center border space-x-2">
                    <button
                      onClick={() => navigate(`/update/${task._id}`)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
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
