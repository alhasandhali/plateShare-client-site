import React from "react";
import CountUp from "react-countup";

const OurMission = () => {
  return (
    <div className="bg-green-50">
      <div className="py-16 md:w-11/12 m-auto">
        <div className="max-w-6xl mx-auto px-4 text-center montserrat">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">Our Mission</h2>
          <p className="text-gray-700 mx-auto mb-8">
            We aim to reduce food waste and connect communities. Every meal
            shared makes a difference!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold text-green-600">
                {" "}
                <CountUp end={1200} duration={3} separator="," />+
              </h3>
              <p className="text-gray-700 mt-2">Meals Shared</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-green-600">
                <CountUp end={350} duration={3} separator="," />+
              </h3>
              <p className="text-gray-700 mt-2">Active Donors</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-green-600">
                <CountUp end={200} duration={3} separator="," />+
              </h3>
              <p className="text-gray-700 mt-2">Communities Reached</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-green-600">
                <CountUp end={500} duration={3} separator="," />+
              </h3>
              <p className="text-gray-700 mt-2">Volunteers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurMission;
