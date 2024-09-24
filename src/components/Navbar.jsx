import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="relative flex flex-wrap items-center justify-between px-7 py-3 bg-SageGreen mb-3 font-quicksand">
      <div className="text-white font-extrabold">Discover Deals Now </div>

      {/* Hamburger Icon */}
      <button
        className="block md:hidden text-white hover:text-white focus:outline-none"
        onClick={toggleMenu}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
          ></path>
        </svg>
      </button>

      {/* Links */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } w-full md:flex md:items-center md:w-auto`}
      >
        <div className="flex flex-col md:flex-row md:space-x-4">
          <a href="#home" className="text-white hover:text-PaleSage py-2">
            Home
          </a>
          <a href="#cart" className="text-white hover:text-PaleSage py-2">
            Cart
          </a>
          <a href="#login" className="text-white hover:text-PaleSage py-2">
            Login
          </a>
          <a href="#logout" className="text-white hover:text-PaleSage py-2">
            Logout
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
