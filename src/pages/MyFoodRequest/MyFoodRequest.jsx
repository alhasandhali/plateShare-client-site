import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";
import usePageTitle from "../../utilities/setPageTitle/usePageTitle";
import { use } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import MyFoodRequestRow from "./MyFoodRequestRow";
import CustomLoader from "../../components/CustomLoader/CustomLoader";

const MyFoodRequest = () => {
  const { user } = use(AuthContext);
  usePageTitle("My Food Requests");

  const {
    data: myRequests = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myRequests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const idToken = await user.getIdToken();
      const res = await axios.get(
        `http://localhost:3000/requested-foods?email=${user.email}`,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
      return res.data;
    },
  });

  if (isLoading) return <CustomLoader />;

  if (!myRequests.length)
    return (
      <div className="flex flex-col justify-center items-center py-20 text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076500.png"
          alt="No requests"
          className="w-32 h-32 mb-4 opacity-80"
        />
        <h2 className="text-xl font-semibold text-gray-600">
          You haven’t requested any food yet.
        </h2>
        <Link to="/available-foods" className="themeBtn mt-4">
          <span>Browse Available Foods</span>
        </Link>
      </div>
    );

  return (
    <div className="w-11/12 max-w-7xl mx-auto py-10 sm:py-16">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3b7d5e] mb-8 text-center">
        My Food Requests ({myRequests.length})
      </h1>
      {isLoading ? (
        <div className="col-span-full flex justify-center">
          <CustomLoader />
        </div>
      ) : isError ? (
        <p className="col-span-full text-center text-red-500 mt-8">
          Failed to reques foods. Please try again later.
        </p>
      ) : myRequests.length === 0 ? (
        <p className="text-center text-gray-500 text-base sm:text-lg mt-8">
          You haven’t requested any food yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-md bg-white">
          <table className="min-w-full text-sm sm:text-base">
            <thead className="bg-gray-100 border-b border-b-gray-300 font-medium text-[#3b7d5e]">
              <tr>
                <th className="py-3 px-3 sm:px-4 text-left">Food</th>
                <th className="py-3 px-3 sm:px-4 text-left hidden sm:table-cell">
                  Donator
                </th>
                <th className="py-3 px-3 sm:px-4 text-left hidden md:table-cell">
                  Location
                </th>
                <th className="py-3 px-3 sm:px-4 text-left hidden lg:table-cell">
                  Reason
                </th>
                <th className="py-3 px-3 sm:px-4 text-left hidden md:table-cell">
                  Contact
                </th>
                <th className="py-3 px-3 sm:px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {myRequests.map((req) => (
                <MyFoodRequestRow key={req._id} req={req} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyFoodRequest;
