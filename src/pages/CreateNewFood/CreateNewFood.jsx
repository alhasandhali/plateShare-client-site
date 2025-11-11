import React from "react";
import usePageTitle from "../../utilities/setPageTitle/usePageTitle";

const CreateNewFood = () => {
  usePageTitle("New Food");

  return (
    <div>
      <div className="min-h-screen bg-linear-to-b from-white to-[#f1f5f2] flex justify-center items-center py-10 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8 sm:p-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#3b7d5e] mb-8">
            Create New Food
          </h1>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col md:col-span-2">
              <label className="font-semibold text-[#3b7d5e] mb-2">
                Food Name
              </label>
              <input
                type="text"
                name="food_name"
                placeholder="Enter food name"
                required
                className="input input-bordered w-full border-[#5dae61]/40 focus:border-[#5dae61] focus:ring-[#5dae61]/30 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-[#3b7d5e] mb-2">
                Food Image URL
              </label>
              <input
                type="url"
                name="food_image"
                placeholder="https://example.com/image.jpg"
                required
                className="input input-bordered w-full border-[#5dae61]/40 focus:border-[#5dae61] focus:ring-[#5dae61]/30 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-[#3b7d5e] mb-2">
                Quantity (Serves People)
              </label>
              <input
                type="number"
                name="food_quantity"
                min="1"
                placeholder="e.g. 4"
                required
                className="input input-bordered w-full border-[#5dae61]/40 focus:border-[#5dae61] focus:ring-[#5dae61]/30 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-[#3b7d5e] mb-2">
                Pickup Location
              </label>
              <input
                type="text"
                name="pickup_location"
                placeholder="123 Main St, City"
                required
                className="input input-bordered w-full border-[#5dae61]/40 focus:border-[#5dae61] focus:ring-[#5dae61]/30 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-[#3b7d5e] mb-2">
                Expiration Date
              </label>
              <input
                type="date"
                name="expire_date"
                required
                className="input input-bordered w-full border-[#5dae61]/40 focus:border-[#5dae61] focus:ring-[#5dae61]/30 rounded-lg"
              />
            </div>
            <div className="flex flex-col md:col-span-2">
              <label className="font-semibold text-[#3b7d5e] mb-2">
                Additional Notes
              </label>
              <textarea
                name="additional_notes"
                placeholder="Add any special instructions or packaging notes..."
                rows="4"
                className="textarea textarea-bordered w-full border-[#5dae61]/40 focus:border-[#5dae61] focus:ring-[#5dae61]/30 rounded-lg resize-none"
              ></textarea>
            </div>
            <div className="md:col-span-2 flex justify-center mt-6">
              <button type="submit" className="themeBtn w-fit">
                <span className="w-auto">Add Food</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNewFood;
