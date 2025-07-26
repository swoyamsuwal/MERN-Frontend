import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateTask = () => {
  const { id } = useParams(); // get task ID from URL
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');

  // Fetch existing task data
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/task/${id}`);
        setTitle(res.data.task);
        setUserId(res.data.name);
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };

    fetchTask();
  }, [id]);

  // Handle update
 const handleUpdate = async (e) => {
  e.preventDefault();

  const updatedData = {
    name: userId,
    task: title
  };

  try {
    const token = localStorage.getItem("token"); // ✅ Get token from localStorage

    await axios.put(`http://localhost:8000/api/update/task/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}` // ✅ Include token
      }
    });

    console.log("Task updated:", updatedData);
    navigate('/');
  } catch (error) {
    console.error('Error updating task:', error);
  }
};


  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">Update Task</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">User</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default UpdateTask;
