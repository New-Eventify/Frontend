import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useDispatch } from "react-redux";
import { setMenu } from "../redux/reducers/userMenuSlice";
import { toast } from "react-toastify";

const UserMenu = () => {
  const { logout } = useAuth();
  const dispatch = useDispatch();
  return (
    <motion.div
      initial={{ opacity: 0, translateX: 50 }}
      whileInView={{ opacity: 1, translateX: 0 }}
      transition={{ ease: "easeInOut" }}
      className="absolute right-4 shadow border top-4 bg-white w-30 sm:w-40 overflow-hidden rounded-md"
    >
      <ul className="grid text-sm">
        <li
          onClick={() => dispatch(setMenu(false))}
          className="hover:bg-gray-300 sm:py-2 p-2 sm:px-4 cursor-pointer"
        >
          Account settings
        </li>
        <li
          onClick={() => dispatch(setMenu(false))}
          className="hover:bg-gray-300 sm:py-2 p-2 sm:px-4 cursor-pointer"
        >
          Interests
        </li>
        <li
          onClick={() => {
            logout();
            toast.success("See you later");
            dispatch(setMenu(false));
          }}
          className="hover:bg-gray-300 sm:py-2 p-2 sm:px-4 cursor-pointer"
        >
          Logout
        </li>
      </ul>
    </motion.div>
  );
};

export default UserMenu;
