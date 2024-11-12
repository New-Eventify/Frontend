import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SeeMore = () => {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 50 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link className="border justify-self-center mt-16 border-appNavyBlue p-3 w-full max-w-[600px] rounded flex justify-center items-center">
        See More
      </Link>
    </motion.div>
  );
};

export default SeeMore;
