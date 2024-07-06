import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="bg-[#0000] text-white top-0 left-0 w-full" style={{ zIndex: 9999 }}>
      <div className="container flex justify-between items-center p-4 mx-2">
        <button onClick={toggleSidebar} className="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>


        <div className="hidden md:flex space-x-6">
          <Link to="/" className="flex items-center transition-transform transform">
            <span className="material-symbols-outlined">home</span>
          </Link>

          <Link to="/shop" className="flex items-center transition-transform transform">
            <span className="material-symbols-outlined">local_mall</span>
          </Link>

          <Link to="/cart" className="flex items-center relative transition-transform transform">
            <span className="material-symbols-outlined">shopping_cart</span>
            {cartItems.length > 0 && (
              <span className="absolute -top-3 right-0 px-1 py-0 text-[13px] text-black bg-white rounded-full">
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            )}
          </Link>

          <Link to="/favorite" className="flex items-center transition-transform transform">
            <span className="material-symbols-outlined">favorite</span>
          </Link>
        </div>

        <div className="flex flex-grow-20 text-center justify-center items-center">
          <Link to='/'>
            <h1 id="logo" className="text-center">BS</h1>
          </Link>
        </div>

        <div className="relative">
          {userInfo ? (
            <button onClick={toggleDropdown} className="flex items-center focus:outline-none">
              <span className="text-white">{userInfo.username}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-4 ml-1 ${dropdownOpen ? "transform rotate-10" : " "} transition-all`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
              </svg>
            </button>
          ) : (
            <div className="flex space-x-6">
              <Link to="/login" className="flex items-center transition-transform">
                <span className="material-symbols-outlined">login</span>
                <span className="ml-2 hidden md:block">Login</span>
              </Link>
              <Link to="/register" className="flex items-center transition-transform">
                <span className="material-symbols-outlined">person_add</span>
                <span className="ml-2 hidden md:block">Register</span>
              </Link>
            </div>
          )}

          {dropdownOpen && userInfo && (
            <ul className="absolute z-[999] right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg transition-all">
              {userInfo.isAdmin && (
                <>
                  <li>
                    <Link to="/admin/dashboard" className="block px-4 py-2 hover:bg-gray-100">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/productlist" className="block px-4 py-2 hover:bg-gray-100">
                      Product
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/categorylist" className="block px-4 py-2 hover:bg-gray-100">
                      Category
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/orderlist" className="block px-4 py-2 hover:bg-gray-100">
                      Orders
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/userlist" className="block px-4 py-2 hover:bg-gray-100">
                      Users
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                  Profile
                </Link>
              </li>
              <li>
                <button onClick={logoutHandler} className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>

      <div
        className={`fixed inset-0 z-[999] bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeSidebar}
      >
        <div
          className={`fixed left-0 top-0 bottom-0 w-64 bg-black p-4 shadow-lg transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4 mt-10 text-[4rem]">
            <h2 className="text-4xl font-bold uppercase tracking-[-4px]">Menu</h2>
            <button onClick={toggleSidebar}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <Link to="/" className="block px-4 py-2" onClick={closeSidebar}>
            <span className="material-symbols-outlined">home</span>
            <span className="relative -top-[5px] ml-2">Home</span>
          </Link>
          <Link to="/shop" className="block px-4 py-2" onClick={closeSidebar}>
            <span className="material-symbols-outlined">local_mall</span> 
            <span className="relative -top-[5px] ml-2">Shop</span>
          </Link>
          <Link to="/cart" className="block px-4 py-2 relative" onClick={closeSidebar}>
            <span className="material-symbols-outlined">shopping_cart</span>
            <span className="relative -top-[5px] ml-2">Cart</span>
            {cartItems.length > 0 && (
              <span className="absolute right-2 top-2 px-2 py-1 text-[13px] text-black bg-white rounded-full">
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            )}
          </Link>
          <Link to="/favorite" className="block px-4 py-2" onClick={closeSidebar}>
            <span className="material-symbols-outlined">favorite</span> 
            <span className="relative  -top-[5px] ml-2">Favorite</span>
          </Link>
        </div>
        
      </div>
    </nav>
  );
};

export default Navigation;
