import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import { ctaBg } from "../../constant/AppImage";
import { motion } from "framer-motion";

const CallToAction = () => {
  return (
    <div className="flex items-center relative text-appYellow py-6">
      <img
        src={ctaBg}
        className="z-0 absolute w-full h-full top-0 left-0 object-cover"
        alt=""
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="inner relative flex flex-col text-center md:text-start md:flex-row justify-between items-center gap-3"
      >
        <Icon
          className="text-8xl md:text-9xl"
          icon={"arcticons:emoji-circus-tent"}
        />
        <div>
          <h4 className="text-2xl md:text-4xl font-medium mb-3">
            Create an event with Evenza
          </h4>
          <p className="text-lg md:text-2xl font-light">
            {
              "Get event suggestions tailored to your interests! Don't let your favorite events slip away."
            }
          </p>
        </div>
        <Link>
          <button className="flex items-center gap-1 py-2 px-4 text-base md:text-xl rounded-md text-appNavyBlue bg-appYellow">
            <Icon className="mt-1" icon={"mdi:event-add"} />
            Create Event
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default CallToAction;
