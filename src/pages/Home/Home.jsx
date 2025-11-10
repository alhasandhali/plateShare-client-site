import React from "react";
import Banner from "../../components/Banner/Banner";
import FeaturedFoods from "../../components/FeaturedFoods/FeaturedFoods";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import OurMission from "../../components/ourMission/ourMission";

const Home = () => {
  return (
    <div>
      <Banner />
      <FeaturedFoods />
      <HowItWorks />
      <OurMission />
    </div>
  );
};

export default Home;
