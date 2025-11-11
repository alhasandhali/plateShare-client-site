import React, { use } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import usePageTitle from "../../utilities/setPageTitle/usePageTitle";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { useQuery } from "@tanstack/react-query";

const UserDashboard = () => {
  usePageTitle("Dashboard");

  const { user, logOut } = use(AuthContext);
  const navigate = useNavigate();

  const {
    data: dbUser,
    isLoading: userLoading,
    isError: userError,
  } = useQuery({
    queryKey: ["dbUser", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axios.get(
        `http://localhost:3000/user/email/${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (err) {
      toast.error(err.message || "Failed to log out");
    }
  };

  if (userLoading) return <p className="text-center mt-10">Loading user...</p>;
  if (userError)
    return (
      <p className="text-center mt-10 text-red-500">Failed to load user data</p>
    );

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-[#f1f5f2] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-6 sm:p-8 md:p-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#3b7d5e]">
            Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="w-full sm:w-auto bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-8">
          <img
            src={dbUser?.image || user?.photoURL}
            alt={dbUser?.name || user?.displayName}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-[#5dae61]"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-lg sm:text-xl font-semibold text-[#3b7d5e]">
              {dbUser?.name || user?.displayName}
            </h2>
            <p className="text-gray-600 wrap-break-words">
              {dbUser?.email || user?.email}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
            <h3 className="font-semibold text-[#3b7d5e] mb-2">
              My Active Foods
            </h3>
            <p className="text-gray-600">5 active foods.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
            <h3 className="font-semibold text-[#3b7d5e] mb-2">My Donations</h3>
            <p className="text-gray-600">5 donations.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
            <h3 className="font-semibold text-[#3b7d5e] mb-2">My Rejections</h3>
            <p className="text-gray-600">5 rejections.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
            <h3 className="font-semibold text-[#3b7d5e] mb-2">
              My Requested Foods
            </h3>
            <p className="text-gray-600">5 requested foods.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
