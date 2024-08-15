import React from "react";

export const Message = (props) => {
  const { messageFor } = props;
  const bgColor =
    messageFor === "ai" ? "bg-[hsl(0,0%,90%)]" : "bg-custom-green";
  const textColor = messageFor === "ai" ? "text-main" : "text-[#f9f9f9]";
  const justifyContent = messageFor === "ai" ? "justify-start" : "justify-end";
  return (
    <div className="flex flex-col px-6 py-2">
      <div
        className={`flex ${justifyContent} space-x-1 items-center px-5 pb-2`}
      >
        {messageFor === "ai" && (
          <img
            src="./src/assets/ocp_ai_assistant_logo.png"
            alt="assistant logo"
            className="w-[30px] h-[30px]"
          />
        )}
        <h4 className="text-sm pt-[4px]">OCP Groupe Assistant</h4>
      </div>
      <div className={`flex ${justifyContent}`}>
        <div className="w-5/6">
          <p
            className={`text-sm ${textColor} ${bgColor} leading-6 text-justify w-fit p-5 rounded-3xl`}
          >
            Lorem ipsum dolor sit a Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Deleniti quos dolores numquam facilis voluptatum
            eaque iure. Ex eaque quas excepturi perspiciatis? Possimus unde qui
            fugiat minima temporibus officia perferendis ex?
          </p>
        </div>
      </div>
    </div>
  );
};
