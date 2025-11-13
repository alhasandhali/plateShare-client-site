import React from "react";
import { motion as Motion } from "framer-motion";
import Banner from "../../components/Banner/Banner";
import FeaturedFoods from "../../components/FeaturedFoods/FeaturedFoods";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import OurMission from "../../components/ourMission/ourMission";
import usePageTitle from "../../utilities/setPageTitle/usePageTitle";

const Home = () => {
  usePageTitle("Home");

  return (
    <div>
      <Motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Banner />
      </Motion.div>
      <Motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <FeaturedFoods />
      </Motion.div>
      <Motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <HowItWorks />
      </Motion.div>
      <Motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <OurMission />
      </Motion.div>
    </div>
  );
};

export default Home;
