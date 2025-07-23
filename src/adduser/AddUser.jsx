import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <- Import useNavigate

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const navigate = useNavigate(); // <- Initialize navigate

  const handleSubmit = (e) => {
    e.preventDefault();

    const taskData = {
      title,
      user: userId,
    };

    // Normally you'd send this with Axios or Fetch
    console.log("Submitting Task:", taskData);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-center text-blue-600">Add Task</h2>
        <button
          onClick={() => navigate(-1)} // <- Go back one page
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-3 rounded transition"
        >
          ← Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Title</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* User ID Input */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">User</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Submit Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
