import React, { useEffect, useState } from "react";
import "./FoodCard.css";
import { Link } from "react-router";
import axios from "axios";

const FoodCard = ({ food }) => {
  const {
    _id,
    food_name,
    food_image,
    food_quantity,
    pickup_location,
    expire_date,
    user_id,
    food_status,
  } = food;

  const [donator, setDonator] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/user/${user_id}`)
      .then((res) => {
        setDonator(res.data);
      })
      .catch((err) => console.error(err));
  }, [user_id]);

  const { name, image } = donator;

  return (
    <div>
      {/* From Uiverse.io by SachinKumar666 */}
      <div to="/" className="card">
        <div className="card__shine"></div>
        <div className="card__glow"></div>
        <div className="card__content">
          <div className="card__badge capitalize">{food_status}</div>
          <div className="card__image h-44 md:h-52">
            <img className="h-full w-full" src={food_image} alt={food_name} />
          </div>
          <div className="flex justify-between items-center">
            <p className="card__title">{food_name}</p>
            <div className="flex items-center gap-2">
              <img
                className="h-8 w-8 rounded-full bg-white border-2 border-[#3b7d5e]"
                src={image}
                alt={name}
              />
              <p className="card__description">{name}</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="card__description">
              Pick-Up: <span className="font-bold">{pickup_location}</span>
            </p>
            <p className="card__description">
              Exp. Date: <span className="font-bold">{expire_date}</span>
            </p>
          </div>
          <div className="card__footer">
            <div className="card__quantity">
              Serves <span className="font-bold">{food_quantity}</span>{" "}
              {food_quantity < 1 ? "people" : "peoples"}
            </div>
            <Link to={`/food/${_id}`} className="card__button">
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
