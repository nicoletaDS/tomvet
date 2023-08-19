import React, { useState } from "react";

interface CustomCheckboxProps {
  label?: string;
  checkedColor: string; // Add a prop to accept the custom color
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  label,
  checkedColor,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    console.log("in change", isChecked);
    setIsChecked(!isChecked);
  };

  const color = `bg-lilac`;

  return (
    <label className="custom-checkbox flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className="hidden"
      />
      <span
        className={`checkbox-icon w-6 h-6 border border-gray-400 rounded-md mr-2 ${
          isChecked ? color : "bg-white"
        }`}
      ></span>
      {label && label}
    </label>
  );
};

export default CustomCheckbox;
