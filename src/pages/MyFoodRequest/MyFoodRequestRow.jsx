import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link } from "react-router";

const MyFoodRequestRow = ({ req }) => {
  const { data: food, isLoading } = useQuery({
    queryKey: ["food", req.food_id],
    enabled: !!req.food_id,
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/food/${req.food_id}`);
      return res.data;
    },
  });
  if (isLoading || !food) {
    return (
      <tr className="animate-pulse border-b border-gray-200">
        <td className="py-3 px-4 flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-200 rounded" />
          <div className="w-24 h-4 bg-gray-200 rounded" />
        </td>
        <td className="py-3 px-4 hidden sm:table-cell">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full" />
            <div className="w-20 h-4 bg-gray-200 rounded" />
          </div>
        </td>
        <td className="py-3 px-4 hidden md:table-cell">
          <div className="w-20 h-4 bg-gray-200 rounded" />
        </td>
        <td className="py-3 px-4 hidden lg:table-cell">
          <div className="w-24 h-4 bg-gray-200 rounded" />
        </td>
        <td className="py-3 px-4 hidden md:table-cell">
          <div className="w-16 h-4 bg-gray-200 rounded" />
        </td>
        <td className="py-3 px-4">
          <div className="w-16 h-6 bg-gray-200 rounded-full" />
        </td>
      </tr>
    );
  }

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <td className="py-3 px-3 sm:px-4 flex items-center gap-3 min-w-40">
        <img
          src={food?.food_image || "/placeholder.jpg"}
          alt={food?.food_name || "Food"}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover"
        />
        <div>
          <Link
            to={`/food/${food._id}`}
            className="font-semibold hover:text-blue-600 hover:underline transition text-sm sm:text-base"
          >
            {food.food_name}
          </Link>
        </div>
      </td>
      <td className="py-3 px-3 sm:px-4 hidden sm:table-cell">
        <div className="flex items-center gap-2">
          <img
            src={food.donator_image}
            alt={food.donator_name}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-medium text-sm sm:text-base">
              {food.donator_name}
            </p>
            <p className="text-xs text-gray-500">{food.donator_email}</p>
          </div>
        </div>
      </td>
      <td className="py-3 px-3 sm:px-4 hidden md:table-cell text-sm">
        {req.location}
      </td>
      <td className="py-3 px-3 sm:px-4 hidden lg:table-cell text-sm">
        {req.why_need_food}
      </td>
      <td className="py-3 px-3 sm:px-4 hidden md:table-cell text-sm">
        {req.contact_no}
      </td>
      <td className="py-3 px-3 sm:px-4 text-sm">
        <span
          className={`px-3 py-1 rounded-full font-semibold capitalize ${
            req.status === "accepted"
              ? "bg-green-100 text-green-600"
              : req.status === "rejected"
              ? "bg-red-100 text-red-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {req.status}
        </span>
      </td>
    </tr>
  );
};

export default MyFoodRequestRow;
