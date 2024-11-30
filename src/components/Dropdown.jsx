import { useState } from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";

const Dropdown = ({ icon, placeholder, options, onChange, className = "" }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(placeholder);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleSelect = (option) => {
    setSelectedOption(option);
    onChange(option);
    setIsDropdownOpen(false);
  };

  return (
    <div
      className={`text-xs md:text-sm w-full border p-2 rounded-md border-placeholderGray md:pl-4 relative ${className}`}
    >
      <div
        onClick={toggleDropdown}
        className="w-full h-full cursor-pointer text-placeholderGray flex justify-between items-center"
      >
        <span className="flex items-center gap-1">
          <Icon fontSize={24} icon={icon} />
          <p className={selectedOption ? "text-appDarkGrayText" : ""}>
            {selectedOption}
          </p>
        </span>
        <Icon fontSize={24} icon="mingcute:down-line" />
      </div>
      {isDropdownOpen && (
        <div className="absolute w-full left-0 overflow-y-scroll max-h-80 top-10 md:top-12 bg-white border border-placeholderGray rounded shadow-lg z-10">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-600"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  icon: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string, // Optional
};

Dropdown.defaultProps = {
  className: "", // Default empty className
};

export default Dropdown;
