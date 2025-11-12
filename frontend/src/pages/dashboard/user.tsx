import { Input } from "../../components/input";
import { FaBell } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Notify } from "../notifications";
import { useAuthStore } from "../../contexts/UserContext";
import { useQuery } from "@tanstack/react-query";
import { MobileFooterNav, Sidebar } from "./sideBar";
import Yakub from "../../assets/yakub.jpg"

export const getUserData = async (token: string) => {
  const response = await fetch(
    "https://pwk.onrender.com/api/user/get_user",
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

export const Dash = () => {
  const navigate = useNavigate();
  const [showNotify, setShowNotify] = useState(false);

  const user = useAuthStore((state) => state.user);
  useEffect(() =>{
    if(!user || !user.token){
      navigate("/sign_in")
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
        <main className="flex-1 mt-5 md:mt-8 lg:mt-0 w-full px-6 lg:px-10 py-10">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl lg:text-3xl font-semibold">
              Welcome {userData?.preferedName || "User"}
            </h1>
            <button onClick={() => setShowNotify(true)}>
              <FaBell size={28} className="text-gray-600" />
            </button>
          </div>
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

                  <div>
                    <p className="font-semibold mb-4">Stored information</p>

                    <div className="space-y-4">
                                  <aside className="flex-1 bg-white p-6 rounded-2xl mb-8 xl:mb-0">
                                    <h2 className="text-gray-900 text-xl font-semibold mb-4">
                                      Personal Details
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                      <Input
                                        label="Full Name"
                                        name="name"
                                        placeholder="Enter your full name"
                                        value={userData?.name}
                                        action={()=>{}}
                                      />
                                      <Input
                                        label="Date of Birth"
                                        name="DOB"
                                        type="text"
                                        placeholder="mm/dd"
                                        value={userData?.DOB}
                                        action={()=>{}}
                                      />
                                      <div className="flex flex-col">
                                        <label className="text-gray-900 text-sm mb-2">Gender</label>
                                        <select
                                          name="gender"
                                          value={userData?.gender}
                                          onChange={()=>{}}
                                          className="w-full bg-stone-50 outline-none text-gray-900 py-3 px-5 rounded-lg focus:ring-2 focus:ring-green-500"
                                        >
                                          <option value="" disabled>Select Your Gender</option>
                                          <option value="Male">Male</option>
                                          <option value="Female">Female</option>
                                        </select>
                                      </div>
                                      <Input
                                        label="Preferred Name"
                                        name="preferedName"
                                        placeholder="Enter your nickname"
                                        value={userData?.preferedName}
                                        action={()=>{}}
                                      />
                                    </div>
                                  </aside>
                      
                                  {/* Contact & Security */}
                                  <aside className="flex-1 bg-white p-6 rounded-2xl">
                                    <h2 className="text-gray-900 text-xl font-semibold mb-4">
                                      Contact & Security
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                      <Input
                                        label="Email Address"
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={userData?.email}
                                        action={()=>{}}
                                      />
                                      <Input
                                        label="Phone Number"
                                        name="phoneNumber"
                                        type="tel"
                                        placeholder="+234..."
                                        value={userData?.phoneNumber}
                                        action={()=>{}}
                                      />
                                    </div>
                      
                                    <div className="mt-6">
                                      <label className="text-gray-900 text-sm mb-2 block">LGA</label>
                                      {/* <select
                                        name="LGA"
                                        value={userData?.LGA}
                                        onChange={()=>{}}
                                        className="w-full bg-stone-100 text-gray-900 py-3 px-5 rounded-lg focus:ring-2 outline-none focus:ring-green-500"
                                      >
                                        <option value="" disabled>Select Your Local Government</option>
                                        {LGAs.map(lga => (
                                          <option key={lga} value={lga}>{lga}</option>
                                        ))}
                                      </select> */}
                                    </div>
                      
                                    {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                      <p>Change Password</p>
                                      <Input
                                        label="Password"
                                        name="password"
                                        placeholder="************"
                                        type="password"
                                        value={userData?.password}
                                        action={()=>{}}
                                      />
                                      <Input
                                        label="Confirm Password"
                                        name="confirmPsw"
                                        placeholder="************"
                                        type="password"
                                        value={userData?.confirmPsw}
                                        action={()=>{}}
                                      />
                                    </div> */}
                                  </aside>
                      
                    </div>
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
