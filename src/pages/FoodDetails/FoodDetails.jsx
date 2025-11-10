import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

const FoodDetails = () => {
  const { id } = useParams();
  const [food, setFood] = useState([]);
  const [donator, setDonator] = useState([]);
  const [requestedFood, setRequestedFood] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/food/${id}`)
      .then((res) => {
        setFood(res.data);
        if (res.data.user_id) {
          axios
            .get(`http://localhost:3000/user/${res.data.user_id}`)
            .then((userRes) => setDonator(userRes.data))
            .catch((err) => console.error("Error fetching donator:", err));
        }
      })
      .catch((err) => console.error("Error fetching food:", err));

    axios
      .get(`http://localhost:3000/requested-foods?food_id=${id}`)
      .then((res) => {
        setRequestedFood(res.data);
      })
      .catch((err) => console.error("Error fetching requested food:", err));
  }, [id]);

  const {
    food_name,
    food_image,
    food_quantity,
    pickup_location,
    expire_date,
    additional_notes,
    user_id,
    food_status,
  } = food;

  const { name, email, image } = donator;

  return (
    <div className="w-11/12 max-w-7xl mx-auto py-10 sm:py-16">
      <div className="bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2">
            <img
              src={food_image}
              alt={food_name}
              className="w-full h-64 sm:h-80 md:h-96 lg:h-full object-cover"
            />
          </div>
          <div className="w-full lg:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#3b7d5e] mb-3">
              {food_name}
            </h1>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold text-[#5dae61]">Serves:</span>{" "}
              {food_quantity} people
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold text-[#5dae61]">Pickup:</span>{" "}
              {pickup_location}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold text-[#5dae61]">Expires:</span>{" "}
              {expire_date}
            </p>
            <p className="text-gray-600 mb-4">
              <span className="font-semibold text-[#5dae61]">Notes:</span>{" "}
              {additional_notes}
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              <span
                className={`px-4 py-2 rounded-full font-semibold text-sm ${
                  food_status === "Available"
                    ? "bg-[#5dae61]/20 text-[#5dae61]"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {food_status}
              </span>

              <Link to="/" className="themeBtn w-fit">
                <span className="w-auto">Request Food</span>
              </Link>
            </div>
          </div>
        </div>
        {donator && (
          <div className="p-6 border-t lg:border-t-0 lg:border-l border-gray-200 flex flex-col sm:flex-row lg:flex-col justify-center items-center gap-5 bg-gray-50">
            <h2 className="text-2xl font-bold text-[#3b7d5e] text-center">
              Food Donator
            </h2>

            <Link
              to={`/user/${user_id}`}
              className="flex flex-col sm:flex-row lg:flex-col items-center gap-4 text-center"
            >
              <img
                src={image}
                alt={name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-[#5dae61] object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold text-[#183153]">{name}</h3>
                <p className="text-gray-600 text-sm">{email}</p>
              </div>
            </Link>
          </div>
        )}
      </div>
      <div className="pt-10 sm:pt-16">
        <h1 className="montserrat text-2xl sm:text-3xl text-gradient mb-6">
          {food_name}'s Requesters:{" "}
          <span className="font-bold">{requestedFood.length}</span>
        </h1>

        <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-md bg-white">
          <table className="min-w-full text-sm sm:text-base">
            <thead className="bg-gray-100 border-b border-b-gray-300 font-medium text-[#3b7d5e]">
              <tr>
                <th className="text-left py-3 px-4">SL No</th>
                <th className="text-left py-3 px-4">Receiver</th>
                <th className="text-left py-3 px-4">Donator</th>
                <th className="text-left py-3 px-4">Location</th>
                <th className="text-left py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {requestedFood.map((reqFood, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-100 transition-colors"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={reqFood.user_image}
                        alt={reqFood.user_name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium">{reqFood.user_name}</p>
                        <p className="text-gray-500 text-sm">
                          {reqFood.user_email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={image}
                        alt={name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium">{name}</p>
                        <p className="text-gray-500 text-sm">{email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">{reqFood.location}</td>
                  <td className="py-3 px-4">
                    <span className="badge badge-warning badge-outline">
                      {reqFood.status}
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

export default FoodDetails;
