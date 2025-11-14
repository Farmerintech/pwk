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
export const Sidebar = ({ name, image }:ISide_Bar) => {
  const [active, setActive] = useState("dashboard");
  const [open, setOpen] = useState(false); // mobile toggle
  const navigate = useNavigate();

  const handleLogout = () => navigate("/");

  return (
    <aside
      className={`
        fixed top-0 left-0 md:h-screen bg-white shadow-lg z-50
        flex flex-col justify-between overflow-y-auto transition-all duration-300
        ${open ? "w-64 h-[full]" : "w-[60px] h-[30px]"} 
        md:w-64  /* always full on desktop */
      `}
    >
      {/* Toggle Button (only mobile) */}
      <button
        className="md:hidden absolute top-4 right-3 text-gray-700"
        onClick={() => setOpen(!open)}
      >
        <MdMenu size={26} />
      </button>

      {/* NAV ITEMS */}
      <nav className="mt-14 px-3">
        {navItems.map((item) => (
          <Link
            to={`/${item.path}`}
            key={item.name}
            onClick={() => setActive(item.path)}
            className={`
              flex items-center gap-4 px-3 py-3 rounded-lg transition 
              ${active === item.path ? "bg-green-700 text-white" : "text-gray-800 hover:bg-gray-100"}
            `}
          >
            <span className="text-centet">{item?.icon}</span>

            {/* hide text when collapsed */}
            <span
              className={`
                text-[15px] font-medium whitespace-nowrap transition-all
                ${open ? "opacity-100 ml-1" : "opacity-0 w-0 overflow-hidden"}
                md:opacity-100 md:w-auto md:ml-1
              `}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </nav>

      {/* USER SECTION */}
      <div className="px-4 py-6 border-t border-gray-100">
        <div
          className={`
            flex items-center gap-3 mb-4 transition-all
            ${open ? "opacity-100" : "opacity-0 w-0 overflow-hidden md:opacity-100 md:w-auto"}
          `}
        >
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

          <span
            className={`
              transition-all
              ${open ? "opacity-100" : "opacity-0 w-0 overflow-hidden md:opacity-100 md:w-auto"}
            `}
          >
            Log Out
          </span>
        </button>
      </div>
    </aside>
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
