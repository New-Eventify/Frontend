import Logo from "../assets/Logo";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full flex justify-between py-3 px-5 bg-appNavyBlue">
      <Logo />
      <div className="hidden md:flex items-center gap-4">
        <Link className="text-white">Create Event</Link>
        <Link className="text-white">Login</Link>
        <Link to="">
          <button className="bg-appYellow p-2 w-28 rounded-lg">Sign in</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
