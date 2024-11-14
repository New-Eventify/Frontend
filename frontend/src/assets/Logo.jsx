import { Icon } from "@iconify/react/dist/iconify.js";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Icon
        color="white"
        className="mb-2"
        fontSize={24}
        icon={"dashicons:tickets-alt"}
      />
      <h1 className="text-appYellow text-3xl">Evenza</h1>
    </div>
  );
};

export default Logo;
