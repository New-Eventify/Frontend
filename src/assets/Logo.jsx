import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={"/"} className="flex items-center gap-2">
      <Icon
        color="white"
        className="mb-2 sm:text-2xl"
        icon={"dashicons:tickets-alt"}
      />
      <h1 className="text-appYellow text-xl sm:text-3xl">Evenza</h1>
    </Link>
  );
};

export default Logo;
