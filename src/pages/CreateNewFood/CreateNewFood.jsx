import React, { use } from "react";
import usePageTitle from "../../utilities/setPageTitle/usePageTitle";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import CustomLoader from "../../components/CustomLoader/CustomLoader";

const CreateNewFood = () => {
  usePageTitle("New Food");

  const { user } = use(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const addFoodMutation = useMutation({
    mutationFn: async (foodData) => {
      const idToken = await user.getIdToken();
      const { data } = await axios.post(
        "http://localhost:3000/food",
        foodData,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Food added successfully!");
      navigate("/manage-my-foods");
      reset();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add food");
    },
  });

  const onSubmit = async (formData) => {
    if (!user) {
      toast.error("You must be logged in to add food");
      return;
    }

    try {
      const { data: dbUser } = await axios.get(
        `http://localhost:3000/user/email/${user.email}`
      );

      const foodData = {
        ...formData,
        food_quantity: parseInt(formData.food_quantity),
        user_id: dbUser._id,
        donator_name: dbUser.name,
        donator_email: dbUser.email,
        donator_image: dbUser.image,
        food_status: "Available",
      };

      addFoodMutation.mutate(foodData);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        toast.error("User not found in database!");
      } else {
        toast.error("Error fetching user info");
      }
      console.error(err);
    }
  };

  return (
    <div className="relative">
      {addFoodMutation.isLoading && (
        <div className="absolute inset-0 bg-white/70 flex justify-center items-center z-50">
          <CustomLoader />
        </div>
      )}
      <div className="min-h-screen bg-linear-to-b from-white to-[#f1f5f2] flex justify-center items-center py-10 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8 sm:p-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-gradient mb-8">
            Create New Food
          </h1>
          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="flex flex-col md:col-span-2">
              <label className="font-semibold text-gradient mb-2">
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
              <label className="font-semibold text-gradient mb-2">
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
              <label className="font-semibold text-gradient mb-2">
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
              <label className="font-semibold text-gradient mb-2">
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
              <label className="font-semibold text-gradient mb-2">
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
              <label className="font-semibold text-gradient mb-2">
                Additional Notes
              </label>
              <textarea
                {...register("additional_notes")}
                placeholder="Add any special instructions or packaging notes..."
                rows="4"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5dae61]"
              ></textarea>
            </div>

            <div className="md:col-span-2 flex justify-center mt-6">
              <button
                type="submit"
                className="themeBtn w-fit"
                disabled={addFoodMutation.isLoading}
              >
                <span>
                  {addFoodMutation.isLoading ? "Adding..." : "Add Food"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNewFood;
