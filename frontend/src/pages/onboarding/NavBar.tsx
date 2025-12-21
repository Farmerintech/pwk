import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes, FaChevronRight } from "react-icons/fa";
import { useAuthStore } from "../../contexts/UserContext";
import PWKYLOGO from "../../assets/pwkylogo.jpg";

export const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = useAuthStore((state) => state.user);

  return (
    <>
      {/* ================= NAV BAR ================= */}
      <nav className="fixed top-0 left-0 w-full z-50">
        <div className="
          mx-4 mt-4 flex items-center justify-between
          rounded-full px-4 py-2
          bg-black/30 backdrop-blur-xl backdrop-saturate-150
          border border-white/10
        ">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src={PWKYLOGO}
              alt="PWKY"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-white font-semibold text-sm hidden sm:block">
              PWKY
            </span>
          </div>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8 text-white font-semibold">
            <li><Link to="/">Home</Link></li>
            <li>
              {user?.role ? (
                <Link to={`/${user.role}/dashboard`}>Dashboard</Link>
              ) : (
                <Link to="/sign_in">Dashboard</Link>
              )}
            </li>
            <li><Link to="/sign_up/user">Sign Up</Link></li>
            <li><Link to="/sign_in">Sign In</Link></li>
            <li className="px-4 py-2 rounded-full bg-blue-700 hover:bg-blue-800 transition">
              <Link to="/blog">Blog</Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <FaBars size={18} />
          </button>
        </div>
      </nav>

      {/* ================= MOBILE DRAWER ================= */}
      <div
        className={`
          fixed top-0 right-0 h-full w-[85%] max-w-sm z-50
          bg-black/40 backdrop-blur-2xl backdrop-saturate-150
          border-l border-white/10
          transform transition-transform duration-300
          ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Close */}
        <div className="flex justify-end p-6">
          <button onClick={() => setIsMobileMenuOpen(false)}>
            <FaTimes size={18} className="text-white" />
          </button>
        </div>

        {/* Links */}
        <ul className="flex flex-col gap-6 px-8 text-white text-lg font-semibold">
          <li onClick={() => setIsMobileMenuOpen(false)}>
            <Link to="/">Home</Link>
          </li>

          <li onClick={() => setIsMobileMenuOpen(false)}>
            {user?.role ? (
              <Link to={`/${user.role}/dashboard`}>Dashboard</Link>
            ) : (
              <Link to="/sign_in">Dashboard</Link>
            )}
          </li>

          <li onClick={() => setIsMobileMenuOpen(false)}>
            <Link to="/sign_up/user">Sign Up</Link>
          </li>

          <li onClick={() => setIsMobileMenuOpen(false)}>
            <Link to="/sign_in">Sign In</Link>
          </li>

          <li className="mt-6">
            <Link
              to="/blog"
              className="flex items-center justify-between
              bg-blue-700 hover:bg-blue-800 transition
              px-5 py-3 rounded-full"
            >
              Blog
              <FaChevronRight />
            </Link>
          </li>
        </ul>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};
