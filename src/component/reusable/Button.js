import React, { Children } from "react";

const Button = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className="bg-indigo-500 text-white px-4 py-2 my-5 rounded hover:bg-indigo-700">
      {children}
    </button>
  );
};

export default Button;
