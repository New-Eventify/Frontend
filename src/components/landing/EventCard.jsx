import { Icon } from "@iconify/react/dist/iconify.js";
import { heroImg1 } from "../../constant/AppImage";
import { motion } from "framer-motion";

const EventCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 50 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-md shadow overflow-hidden md:max-w-[512px] h-[460px]"
    >
      <div className="w-full overflow-hidden relative h-3/5">
        <button className=" absolute top-2 right-2 z-20 rounded-full p-2 bg-appNavyBlue text-white">
          <Icon icon={"carbon:favorite"} />
        </button>
        <img
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={heroImg1}
          alt=""
        />
        <p className="bg-appYellow text-xs md:text-sm p-2 absolute bottom-0 left 0 rounded-tr">
          Technology & Innovation
        </p>
      </div>
      <div className="h-2/5 w-full flex gap-2 items-start p-4">
        <h2 className="max-w-[5ch] text-center text-xl md:text-2xl m-1">
          NOV 22
        </h2>
        <div className="grid gap-1">
          <p className="font-semibold text-lg md:text-2xl">Event title</p>
          <p className="text-sm md:text-base text-appDarkGrayText font-medium">
            Venue
          </p>
          <p className="text-sm md:text-base text-appDarkGrayText">
            00:00 AM - 00:00 PM
          </p>
          <div className="flex flex-wrap gap-2 text-appDarkGrayText text-sm md:text-base items-center">
            <span className="flex gap-1 items-center">
              <Icon icon={"ion:ticket"} />
              NGN 4,999
            </span>
            <span className="w-1 h-1 rounded-full bg-appNavyBlue"></span>
            <span className="flex gap-1 items-center">
              <Icon icon={"carbon:favorite-filled"} />
              <p>20 interested</p>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
