import React from "react";
import "./input-form.css";

const TextareaForm = ({ placeholder, value, ...props }) => {
  return (
    <div className=" text-primary-gray-dark ">
      <textarea
        className="w-full rounded-3xl sm:text-xl text-lg px-4 outline-none"
        value={value}
        placeholder={placeholder}
        {...props}
      ></textarea>
    </div>
  );
};

export default TextareaForm;
