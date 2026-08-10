import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const {
    user,
    setUser,
    showUserLogin,
    setShowUserLogin,
    navigate,
    searchQuery,
    setSearchQuery,
    cartCount,
    axios,
  } = useAppContext();

  // Logout
  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");

      if (data.success) {
        setUser(null);
        navigate("/");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Navigate to Admin Login
  const goToAdmin = () => {
    setOpen(false);
    navigate("/seller");
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);

  return (
    <nav className="relative flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-200 bg-white">
      {/* Logo */}
      <Link
        to="/"
        onClick={() => setOpen(false)}
        className="text-2xl font-bold text-purple-800"
      >
        Grocery App
      </Link>

      {/* ================= DESKTOP MENU ================= */}
      <div className="hidden sm:flex items-center gap-7">
        {/* Home */}
        <Link to="/" className="hover:text-indigo-500 transition">
          Home
        </Link>

        {/* Products */}
        <Link to="/products" className="hover:text-indigo-500 transition">
          All Products
        </Link>

        {/* Search */}
        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full w-56">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />

          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.836 10.615 15 14.695"
              stroke="#7A7B7D"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              clipRule="evenodd"
              d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783"
              stroke="#7A7B7D"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Cart */}
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
              stroke="#615fff"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] flex items-center justify-center rounded-full">
            {cartCount()}
          </span>
        </div>

        {/* ================= ADMIN BUTTON ================= */}
        <button
          onClick={goToAdmin}
          className="cursor-pointer px-5 py-2 border border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white transition rounded-full"
        >
          Admin
        </button>

        {/* ================= USER ================= */}
        {user ? (
          <div className="relative group">
            <img
              src={assets.profile_icon}
              alt="Profile"
              className="w-10 cursor-pointer"
            />

            <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow-lg border border-gray-200 py-2 w-32 rounded-md z-40 text-sm">
              <li
                onClick={() => navigate("/my-orders")}
                className="p-2 cursor-pointer hover:bg-gray-100"
              >
                My Orders
              </li>

              <li
                onClick={logout}
                className="cursor-pointer p-2 hover:bg-gray-100"
              >
                Logout
              </li>
            </ul>
          </div>
        ) : (
          <button
            onClick={() => {
              setOpen(false);
              setShowUserLogin(true);
            }}
            className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
          >
            Login
          </button>
        )}
      </div>

      {/* ================= MOBILE RIGHT SIDE ================= */}
      <div className="flex items-center gap-6 sm:hidden">
        {/* Mobile Cart */}
        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/cart")}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1-1.167 0"
              stroke="#615fff"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] flex items-center justify-center rounded-full">
            {cartCount()}
          </span>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          className="sm:hidden cursor-pointer"
        >
          {open ? (
            // X icon
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 6L18 18"
                stroke="#426287"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M18 6L6 18"
                stroke="#426287"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            // Menu icon
            <svg
              width="21"
              height="15"
              viewBox="0 0 21 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="21" height="1.5" rx=".75" fill="#426287" />

              <rect
                x="8"
                y="6"
                width="13"
                height="1.5"
                rx=".75"
                fill="#426287"
              />

              <rect
                x="6"
                y="13"
                width="15"
                height="1.5"
                rx=".75"
                fill="#426287"
              />
            </svg>
          )}
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-full left-0 w-full bg-white shadow-lg py-5 flex-col gap-4 px-6 text-sm z-50 sm:hidden`}
      >
        {/* Home */}
        <Link
          onClick={() => setOpen(false)}
          to="/"
          className="hover:text-indigo-500"
        >
          Home
        </Link>

        {/* Products */}
        <Link
          onClick={() => setOpen(false)}
          to="/products"
          className="hover:text-indigo-500"
        >
          Products
        </Link>

        {/* Admin */}
        <button
          onClick={goToAdmin}
          className="text-left text-indigo-500 font-medium hover:text-indigo-700"
        >
          Admin
        </button>

        {/* User */}
        {user ? (
          <>
            <button
              onClick={() => {
                setOpen(false);
                navigate("/my-orders");
              }}
              className="text-left hover:text-indigo-500"
            >
              My Orders
            </button>

            <button
              onClick={() => {
                setOpen(false);
                logout();
              }}
              className="text-left hover:text-red-500"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              setOpen(false);
              setShowUserLogin(true);
            }}
            className="cursor-pointer w-fit px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
