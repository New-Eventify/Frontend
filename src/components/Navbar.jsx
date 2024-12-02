import { useDispatch, useSelector } from "react-redux";
import Logo from "../assets/Logo";
import { Link } from "react-router-dom";
import { setIsSignUp } from "../redux/reducers/authViewSlice";
import { selectIsLoggedIn } from "../redux/reducers/userSlice";
import { Icon } from "@iconify/react/dist/iconify.js";
import { toggleMenu } from "../redux/reducers/userMenuSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  // const user = useSelector(selectUser);
  const toggle = () => {
    dispatch(toggleMenu());
  };
  return (
    <div className="w-full relative flex justify-between py-3 px-5 bg-appNavyBlue">
      <Logo />
      <div className="hidden md:flex items-center gap-4">
        {!isLoggedIn && (
          <>
            <Link to={"/create-event"} className="text-white">
              Create event
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
          </>
        )}
      </div>
      {isLoggedIn && (
        <>
          <div className="flex items-center gap-3">
            <Link
              to={"/create-event"}
              className="grid gap-1 justify-items-center text-white"
            >
              <Icon icon={"carbon:calendar-add"} />
              <p className="hidden sm:block text-[.5rem]">Create</p>
            </Link>
            <Link
              to={"/interests"}
              className="grid gap-1 justify-items-center text-white"
            >
              <Icon icon={"f7:tickets"} />
              <p className="hidden sm:block text-[.5rem]">Tickets</p>
            </Link>

            <span
              onClick={() => toggle()}
              className="grid gap-1 cursor-pointer text-white justify-items-center"
            >
              <Icon icon={"uiw:user"} />
              <p className="hidden sm:block text-[.5rem]">Profile</p>
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
