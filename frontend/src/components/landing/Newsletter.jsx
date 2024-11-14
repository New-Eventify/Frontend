import { motion } from "framer-motion";
const Newsletter = () => {
  return (
    <div className="bg-appYellow w-full flex justify-between items-center h-64">
      <div className="inner flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h4 className="text-4xl mb-2 font-medium">
            Subscribe to our Newsletter
          </h4>
          <p className="text-xl">
            Receive our weekly newsletter & updates with new events from your
            favourite organizers & venues.
          </p>
        </motion.div>
        <div className="flex overflow-hidden w-full max-w-xl rounded-md border bg-white border-appNavyBlue">
          <input
            className="appearance-none outline-none p-3 w-full text-xs"
            type="email"
            placeholder="Enter your e-mail address"
            name=""
            id=""
          />
          <button className="text-appYellow font-medium p-3 bg-appNavyBlue">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
