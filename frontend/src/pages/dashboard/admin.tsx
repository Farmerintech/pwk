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
    "https://pwk.onrender.com/admin/get_admin",
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
  const userData = data?.user || null;
  console.log(userData?.user)
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

              {/* Profile Section */}
              <section className="flex flex-col lg:flex-row gap-10 mt-10">
                <div className="bg-white rounded-lg p-6 flex-1 shadow">
                  <div className="flex justify-between mb-6">
                    <div>
                      <p className="text-sm text-green-600 font-medium">
                        Nick Name
                      </p>
                      <small className="text-gray-600">
                        {userData?.preferedName}
                      </small>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <img
                      src={userData?.image || Yakub}
                      className="w-[100px] h-[100px] rounded-full object-cover border"
                      alt="User"
                    />
                    {/* <button className="px-4 py-2 bg-green-500 text-white rounded">
                      {/* Edit Profile 
                    </button> */}
                  </div>
                </div>

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
