// Sidebar component
import {
  MdDashboard,
  MdPerson,
  MdApps,
  MdHistory,
  MdSettings,
  MdSupport,
  MdLogout,
} from "react-icons/md";
import {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface ISide_Bar {
  name: string;
  image: string;
  login: Function;
}
const navItems = [
  { name: "Dashboard", icon: <MdDashboard size={24} />, path: "dashboard" },
  { name: "Identity", icon: <MdPerson size={24} />, path: "identity" },
  { name: "Apps", icon: <MdApps size={24} />, path: "apps" },
  { name: "History", icon: <MdHistory size={24} />, path: "history" },
  { name: "Settings", icon: <MdSettings size={24} />, path: "settings" },
  { name: "Support", icon: <MdSupport size={24} />, path: "support" },
];
export const Sidebar = ({ name, image}: ISide_Bar) => {
  const [active, setActive] = useState("dashboard");
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <aside className="hidden md:flex md:flex-col pt-5 bg-white text-gray-900 w-[260px] z-100 h-screen sticky top-0 left-0 shadow-lg">
      <div>
        {/* <div className="flex items-center gap-4 px-6 py-6">
          <img src={Logo} className="w-[48px] h-[48px] rounded-full" alt="Logo" />
          <p className="text-[20px] font-semibold text-gray-800">QUEBEC</p>
        </div> */}

        <nav className="mt-4 px-5">
          {navItems.map((item) => (
            <Link
              to={`/${item.path}`}
              key={item.name}
              onClick={() => setActive(item.path)}
              className={`flex items-center gap-4 rounded-md px-4 py-3 transition-all ${
                active === item.path
                  ? "bg-green-700 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.icon}
              <span className="text-[16px] font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="px-6 pb-6 mt-auto">
        <div className="flex items-center gap-3 mb-4">
          <img
            src={image}
            alt="User"
            className="w-[32px] h-[32px] rounded-full object-cover border border-gray-300"
          />
          <p className="text-[15px] font-medium text-gray-800">{name}</p>
        </div>

        <div
          className="flex items-center gap-3 text-red-500 cursor-pointer hover:text-red-600 transition"
          onClick={handleLogout}
        >
          <MdLogout size={20} />
          <span className="text-[15px] font-medium">Log Out</span>
        </div>
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
