import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [userName, setUserName] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);  // NEW state
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setUserName(null);
    setDropdownOpen(false); // close dropdown on logout
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  return (
<header className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white shadow-md mb-6">
      <h1 className="text-2xl font-bold">Task Tracker</h1>

      {userName ? (
        <div className="relative inline-block text-left">
          <button 
            onClick={toggleDropdown} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            {userName} ▼
          </button>

          {dropdownOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-28 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Link
          to="/login"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Login
        </Link>
      )}
    </header>
  );
};

export default Header;
