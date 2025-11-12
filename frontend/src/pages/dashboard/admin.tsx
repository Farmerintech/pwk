import { FaBell } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Notify } from "../notifications";
import { useAuthStore } from "../../contexts/UserContext";
import { useQuery } from "@tanstack/react-query";
import { MobileFooterNav, Sidebar } from "./sideBar";
import Yakub from "../../assets/yakub.jpg"
import { PieChart } from "../../components/pieChart";
import { BarChart } from "../../components/barChat";

export const getUserData = async (token: string) => {
  const response = await fetch(
    "https://pwk.onrender.com/user/get_users",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Unable to fetch user data");
  }

  return response.json(); // return raw API data
};

export const AdminDash = () => {
  const navigate = useNavigate();
  const [showNotify, setShowNotify] = useState(false);

  const user = useAuthStore((state) => state.user);
  useEffect(() =>{
    if(!user || !user.token){
      navigate("admin//sign_in")
    }
  })
  // ✅ Fetch user data WITH React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["userData", user?.token],
    queryFn: () => getUserData(user!.token),
    enabled: !!user?.token,
  });

  // ✅ Clean computed data
  const userData = data?.users || null;
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

      <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 text-gray-900">
        {/* Sidebar */}
        <Sidebar name={userData?.name || ""} image={userData?.image || Yakub} login={()=>{}} />
          <MobileFooterNav/>
        {/* Main Content */}
        <main className="flex-1 mt-5 md:mt-8 lg:mt-0 w-full px-6 lg:px-10 pt-5 pb-10">
          {/* Header */}
          <div className="flex justify-between items-center  px-5 py-5 mb-5 rounded-[8px]">
            <h1 className="text-2xl lg:text-3xl font-semibold">
              Welcome {userData?.preferedName || "Admin"}
            </h1>
            <button onClick={() => setShowNotify(true)}>
              <FaBell size={28} className="text-gray-600" />
            </button>
          </div>      
<p className="text-[36px] font-[600] mb-4">Overview</p>

<section className="flex flex-col md:flex-row justify-center gap-5 items-start">
  {/* Pie Chart */}
  <div className="w-full md:w-1/2 bg-white rounded-[8px] p-5 shadow-md">
    <div className="relative w-full h-[300px] ">
      <PieChart />
    </div>
  </div>

  {/* Bar Chart */}
  <div className="w-full md:w-1/2 bg-white rounded-[8px] p-5 shadow-md">
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

          {/* Main Content */}
          {!isLoading && !error && (
            <>
              {/* <UserStatusChart /> */}
<section className="bg-white mt-10 p-6 rounded-lg shadow-md">
  <p className="text-lg font-semibold mb-6">User Data Overview</p>

  <div className="overflow-x-auto pb-4">
    {userData?.length === 0 ? (
      <p className="text-gray-400 text-center py-5">
        No user data found.
      </p>
    ) : (
      <table className="min-w-full text-sm text-left border border-gray-200 rounded-lg overflow-hidden">
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
          {userData.map((user: any, i: number) => (
            <tr
              key={i}
              className={`${
                i % 2 === 0 ? "bg-white" : "bg-gray-50"
              } border-b border-gray-100 hover:bg-gray-100`}
            >
              <td className="px-4 py-3">{i + 1}</td>
              <td className="px-4 py-3 capitalize">{user.name || "N/A"}</td>
              <td className="px-4 py-3 capitalize">{user.gender || "N/A"}</td>
              <td className="px-4 py-3 capitalize">{user.lga || "N/A"}</td>
              <td className="px-4 py-3 text-gray-500">
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
</section>

              {/* Profile Section */}
              <section className="flex flex-col lg:flex-row gap-10 mt-10">


                <div className="bg-white rounded-lg p-6 w-full lg:w-1/3 shadow">
                  <p className="text-lg font-semibold">Recent Activities</p>
                  <p className="text-sm text-gray-600 mt-1">
                    No activity yet..
                  </p>
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    </>
  );
};
