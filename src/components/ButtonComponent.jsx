import React from "react";

export default function ButtonComponent({
  children = "Submit",
  type = "submit",
  bgColor = "bg-blue-500",
  textColor = "text-white",
  padding = "px-6 py-2",
  borderRadius = "rounded",
  className = "",
  ...props
}) {
  // Filter out non-DOM props to avoid passing them to the button element
  const filteredProps = Object.keys(props).reduce((acc, key) => {
    if (key !== "bgColor" && key !== "textColor" && key !== "padding" && key !== "borderRadius") {
      acc[key] = props[key];
    }
    return acc;
  }, {});

  return (
    <button
      type={type}
      className={`w-fit ${bgColor} ${textColor} ${padding} ${borderRadius} ${className}`}
      {...filteredProps} // Only forward valid props to the button element
    >
      {children}
    </button>
  );
}
