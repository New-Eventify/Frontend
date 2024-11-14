import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import { ctaBg } from "../../constant/AppImage";
import { motion } from "framer-motion";

const CallToAction = () => {
  return (
    <div className="relative overflow-hidden w-full mb-16 text-appYellow h-72 flex justify-center items-center">
      <img
        src={ctaBg}
        className="absolute w-full h-full top-0 left-0 object-cover"
        alt=""
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex inner justify-between gap-3 items-center relative"
      >
        <Icon className="text-9xl" icon={"arcticons:emoji-circus-tent"} />
        <div>
          <h4 className="text-4xl font-medium mb-3">
            Create an event with Evenza
          </h4>
          <p className="text-2xl font-light">
            {
              "Get event suggestions tailored to your interests! Don't let your favorite events slip away."
            }
          </p>
        </div>
        <Link>
          <button className="flex items-center gap-1 py-2 px-4 text-xl rounded-md text-appNavyBlue bg-appYellow">
            <Icon className="mt-1" icon={"mdi:event-add"} />
            Create Event
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default CallToAction;
