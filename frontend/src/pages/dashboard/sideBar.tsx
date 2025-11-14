import {
  MdDashboard,
  MdPerson,
  MdApps,
  MdHistory,
  MdSettings,
  MdSupport,
  MdLogout,
  MdMenu,
} from "react-icons/md";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const navItems = [
  { name: "Dashboard", icon: <MdDashboard size={24} />, path: "dashboard" },
  { name: "Identity", icon: <MdPerson size={24} />, path: "identity" },
  { name: "Apps", icon: <MdApps size={24} />, path: "apps" },
  { name: "History", icon: <MdHistory size={24} />, path: "history" },
  { name: "Settings", icon: <MdSettings size={24} />, path: "settings" },
  { name: "Support", icon: <MdSupport size={24} />, path: "support" },
];

interface ISide_Bar {
  name: string;
  image: string;
}

export const Sidebar = ({ name, image }: ISide_Bar) => {
  const [active, setActive] = useState("dashboard");
  const [open, setOpen] = useState(false); // mobile toggle
  const navigate = useNavigate();

  const handleLogout = () => navigate("/");

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded shadow"
        onClick={() => setOpen(true)}
      >
        <MdMenu size={28} />
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-50
          transform transition-transform duration-300
          md:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Close Button on Mobile */}
        <button
          className="md:hidden absolute top-4 right-4 text-gray-700"
          onClick={() => setOpen(false)}
        >
          ✕
        </button>

        {/* Nav Items */}
        <nav className="mt-16 px-4 flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              to={`/${item.path}`}
              key={item.name}
              onClick={() => setActive(item.path)}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition 
                ${active === item.path ? "bg-green-700 text-white" : "text-gray-800 hover:bg-gray-100"}
              `}
            >
              {item.icon}
              <span className="text-[15px] font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* User Section */}
        <div className="absolute bottom-0 w-full px-4 py-6 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={image}
              alt="User"
              className="w-9 h-9 rounded-full object-cover border"
            />
            <p className="font-medium text-gray-900">{name}</p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-red-500 hover:text-red-600"
          >
            <MdLogout size={20} />
            <span className="text-[15px] font-medium">Log Out</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile when sidebar open */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
};
// Mobile Footer Nav
const mobileNavItems = [
  { name: "Dashboard", icon: <MdDashboard size={24} />, path: "dashboard" },
  { name: "Identity", icon: <MdPerson size={24} />, path: "identity" },
  { name: "Apps", icon: <MdApps size={24} />, path: "apps" },
  { name: "History", icon: <MdHistory size={24} />, path: "history" },
  { name: "Settings", icon: <MdSettings size={24} />, path: "settings" },
];

export const MobileFooterNav = () => {
  const [active, setActive] = useState("dashboard");

  return (
    <nav className="md:hidden fixed bottom-0 pt-5 left-0 w-full bg-white flex justify-between px-4 py-2 border-t border-gray-300 shadow-inner z-50">
      {mobileNavItems.map((item) => (
        <button
          key={item.name}
          onClick={() => setActive(item.path)}
          className={`flex flex-col items-center justify-center flex-1 py-1 ${
            active === item.path ? "text-green-700" : "text-gray-600"
          }`}
        >
          {item.icon}
          <span className="text-xs mt-1">{item.name}</span>
        </button>
      ))}
    </nav>
  );
};
