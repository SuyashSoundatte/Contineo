import React from "react";

export default function CheckboxComponent({
  label = "Add To Div",
  checked = false,
  onChange,
  className = "",
  ...props
}) {
  return (
    <div className={`flex items-center ${className}`} {...props}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="form-checkbox h-5 w-5 text-blue-500"
      />
      <label className="ml-2 text-sm">{label}</label>
    </div>
  );
}
