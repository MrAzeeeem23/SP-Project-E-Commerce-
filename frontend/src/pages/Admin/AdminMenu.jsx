import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <button
        className={`${
          isMenuOpen ? "right-7" : "right-7"
        } bg-[#000000] p-3 fixed rounded-lg z-50`}
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <FaTimes color="white" />
        ) : (
          <>
            <span className="material-symbols-outlined">menu</span>
          </>
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[250px] bg-[#151515] z-40 transition-transform transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:w-[300px]`}
      >
        <section className="p-4">
          <ul className="list-none mt-2">
            <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
                to="/admin/dashboard"
                style={({ isActive }) => ({
                  color: isActive ? "red" : "white",
                })}
              >
                Admin Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
                to="/admin/categorylist"
                style={({ isActive }) => ({
                  color: isActive ? "red" : "white",
                })}
              >
                Create Category
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
                to="/admin/productlist"
                style={({ isActive }) => ({
                  color: isActive ? "red" : "white",
                })}
              >
                Create Product
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
                to="/admin/allproductslist"
                style={({ isActive }) => ({
                  color: isActive ? "red" : "white",
                })}
              >
                All Products
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
                to="/admin/userlist"
                style={({ isActive }) => ({
                  color: isActive ? "red" : "white",
                })}
              >
                Manage Users
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
                to="/admin/orderlist"
                style={({ isActive }) => ({
                  color: isActive ? "red" : "white",
                })}
              >
                Manage Orders
              </NavLink>
            </li>
          </ul>
        </section>
      </div>

      {/* Overlay for smaller screens */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </>
  );
};

export default AdminMenu;
