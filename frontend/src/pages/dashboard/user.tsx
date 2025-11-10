import { Input } from "../../components/input";
import {
  MdDashboard,
  MdPerson,
  MdApps,
  MdHistory,
  MdSettings,
  MdSupport,
  MdLogout,
} from "react-icons/md";
import { FaBell } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { Notify } from "../notifications";

interface KYCData {
  fullName: string;
  email: string;
  dob: string;
  ID: {
    type: string;
    number: string | number;
  };
  NIN: string;
  phone: string;
  walletAddress: string;
  residentialAddress: string;
  image: string;
}

interface ITABLE {
  appName: string;
  date: string | number | Date;
  status: string;
}

const navItems = [
  { name: "Dashboard", icon: <MdDashboard size={24} />, path: "dashboard" },
  { name: "Identity", icon: <MdPerson size={24} />, path: "identity" },
  { name: "Apps", icon: <MdApps size={24} />, path: "apps" },
  { name: "History", icon: <MdHistory size={24} />, path: "history" },
  { name: "Settings", icon: <MdSettings size={24} />, path: "settings" },
  { name: "Support", icon: <MdSupport size={24} />, path: "support" },
];

export const Dash = () => {
  const { user, login } = useUser();
  const navigate = useNavigate();

  const [kycData, setKycData] = useState<KYCData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [uniqueId, setUniqueId] = useState<string | null>(null);
  const [showNotify, setShowNotify] = useState<boolean>(false);
  const [tableData, setTableData] = useState<ITABLE[]>([]);

  useEffect(() => {
    if (!user?.role || !user?.token) {
      // navigate("/sign_in");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchKYCData = async () => {
      if (!user?.token) return;

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://quebec-ur3w.onrender.com/api/kyc/user/${"hh"}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch KYC data");

        const data = await response.json();
        setKycData(data?.kycDetails || null);
        setUniqueId(data?.kycDetails?.uniqueId || null);
        setTableData(data?.thirdarty || []);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchKYCData();
  }, [user?.token]);

  return (
    <>
      {/* Notification overlay */}
      {showNotify && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-start z-50"
          onClick={() => setShowNotify(false)}
        >
          <div
            className="mt-20 w-[90%] md:w-[400px] bg-white rounded-xl shadow-lg transition-all duration-500 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            <Notify />
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 text-gray-900">
        {/* Sidebar */}
        <Sidebar name={kycData?.fullName || ""} image={kycData?.image || ""} login={login} />

        {/* Mobile Footer Nav */}
        <MobileFooterNav />

        {/* Main Content */}
        <main className="flex-1 mt-5 md:mt-8 lg:mt-0 w-full px-6 lg:px-10 py-10">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl lg:text-3xl font-semibold text-gray-800">
              Welcome {kycData?.fullName || "User"}
            </h1>
            <button onClick={() => setShowNotify(true)}>
              <FaBell size={28} className="text-gray-600" />
            </button>
          </div>

          {/* Loading/Error */}
          {loading && (
            <div className="mt-10 text-center text-gray-400 animate-pulse">
              Fetching your data...
            </div>
          )}
          {error && (
            <div className="mt-10 text-center text-red-500">⚠️ {error}</div>
          )}

          {!loading && !error && (
            <>
              {/* Profile Section */}
              <section className="flex flex-col lg:flex-row gap-10 mt-10">
                {/* Profile Card */}
                <div className="bg-white rounded-lg p-6 flex-1 shadow">
                  <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                    <div>
                      <p className="text-sm text-green-600 font-medium">
                        Wallet Address
                      </p>
                      <small className="text-gray-600">
                        {kycData?.walletAddress || "N/A"}
                      </small>
                    </div>
                    <div>
                      <p className="text-sm text-green-600 font-medium">Unique ID</p>
                      <p className="text-gray-800">{uniqueId || "N/A"}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <img
                      src={kycData?.image}
                      className="w-[100px] h-[100px] rounded-full object-cover border border-gray-300"
                      alt="User"
                    />
                    <button className="px-4 py-2 rounded text-sm bg-green-500 text-white hover:bg-green-600">
                      Edit Profile
                    </button>
                  </div>

                  <div>
                    <p className="font-semibold mb-4 text-gray-800">Stored KYC Data</p>
                    <div className="space-y-4">
                      <Input
                        placeholder=""
                        label="Full Name"
                        value={kycData?.fullName || ""}
                        name="fullName"
                        action={() => {}}
                      />
                      <Input
                        placeholder=""
                        label="Date of Birth"
                        value={kycData?.dob || ""}
                        name="dob"
                        action={() => {}}
                      />
                      <Input
                        placeholder=""
                        label="Email"
                        value={kycData?.email || ""}
                        name="email"
                        action={() => {}}
                      />
                      <Input
                        placeholder=""
                        label="ID Type"
                        value={kycData?.ID?.type || ""}
                        name="idType"
                        action={() => {}}
                      />
                      <Input
                        placeholder=""
                        label="ID Number"
                        value={kycData?.ID?.type || ""}
                        name="idNumber"
                        action={() => {}}
                      />
                      <Input
                        placeholder=""
                        label="Phone"
                        value={kycData?.phone || ""}
                        name="phone"
                        action={() => {}}
                      />
                      <Input
                        placeholder=""
                        label="Address"
                        value={kycData?.residentialAddress || ""}
                        name="residentialAddress"
                        action={() => {}}
                      />
                    </div>
                  </div>
                </div>

                {/* Access Management */}
                <div className="bg-white rounded-lg p-6 w-full lg:w-1/3 shadow">
                  <p className="text-lg font-semibold mb-4 text-gray-800">
                    Access Management
                  </p>
                  <p className="text-sm text-gray-600">
                    Manage third-party access permissions.
                  </p>
                </div>
              </section>

              {/* Access History Table */}
              <section>
                <p className="mt-10 text-lg font-semibold text-gray-800">Access History</p>
                <div className="overflow-x-auto mt-8 pb-20">
                  {tableData.length === 0 ? (
                    <p className="text-gray-500 text-center py-5">
                      No access history found.
                    </p>
                  ) : (
                    <table className="min-w-full text-sm text-left rounded overflow-hidden shadow">
                      <thead className="bg-gray-200 text-gray-800">
                        <tr>
                          <th className="px-4 py-3">App Name</th>
                          <th className="px-4 py-3">Date</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableData.map((row, i) => (
                          <tr key={i} className="bg-white border-b border-gray-200">
                            <td className="px-4 py-3">{row.appName}</td>
                            <td className="px-4 py-3">
                              {new Date(row.date).toLocaleDateString()}
                            </td>
                            <td
                              className={`px-4 py-3 font-semibold ${
                                row.status === "Granted"
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              {row.status}
                            </td>
                            <td className="px-4 py-3">
                              <button
                                className={`font-semibold ${
                                  row.status === "Granted"
                                    ? "text-red-500 hover:text-red-600"
                                    : "text-green-500 hover:text-green-600"
                                }`}
                              >
                                {row.status === "Granted" ? "Revoke access" : "Grant access"}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    </>
  );
};

// Sidebar component
interface ISide_Bar {
  name: string;
  image: string;
  login: Function;
}

export const Sidebar = ({ name, image, login }: ISide_Bar) => {
  const [active, setActive] = useState("dashboard");
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    login({ id: "", email: "", role: "", token: "" });
  };

  return (
    <aside className="hidden md:flex md:flex-col bg-white text-gray-900 w-[260px] h-screen sticky top-0 left-0 shadow-lg">
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
                  ? "bg-green-500 text-white"
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
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white flex justify-between px-4 py-2 border-t border-gray-300 shadow-inner z-50">
      {mobileNavItems.map((item) => (
        <button
          key={item.name}
          onClick={() => setActive(item.path)}
          className={`flex flex-col items-center justify-center flex-1 py-1 ${
            active === item.path ? "text-green-500" : "text-gray-600"
          }`}
        >
          {item.icon}
          <span className="text-xs mt-1">{item.name}</span>
        </button>
      ))}
    </nav>
  );
};
