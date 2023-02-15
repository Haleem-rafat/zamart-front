import React from "react";
import "./input-form.css";

const InputForm = ({ type, placeholder, label, width, value, ...props }) => {
  return (
    <div id="floatContainer1" class="float-container text-primary-dark ">
      <input
        className="w-full sm:h-16 h-12 rounded-full sm:text-xl text-lg"
        type={type}
        value={value}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export default InputForm;
