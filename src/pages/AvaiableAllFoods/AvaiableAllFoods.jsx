import React from "react";
import axios from "axios";
import FoodCard from "../../components/FoodCard/FoodCard";
import usePageTitle from "../../utilities/setPageTitle/usePageTitle";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import { useQuery } from "@tanstack/react-query";

const fetchFoods = async () => {
  const { data } = await axios.get("http://localhost:3000/foods");
  return data;
};

const AvaiableAllFoods = () => {
  usePageTitle("All Foods");

  const {
    data: foods = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["foods"],
    queryFn: fetchFoods,
  });

  return (
    <div className="md:w-11/12 m-auto py-10">
      <h1 className="montserrat font-bold text-gradient text-3xl text-center">
        Featured Foods
      </h1>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {isLoading ? (
          <div className="col-span-full flex justify-center">
            <CustomLoader />
          </div>
        ) : isError ? (
          <p className="col-span-full text-center text-red-500 mt-8">
            Failed to load foods. Please try again later.
          </p>
        ) : foods.length === 0 ? (
          <p className="col-span-full text-center text-gradient mt-8">
            No featured foods available.
          </p>
        ) : (
          foods.map((food) => <FoodCard key={food._id} food={food} />)
        )}
      </div>
    </div>
  );
};

export default AvaiableAllFoods;
