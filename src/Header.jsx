import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white shadow-md">
      <h1 className="text-2xl font-bold">Task Tracker</h1>
      <Link
        to="/login"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
      >
        Login
      </Link>
    </header>
  );
};

export default Header;
