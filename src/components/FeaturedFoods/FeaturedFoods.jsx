import React, { useEffect, useState } from "react";
import axios from "axios";
import FoodCard from "../FoodCard/FoodCard";
import { Link } from "react-router";

const FeaturedFoods = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/featured-foods")
      .then((res) => {
        setFoods(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!foods.length) {
    return <p className="text-center mt-8">Loading featured foods...</p>;
  }

  return (
    <div className="md:w-11/12 m-auto py-10">
      <h1 className="montserrat font-bold text-gradient text-3xl text-center">
        Featured Foods
      </h1>
      <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {foods.map((food) => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Link to="/available-foods" className="themeBtn w-fit">
          <span className="w-auto px-6 py-3 font-semibold">Show All</span>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedFoods;
