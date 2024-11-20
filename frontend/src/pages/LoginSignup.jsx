import { motion } from "framer-motion";
import { useWindowSize } from "../hooks/useWindowSize";
import Logo from "../assets/Logo";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleSignUp } from "../redux/reducers/authViewSlice";

function LoginSignup() {
  const isSignUp = useSelector((state) => state.authView.isSignUp);
  const dispatch = useDispatch();
  const [width] = useWindowSize();
  const isMobile = width <= 767;

  return (
    <div className="relative h-screen flex bg-appNavyBlue overflow-hidden">
      <div
        className={`absolute z-10 top-10 ${
          isSignUp ? "right-8 lg:right-14" : "left-8 lg:left-14"
        }`}
      >
        <Logo />
      </div>
      {!isMobile ? (
        <>
          {/* Message Side */}
          <motion.div
            animate={{ x: isSignUp ? "150%" : "0%" }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`w-2/5 hidden text-white px-8 lg:px-14 md:flex flex-col justify-center`}
          >
            {!isSignUp ? (
              <>
                <h2 className="text-3xl lg:text-5xl uppercase max-w-[16ch]">
                  Tailored <span className="text-appYellow">events</span>,{" "}
                  <br />
                  just for you.
                </h2>
                <p className="text-lg lg:text-2xl max-w-[30ch]">
                  Log in to discover them today!
                </p>
              </>
            ) : (
              <>
                <h2 className="text-3xl lg:text-5xl uppercase max-w-[17ch]">
                  Ready to find your next favorite{" "}
                  <span className="text-appYellow">event?</span> <br />
                </h2>
                <p className="text-lg lg:text-2xl">
                  Create an account and start exploring now!
                </p>
              </>
            )}
          </motion.div>

          {/* Form Side */}
          <motion.div
            animate={{ x: isSignUp ? "-70%" : "0%" }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`w-full md:w-3/5 flex justify-center items-center bg-white p-20 ${
              isSignUp ? "rounded-e-[5rem]" : "rounded-s-[5rem]"
            }`}
          >
            <div className="w-full max-w-lg">
              <h2 className="text-3xl font-bold mb-4">
                {isSignUp ? "Create Account" : "Log In"}
              </h2>
              <form className="flex flex-col items-center gap-4">
                {isSignUp && (
                  <input
                    type="text"
                    placeholder="Username"
                    className="border w-full p-2 rounded"
                  />
                )}
                <input
                  type="email"
                  placeholder="Email"
                  className="border w-full p-2 rounded"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="border w-full p-2 rounded"
                />
                <button
                  type="submit"
                  className="bg-appNavyBlue w-full text-white font-bold py-2 px-6 rounded hover:bg-blue-600 transition"
                >
                  {isSignUp ? "Create account" : "Login"}
                </button>
                {isSignUp ? (
                  <p
                    className="cursor-pointer flex gap-2 text-center"
                    onClick={() => dispatch(toggleSignUp())}
                  >
                    Already have an account?{" "}
                    <span className="border-b border-appYellow">Log in</span>
                  </p>
                ) : (
                  <p
                    className="cursor-pointer flex gap-2 text-center"
                    onClick={() => dispatch(toggleSignUp())}
                  >
                    Don&apos;t have an account?
                    <span className="border-b border-appYellow">
                      Create account
                    </span>
                  </p>
                )}
              </form>
            </div>
          </motion.div>
        </>
      ) : (
        <>
          <div className="w-full h-full px-4 flex justify-center items-center">
            {/* Flip Card Container */}
            <div className="w-96 h-96 relative perspective">
              <motion.div
                animate={{ rotateY: !isSignUp ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 w-full h-full transform-style-preserve-3d"
              >
                {/* Front Side: Login */}
                <div
                  className={`absolute inset-0 w-full h-full rounded-xl bg-white shadow-lg ${
                    !isSignUp ? "flex" : "hidden"
                  } flex-col justify-center items-center transform -scale-x-100 backface-hidden`}
                >
                  <h2 className="text-2xl font-bold mb-6">Log In</h2>
                  <form className="flex flex-col gap-4 w-3/4">
                    <input
                      type="email"
                      placeholder="Email"
                      className="border p-2 rounded"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="border p-2 rounded"
                    />
                    <button
                      type="submit"
                      className="bg-blue-500 text-white font-bold py-2 px-6 rounded hover:bg-blue-600 transition"
                    >
                      Login
                    </button>
                  </form>
                  <p className="mt-4">
                    New here?{" "}
                    <button
                      onClick={() => dispatch(toggleSignUp())}
                      className="text-blue-500 hover:underline"
                    >
                      Create an account
                    </button>
                  </p>
                </div>

                {/* Back Side: Create account */}
                <div
                  className={`absolute inset-0 w-full h-full bg-blue-500 rounded-xl text-white shadow-lg ${
                    !isSignUp ? "hidden" : "flex"
                  } flex-col justify-center items-center backface-hidden transform rotateY-180`}
                >
                  <h2 className="text-2xl font-bold mb-6">Create account</h2>
                  <form className="flex flex-col gap-4 w-3/4">
                    <input
                      type="text"
                      placeholder="Username"
                      className="border p-2 rounded text-black"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="border p-2 rounded text-black"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="border p-2 rounded text-black"
                    />
                    <button
                      type="submit"
                      className="bg-white text-blue-500 font-bold py-2 px-6 rounded hover:bg-gray-200 transition"
                    >
                      Create account
                    </button>
                  </form>
                  <p className="mt-4">
                    Already have an account?{" "}
                    <button
                      onClick={() => dispatch(toggleSignUp())}
                      className="text-white underline"
                    >
                      Log in
                    </button>
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default LoginSignup;
