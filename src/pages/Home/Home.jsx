import React from "react";
import Banner from "../../components/Banner/Banner";
import FeaturedFoods from "../../components/FeaturedFoods/FeaturedFoods";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import OurMission from "../../components/ourMission/ourMission";
import usePageTitle from "../../utilities/setPageTitle/usePageTitle";

const Home = () => {
  usePageTitle("Home");

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
