import React from "react";
import "./HowItWorks.css";

const HowItWorks = () => {
  return (
    <div className="bg-gradian">
      <section className="py-16 md:w-11/12 m-auto">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="montserrat font-bold text-white text-3xl text-center mb-5">
            How It Works
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="hiw-card bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <div className="text-5xl mb-4">📝</div>
              <h3 className="font-semibold text-xl mb-2">Post Food</h3>
              <p className="text-gray-600">
                Share leftover meals or fresh food with your community easily.
              </p>
            </div>
            <div className="hiw-card bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="font-semibold text-xl mb-2">Find Food</h3>
              <p className="text-gray-600">
                Browse available meals near you and choose what you need.
              </p>
            </div>
            <div className="hiw-card bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="font-semibold text-xl mb-2">Collect Food</h3>
              <p className="text-gray-600">
                Pick up the food and enjoy it while reducing waste in your
                community.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
