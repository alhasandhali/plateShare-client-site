import React, { use, useState } from "react";
import { Link } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const ManageMyFoods = () => {
  const { user } = use(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [selectedFood, setSelectedFood] = useState(null);

  const updateFoodMutation = useMutation({
    mutationFn: async ({ foodId, updatedData }) => {
      const { data } = await axios.patch(
        `http://localhost:3000/food/${foodId}`,
        updatedData
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Food updated successfully!");
      window.location.reload();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update food");
    },
  });

  const onSubmit = (formData) => {
    if (!selectedFood) return toast.error("No food selected for update");

    const updatedData = {
      ...formData,
      food_quantity: parseInt(formData.food_quantity),
    };

    updateFoodMutation.mutate({ foodId: selectedFood._id, updatedData });
  };

  const fetchDonatorFoods = async () => {
    if (!user?.email) return [];
    const { data } = await axios.get(
      `http://localhost:3000/foods?donator_email=${user.email}`
    );
    return data;
  };

  const {
    data: donatorFood = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["donatorFoods", user?.email],
    queryFn: fetchDonatorFoods,
    enabled: !!user?.email,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading your foods...</p>
      </div>
    );
  }

  if (isError) {
    toast.error(error.message || "Failed to fetch your foods.");
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg">Error loading foods.</p>
      </div>
    );
  }

  const handleDelete = (foodId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios.delete(`http://localhost:3000/food/${foodId}`);
          toast.success("Food deleted successfully!");
          window.location.reload();
        } catch (err) {
          toast.error(err.message || "Failed to delete food.");
        }
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="md:w-11/12 m-auto py-10">
      <h1 className="montserrat font-bold text-gradient text-3xl text-center">
        My Foods
      </h1>

      <div className="mt-10 lg:mt-16">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gradient mb-6">
          Available Foods:{" "}
          <span className="font-bold">{donatorFood.length}</span>
        </h2>

        {donatorFood.length === 0 ? (
          <p className="text-center text-gray-500">
            You have not donated any foods yet.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-md">
            <table className="min-w-full border-collapse text-sm sm:text-base">
              <thead className="bg-gray-100 text-gray-700">
                <tr className="font-semibold">
                  <th className="text-left py-3 px-4">SL</th>
                  <th className="text-left py-3 px-4">Food</th>
                  <th className="text-left py-3 px-4 hidden md:table-cell">
                    Serves
                  </th>
                  <th className="text-left py-3 px-4 hidden md:table-cell">
                    Exp. Date
                  </th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-center py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {donatorFood.map((food, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-100 transition"
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
                        <p className="font-medium hover:text-blue-700 hover:underline transition">
                          {food.food_name}
                        </p>
                      </Link>
                    </td>
                    <td className="py-3 px-4">{food.food_quantity}</td>
                    <td className="py-3 px-4 hidden md:table-cell">
                      {food.expire_date}
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell">
                      <span className="badge badge-success badge-outline text-xs sm:text-sm">
                        {food.food_status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-evenly items-center">
                        <button
                          className="btn btn-warning text-white ml-3"
                          onClick={() => {
                            setSelectedFood(food);
                            reset({
                              food_name: food.food_name,
                              food_image: food.food_image,
                              food_quantity: food.food_quantity,
                              pickup_location: food.pickup_location,
                              expire_date: food.expire_date,
                              additional_notes: food.additional_notes,
                            });
                            document
                              .getElementById("updateFoodModal")
                              .showModal();
                          }}
                        >
                          Update
                        </button>

                        <button
                          className="btn btn-error text-white"
                          onClick={() => handleDelete(food._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog
        id="updateFoodModal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-gradient mb-4">
            Update Food
          </h1>
          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="flex flex-col md:col-span-2">
              <label className="font-semibold text-gradient mb-1">
                Food Name
              </label>
              <input
                {...register("food_name", {
                  required: "Food name is required",
                })}
                type="text"
                placeholder="Enter food name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5dae61]"
              />
              {errors.food_name && (
                <p className="text-red-500 text-sm">
                  {errors.food_name.message}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="font-semibold text-gradient mb-1">
                Food Image URL
              </label>
              <input
                {...register("food_image", {
                  required: "Image URL is required",
                })}
                type="url"
                placeholder="https://example.com/image.jpg"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5dae61]"
              />
              {errors.food_image && (
                <p className="text-red-500 text-sm">
                  {errors.food_image.message}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="font-semibold text-gradient mb-1">
                Quantity (Serves People)
              </label>
              <input
                {...register("food_quantity", {
                  required: "Quantity is required",
                  min: 1,
                })}
                type="number"
                min="1"
                placeholder="e.g. 4"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5dae61]"
              />
              {errors.food_quantity && (
                <p className="text-red-500 text-sm">
                  {errors.food_quantity.message}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="font-semibold text-gradient mb-1">
                Pickup Location
              </label>
              <input
                {...register("pickup_location", {
                  required: "Pickup location is required",
                })}
                type="text"
                placeholder="123 Main St, City"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5dae61]"
              />
              {errors.pickup_location && (
                <p className="text-red-500 text-sm">
                  {errors.pickup_location.message}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="font-semibold text-gradient mb-1">
                Expiration Date
              </label>
              <input
                {...register("expire_date", {
                  required: "Expiration date is required",
                })}
                type="date"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5dae61]"
              />
              {errors.expire_date && (
                <p className="text-red-500 text-sm">
                  {errors.expire_date.message}
                </p>
              )}
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="font-semibold text-gradient mb-1">
                Additional Notes
              </label>
              <textarea
                {...register("additional_notes")}
                placeholder="Add any special instructions or packaging notes..."
                rows="4"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5dae61]"
              ></textarea>
            </div>

            <div className="md:col-span-2 flex justify-center mt-2">
              <button
                type="submit"
                className="themeBtn w-fit"
                disabled={updateFoodMutation.isLoading}
              >
                <span>
                  {updateFoodMutation.isLoading ? "Updating..." : "Update"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ManageMyFoods;
