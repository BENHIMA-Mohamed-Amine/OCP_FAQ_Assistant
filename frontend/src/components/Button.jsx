import React from "react";
import { Link } from "react-router-dom";

export const Button = (props) => {
  return (
    <Link
      to="/register"
      className="border-custom-green border-[2px] bg-custom-green text-white px-4 py-[10px] rounded-lg text-center hover:bg-[#F6F6F6] hover:text-main hover:cursor-pointer"
    >
      {props.content}
    </Link>
  );
};
