import { FaArrowUp, FaBell, FaEye } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Notify } from "../notifications";
import { useAuthStore } from "../../contexts/UserContext";
import { useQuery } from "@tanstack/react-query";
import {  Sidebar } from "./sideBar";
import Yakub from "../../assets/yakub.jpg";
import { PieChart } from "../../components/pieChart";
import { BarChart } from "../../components/barChat";

// Fetch user data
export const getUserData = async (token: string) => {
  const response = await fetch("https://pwk.onrender.com/api/user/get_users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Unable to fetch user data");

  return response.json();
};

export const AdminDash = () => {
  const navigate = useNavigate();
  const [showNotify, setShowNotify] = useState(false);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user || !user.token) {
      navigate("/admin/sign_in");
    }
  }, [user, navigate]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["userData", user?.token],
    queryFn: () => getUserData(user!.token),
    enabled: !!user?.token,
  });

  const userData = Array.isArray(data?.users) ? data.users : [];

  return (
    <>
      {/* Notification */}
      {showNotify && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-start z-50"
          onClick={() => setShowNotify(false)}
        >
          <div
            className="mt-20 w-[90%] md:w-[400px] bg-white rounded-xl shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <Notify />
          </div>
        </div>
      )}

      {/* MAIN LAYOUT */}
<div className="min-h-screen grid grid-cols-1 md:grid-cols-[250px_1fr] bg-gray-50">
  
  {/* Sidebar */}
<aside
    className={`
      fixed md:relative inset-y-0 left-0 bg-white shadow-md z-50
      w-[60px] md:w-[250px] transition-all duration-300
    `}
  >    <Sidebar 
      name={userData?.name || ""} 
      image={userData?.image || Yakub} 
      
    />
  </aside>
{/* <MobileFooterNav/> */}
  {/* Main */}
  <main className="md:w-full md:overflow-x-hidden ml-[60px] md:ml-0">
    {/** All main content here */}
 
          {/* Header */}
          <div className="bg-white pt-5 flex justify-between items-center px-5">
            <p className="font-[600] py-2">Dashboard</p>
            <button onClick={() => setShowNotify(true)}>
              <FaBell size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Welcome */}
          <div className="flex justify-between items-center px-5 py-2 mb-5">
            <h1 className="text-xl lg:text-2xl font-semibold">
              Welcome back {userData?.preferedName || "Admin"}
            </h1>
          </div>

          {/* Events */}
          <p className="px-5 font-[600]">Events 🎉🏆</p>
          <aside className="px-2 md;px-5">
          <div className="relative overflow-hidden px-3 py-2">
            <div className="marquee2 gap-10">
              {["pwky 1.0", "pwky 2.0", "pwky 3.0", "pwky 4.0", "pwky 5.0"].map(
                (item, i) => (
                  <div
                    key={i}
                    className="bg-white w-[300px] px-6 gap-3 flex flex-col py-3 rounded-lg shadow"
                  >
                    <p className="flex justify-between">
                      <span>{item} 📈</span>
                      <span className="text-[12px] flex gap-3">
                        view stats <FaEye />
                      </span>
                    </p>
                    <p>
                      <span className="text-xl">1,200</span>
                    </p>
                    <p className="flex gap-2 text-[10px]">
                      <span className="text-green-600 flex gap-2">
                        12% <FaArrowUp />
                      </span>
                      <span>from last event</span>
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
</aside>
          {/* Charts */}
          <p className="font-[600] py-5 px-2 md:px-5">Users Statistics Overview</p>

<section className="grid grid-cols-1 md:grid-cols-2 gap-5 px-5 items-start">

  {/* Pie Chart */}
  <div className="bg-white rounded-lg p-5 shadow-md">
    <div className="relative w-full h-[300px]">
      <PieChart />
    </div>
  </div>

  {/* Bar Chart */}
  <div className="bg-white rounded-lg p-5 shadow-md">
    <div className="relative w-full h-[300px]">
      <BarChart />
    </div>
  </div>

</section>

          {/* Loading */}
          {isLoading && (
            <div className="mt-10 text-center text-gray-400 animate-pulse">
              Fetching your data....
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-10 text-center text-red-500">
              {(error as Error).message}
            </div>
          )}

          {/* User Table */}
          {!isLoading && !error && (
            <section className="px-5 mt-10">
              <section className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-lg font-semibold mb-6">
                  User Data Overview
                </p>

                <div className="overflow-x-auto pb-4">
                  {userData?.length === 0 ? (
                    <p className="text-gray-400 text-center py-5">
                      No user data found.
                    </p>
                  ) : (
                    <table className="min-w-full text-sm text-left border border-gray-200 rounded-lg">
                      <thead className="bg-gray-100 text-gray-700">
                        <tr>
                          <th className="px-4 py-3 font-medium">#</th>
                          <th className="px-4 py-3 font-medium">Name</th>
                          <th className="px-4 py-3 font-medium">Gender</th>
                          <th className="px-4 py-3 font-medium">LGA</th>
                          <th className="px-4 py-3 font-medium">Date Added</th>
                        </tr>
                      </thead>

                      <tbody>
                        {userData?.map((user: any, i: number) => (
                          <tr
                            key={i}
                            className={`${
                              i % 2 === 0 ? "bg-white" : "bg-gray-50"
                            } border-b border-gray-100 hover:bg-gray-100`}
                          >
                            <td className="px-4 py-3">{i + 1}</td>
                            <td className="px-4 py-3 capitalize">
                              {user.name || "N/A"}
                            </td>
                            <td className="px-4 py-3 capitalize">
                              {user.gender || "N/A"}
                            </td>
                            <td className="px-4 py-3 capitalize">
                              {user.LGA || "N/A"}
                            </td>
                            <td className="px-4 py-3 text-gray-500">
                              {user.createdAt
                                ? new Date(
                                    user.createdAt
                                  ).toLocaleDateString()
                                : "N/A"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </section>

              {/* Recent Activities */}
              <section className="flex flex-col lg:flex-row gap-10 mt-10 pb-20">
                <div className="bg-white rounded-lg p-6 w-full lg:w-1/3 shadow">
                  <p className="text-lg font-semibold">Recent Activities</p>
                  <p className="text-sm text-gray-600 mt-1">
                    No activity yet..
                  </p>
                </div>
              </section>
            </section>
          )}
        </main>
      </div>
    </>
  );
};
