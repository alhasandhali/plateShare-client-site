import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import usePageTitle from "../../utilities/setPageTitle/usePageTitle";

const UserDetails = () => {
  const { id } = useParams();

  const [donator, setDonator] = useState([]);
  const [donatorFood, setDonatorFood] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/user/${id}`)
      .then((res) => {
        setDonator(res.data);
      })
      .catch((err) => console.error(err));

    axios
      .get(`http://localhost:3000/foods?id=${id}`)
      .then((res) => setDonatorFood(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const { name, email, image } = donator;

  usePageTitle(name);

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center">
        <img
          src={image}
          alt={name}
          className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-[#5dae61] shadow-lg object-cover"
        />
        <h1 className="text-2xl sm:text-3xl font-bold text-[#3b7d5e] mt-4">
          {name}
        </h1>
        <p className="text-gray-600 mb-4 text-sm sm:text-base">{email}</p>
      </div>
      <div className="mt-10 lg:mt-16">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gradient mb-6">
          {name}'s Donated Foods:{" "}
          <span className="font-bold">{donatorFood.length}</span>
        </h2>

        <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-md">
          <table className="min-w-full border-collapse text-sm sm:text-base">
            <thead className="bg-gray-100 text-gray-700">
              <tr className="font-semibold">
                <th className="text-left py-3 px-4">SL</th>
                <th className="text-left py-3 px-4">Food</th>
                <th className="text-left py-3 px-4">Donator</th>
                <th className="text-left py-3 px-4 hidden md:table-cell">
                  Serves
                </th>
                <th className="text-left py-3 px-4 hidden md:table-cell">
                  Exp. Date
                </th>
                <th className="text-left py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {donatorFood.map((food, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">
                    <Link
                      to={`/food/${food._id}`}
                      className="flex items-center gap-3"
                    >
                      <img
                        src={food.food_image}
                        alt={food.food_name}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-md object-cover"
                      />
                      <p className="font-medium">{food.food_name}</p>
                    </Link>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={image}
                        alt={name}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium">{name}</p>
                        <p className="text-xs text-gray-500 sm:text-sm">
                          {email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell">
                    {food.food_quantity}
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell">
                    {food.expire_date}
                  </td>
                  <td className="py-3 px-4">
                    <span className="badge badge-success badge-outline text-xs sm:text-sm">
                      {food.food_status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
