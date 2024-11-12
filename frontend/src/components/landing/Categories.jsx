import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Categories = () => {
  const eventCategories = [
    {
      name: "DevFests",
      icon: "mingcute:code-line",
    },
    {
      name: "Parties",
      icon: "bx:party",
    },
    {
      name: "Sports",
      icon: "material-symbols:sports-outline",
    },
    {
      name: "Political",
      icon: "streamline:politics-speech",
    },
    {
      name: "Church",
      icon: "majesticons:church-line",
    },
    {
      name: "Webinar",
      icon: "streamline:web",
    },
  ];

  return (
    <div className="py-12">
      <div className="inner">
        <h2 className="text-4xl mb-8">Explore Categories</h2>
        <div className="flex justify-between gap-4">
          {eventCategories.map((event, index) => (
            <Link
              className="w-1/6 max-w-48 grid justify-items-center gap-5"
              key={index}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: [1.1, 0.9, 1] }}
                whileHover={{ scale: 1.1 }}
                className="shadow-md rounded-full w-full text-8xl aspect-square flex justify-center items-center text-appNavyBlue bg-cardGray"
              >
                <Icon icon={event.icon} />
              </motion.div>
              <p className="text-lg">{event.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
