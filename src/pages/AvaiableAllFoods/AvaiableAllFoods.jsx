import React, { useEffect, useState } from "react";
import axios from "axios";
import FoodCard from "../../components/FoodCard/FoodCard";
import usePageTitle from "../../utilities/setPageTitle/usePageTitle";

const AvaiableAllFoods = () => {
  usePageTitle("All Foods");

  const [foods, setFoods] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/foods")
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
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {foods.map((food) => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div>
    </div>
  );
};

export default AvaiableAllFoods;
