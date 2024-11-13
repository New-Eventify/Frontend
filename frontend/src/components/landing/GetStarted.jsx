import { Link } from "react-router-dom";
import { recommendationBg } from "../../constant/AppImage";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";

const GetStarted = () => {
  return (
    <div className="relative overflow-hidden inner h-72 flex justify-center items-center">
      <img
        src={recommendationBg}
        className="absolute w-full h-full top-0 left-0 object-cover"
        alt=""
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center grid justify-items-center relative p-2"
      >
        <h4 className="text-2xl md:text-4xl font-bold">
          Events specially curated for you!
        </h4>
        <p className="text-lg md:text-2xl mb-3">
          {
            "Get event suggestions tailored to your interests! Don't let your favorite events slip away."
          }
        </p>
        <Link>
          <button className="flex items-center gap-1 py-3 px-6 text-lg md:text-2xl rounded-md bg-appNavyBlue text-appYellow">
            Get Started
            <Icon icon={"solar:arrow-right-broken"} />
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default GetStarted;
