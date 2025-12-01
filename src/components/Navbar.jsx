import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-gray-800/90 backdrop-blur border-b border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">

        {/* Logo */}
        <div className="text-xl font-bold text-white tracking-wide">
          Echo English
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <Link className="text-gray-300 hover:text-white transition" to="/">Home</Link>
          <Link className="text-gray-300 hover:text-white transition" to="/listening">Listening</Link>
          <Link className="text-gray-300 hover:text-white transition" to="/reading">Reading</Link>
          <Link className="text-gray-300 hover:text-white transition" to="/speaking">Speaking</Link>
          <Link className="text-gray-300 hover:text-white transition" to="/writing">Writing</Link>
        </div>

        {/* Mobile Button */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="text-gray-300 focus:outline-none text-2xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden flex flex-col space-y-3 p-4 bg-gray-800 border-t border-gray-700">
          <Link className="text-gray-200" to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link className="text-gray-200" to="/listening" onClick={() => setOpen(false)}>Listening</Link>
          <Link className="text-gray-200" to="/reading" onClick={() => setOpen(false)}>Reading</Link>
          <Link className="text-gray-200" to="/speaking" onClick={() => setOpen(false)}>Speaking</Link>
          <Link className="text-gray-200" to="/writing" onClick={() => setOpen(false)}>Writing</Link>
        </div>
      )}
    </nav>
  );
}
