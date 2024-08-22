import React from "react";

export const Button = (props) => {
  return (
    <span className="border-custom-green border-[2px] bg-custom-green text-white px-4 py-[10px] rounded-lg text-center hover:bg-[#F6F6F6] hover:text-main hover:cursor-pointer">
      {props.content}
    </span>
  );
};
