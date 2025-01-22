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
      {...filteredProps} 
    >
      {children}
    </button>
  );
}
