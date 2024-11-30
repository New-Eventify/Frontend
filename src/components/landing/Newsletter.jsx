import { motion } from "framer-motion";
const Newsletter = () => {
  return (
    <div className="bg-appYellow min-h-60 py-6 w-full flex justify-between items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="inner flex flex-col md:flex-row gap-2 justify-between items-center"
      >
        <div>
          <h4 className="text-2xl md:text-4xl mb-2 font-medium">
            Subscribe to our Newsletter
          </h4>
          <p className="text-base md:text-xl">
            Receive our weekly newsletter & updates with new events from your
            favourite organizers & venues.
          </p>
        </div>
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
      </motion.div>
    </div>
  );
};

export default Newsletter;
