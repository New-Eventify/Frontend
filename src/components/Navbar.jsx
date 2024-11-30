import { useDispatch } from "react-redux";
import Logo from "../assets/Logo";
import { Link } from "react-router-dom";
import { setIsSignUp } from "../redux/reducers/authViewSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  return (
    <div className="w-full flex justify-between py-3 px-5 bg-appNavyBlue">
      <Logo />
      <div className="hidden md:flex items-center gap-4">
        <Link to={"/create-event"} className="text-white">
          Create Event
        </Link>
        <Link
          onClick={() => dispatch(setIsSignUp(false))}
          to={"/auth"}
          className="text-white"
        >
          Login
        </Link>
        <Link onClick={() => dispatch(setIsSignUp(true))} to={"/auth"}>
          <button className="bg-appYellow py-2 px-4 w-full rounded-lg">
            Create Account
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
