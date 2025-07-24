import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      name: userId,
      task: title
    };

    try {
      await axios.post("http://localhost:8000/api/task", taskData);
      console.log("Task submitted:", taskData);
      navigate("/");
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-blue-600">Add Task</h2>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-3 rounded"
        >
          ← Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Title</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">User</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Submit Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
