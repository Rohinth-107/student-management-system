import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-blue-600 p-4 shadow-md">
      <h1 className="text-2xl text-white font-bold">
        Student Management System
      </h1>
      <div>
        <Link to="/login" className="text-white mr-4 hover:underline">
          Login
        </Link>
        <Link to="/signup" className="text-white hover:underline">
          Signup
        </Link>
      </div>
    </header>
  );
};

export default Header;
