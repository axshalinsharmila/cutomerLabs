import React from "react";

const TextField = ({ label, inputProps, onChange, value }) => {
  return (
    <div className="flex flex-col py-5">
      <label className="mb-2 text-base text-gray-800">{label}</label>
      <input
        className="bg-gray-200 px-3 py-2 border-2 outline-none"
        {...inputProps}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default TextField;