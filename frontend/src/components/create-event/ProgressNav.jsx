import { motion } from "framer-motion";

const ProgressNav = ({ steps, currentStep }) => {
  return (
    <div className="relative flex items-center justify-between w-full max-w-3xl mx-auto mt-8">
      {/* Progress Line */}
      <motion.div
        className="absolute top-1/2 left-0 h-1 bg-gray-300 rounded-full"
        style={{ width: "100%", transform: "translateY(-50%)" }}
      />
      <motion.div
        className="absolute top-1/2 left-0 h-1 bg-indigo-600 rounded-full"
        style={{
          width: `${(currentStep / (steps.length - 1)) * 100}%`,
          transform: "translateY(-50%)",
        }}
        initial={{ width: 0 }}
        animate={{
          width: `${(currentStep / (steps.length - 1)) * 100}%`,
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Steps */}
      {steps.map((step, index) => (
        <div key={index} className="relative z-10 flex flex-col items-center">
          {/* Circle */}
          <motion.div
            className={`w-6 h-6 rounded-full ${
              index <= currentStep ? "bg-indigo-600" : "bg-gray-300"
            } flex items-center justify-center`}
          >
            <span
              className={`w-3 h-3 rounded-full ${
                index === currentStep ? "bg-white" : ""
              }`}
            />
          </motion.div>
          {/* Label */}
          <span
            className={`mt-2 text-sm ${
              index <= currentStep ? "text-indigo-600" : "text-gray-400"
            }`}
          >
            {step}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ProgressNav;
