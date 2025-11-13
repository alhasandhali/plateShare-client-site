import React from "react";
import FoodCard from "../FoodCard/FoodCard";
import { Link } from "react-router";
import CustomLoader from "../CustomLoader/CustomLoader";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";

const FeaturedFoods = () => {
  const customAxios = useAxios();
  const {
    data: foods = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["foods"],
    queryFn: async () => {
      const { data } = await customAxios.get("/featured-foods");
      return data;
    },
  });

  return (
    <div className="md:w-11/12 m-auto py-10">
      <h1 className="montserrat font-bold text-gradient text-3xl text-center">
        Featured Foods
      </h1>
      <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
      {!isLoading && foods.length > 0 && !isLoading && (
        <div className="flex justify-center mt-8">
          <Link to="/available-foods" className="themeBtn w-fit">
            <span className="w-auto px-6 py-3 font-semibold">Show All</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default FeaturedFoods;
