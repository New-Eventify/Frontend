import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  party,
  devfest,
  church,
  cinema,
  sports,
  webinar,
} from "../../constant/AppImage";

const Categories = () => {
  const eventCategories = [
    {
      name: "DevFests",
      img: devfest,
    },
    {
      name: "Parties",
      img: party,
    },
    {
      name: "Sports",
      img: sports,
    },
    {
      name: "Movies",
      img: cinema,
    },
    {
      name: "Church",
      img: church,
    },
    {
      name: "Webinar",
      img: webinar,
    },
  ];

  return (
    <div className="py-12">
      <div className="inner">
        <h2 className="text-2xl md:text-4xl mb-8">Explore Categories</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {eventCategories.map((event, index) => (
            <Link
              className="max-w-48 grid justify-items-center gap-2 md:gap-5"
              key={index}
            >
              <motion.div
                initial={{ opacity: 0, y: -70 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="shadow-md overflow-hidden rounded-full w-full aspect-square flex justify-center items-center"
              >
                <img
                  className="w-full h-full object-cover"
                  src={event.img}
                  alt=""
                />
              </motion.div>
              <p className="text-sm md:text-lg">{event.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
