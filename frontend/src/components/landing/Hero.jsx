import { useState } from "react";
import { motion } from "framer-motion";
import {
  heroImg1,
  heroImg2,
  heroImg3,
  heroImg4,
  heroImg5,
  heroImg6,
  heroImg7,
  heroImg8,
  heroImg9,
  heroImg10,
} from "../../constant/AppImage";
import { useEffect } from "react";
import { useMemo } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const Hero = () => {
  const images = useMemo(
    () => [
      heroImg1,
      heroImg2,
      heroImg3,
      heroImg4,
      heroImg5,
      heroImg6,
      heroImg7,
      heroImg8,
      heroImg9,
      heroImg10,
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [isDropdown, setIsDropdown] = useState(false);
  const [location, setLocation] = useState("Anywhere");

  const locations = [
    "Ikeja",
    "Abuja",
    "Port Harcourt",
    "Kaduna",
    "Calabar",
    "Enugu",
    "Jos",
    "Kano",
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [images.length]);

  const toggleDropdown = () => {
    setIsDropdown(!isDropdown);
    console.log("drop");
  };
  const handleLocationSelect = (loc) => {
    setLocation(loc);
    setIsDropdown(false);
  };

  return (
    <div className="h-[680px] relative flex justify-center items-center p-4">
      <img
        loading="eager"
        className="absolute brightness-50 top-0 left-0 w-full h-full object-center object-cover"
        src={images[index]}
        alt=""
      />

      <div className="relative w-max container mx-auto">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-white mb-6 font-bold text-center text-7xl max-w-[20ch]"
        >
          Discover the Best Events in Town with{" "}
          <span className="text-appYellow">Evenza!</span>
        </motion.h1>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="shadow-lg bg-white rounded-md w-full flex p-3 max-w-5xl h-14"
        >
          <div className="flex gap-2 text-appDarkText text-lg items-center w-3/4">
            <Icon
              className="text-placeholderGray"
              fontSize={30}
              icon={"ic:baseline-search"}
            />
            <input
              type="search"
              className="w-full appearance-none outline-none"
              placeholder="Search Events, Categories, Location,..."
            />
          </div>
          <div className="w-1/4 border-l border-placeholderGray pl-4 relative">
            <div
              onClick={() => toggleDropdown()}
              className="w-full h-full text-placeholderGray flex justify-between items-center"
            >
              <span className="flex gap-2">
                <Icon fontSize={24} icon={"mynaui:location"} />
                <p>{location}</p>
              </span>
              <Icon fontSize={24} icon={"mingcute:down-line"} />
            </div>
            {isDropdown && (
              <div className="absolute w-full left-2 top-12 bg-white border border-placeholderGray rounded shadow-lg z-10">
                {locations.map((loc) => (
                  <div
                    key={loc}
                    onClick={() => handleLocationSelect(loc)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-600"
                  >
                    {loc}
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
