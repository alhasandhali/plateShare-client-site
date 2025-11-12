import React from "react";
import { motion as Motion } from "framer-motion";

const CustomLoader = () => {
  const loaderVariant = {
    animate: {
      rotate: [0, 360],
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: "linear",
      },
    },
  };

  const dotVariant = {
    animate: (i) => ({
      y: [0, -10, 0],
      transition: {
        delay: i * 0.2,
        repeat: Infinity,
        duration: 0.6,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <div className="flex flex-col items-center justify-center py-5 bg-gray-50">
      <Motion.div
        className="w-20 h-20 border-4 border-green-400 border-t-transparent rounded-full mb-6"
        variants={loaderVariant}
        animate="animate"
      ></Motion.div>
      <div className="flex gap-3">
        {[0, 1, 2].map((i) => (
          <Motion.div
            key={i}
            className="w-4 h-4 bg-prime rounded-full"
            custom={i}
            variants={dotVariant}
            animate="animate"
          />
        ))}
      </div>
      <Motion.p
        className="montserrat mt-4 text-gradient font-semibold text-2xl leading-relaxed tracking-widest"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ repeat: Infinity, repeatType: "mirror", duration: 1 }}
      >
        Loading...
      </Motion.p>
    </div>
  );
};

export default CustomLoader;
