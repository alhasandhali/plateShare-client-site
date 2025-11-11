import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link } from "react-router";

const MyFoodRequestRow = ({ req }) => {
  const { data: food } = useQuery({
    queryKey: ["food", req.food_id],
    enabled: !!req.food_id,
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/food/${req.food_id}`);
      return res.data;
    },
  });
  return (
    <tr
      key={req._id}
      className="border-b border-gray-200  hover:bg-gray-50 transition-colors"
    >
      <td className="py-3 px-4 flex items-center gap-3">
        <img
          src={food.food_image}
          alt={food.food_name}
          className="w-12 h-12 rounded object-cover"
        />
        <div>
          <Link
            to={`/food/${food._id}`}
            className="font-semibold hover:text-blue-600 hover:underline transition"
          >
            {food.food_name}
          </Link>
        </div>
      </td>

      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <img
            src={food.donator_image}
            alt={food.donator_name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-medium">{food.donator_name}</p>
            <p className="text-xs text-gray-500">{food.donator_email}</p>
          </div>
        </div>
      </td>

      <td className="py-3 px-4">{req.location}</td>
      <td className="py-3 px-4">{req.why_need_food}</td>
      <td className="py-3 px-4">{req.contact_no}</td>
      <td className="py-3 px-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
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
