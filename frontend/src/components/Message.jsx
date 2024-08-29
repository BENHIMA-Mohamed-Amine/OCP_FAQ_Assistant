import React from "react";

export const Message = (props) => {
  const { messageFor, text } = props;
  const bgColor =
    messageFor === "ai" ? "bg-[hsl(0,0%,90%)]" : "bg-custom-green";
  const textColor = messageFor === "ai" ? "text-main" : "text-[#f9f9f9]";
  const justifyContent = messageFor === "ai" ? "justify-start" : "justify-end";
  return (
    <div
      className={`flex flex-col px-6 py-2 ${
        messageFor !== "ai" ? "items-end" : "items-start"
      }`}
    >
      <div className={`flex ${justifyContent} items-center pb-2`}>
        {messageFor === "ai" && (
          <>
            <img
              src="./src/assets/ocp_ai_assistant_logo.png"
              alt="assistant logo"
              className="w-[30px] h-[30px] ml-[6px]"
            />
            <h4 className="text-sm pt-[4px]">OCP Groupe Assistant</h4>
          </>
        )}
        {messageFor !== "ai" && (
          <>
            <h4 className="text-sm pt-[4px]">You</h4>
            <img
              src="./src/assets/user.png"
              alt="assistant logo"
              className="w-[20px] h-[20px] ml-[6px] mr-[10px]"
            />
          </>
        )}
      </div>
      <div className={`flex ${justifyContent} w-5/6`}>
        <p
          className={`text-sm ${textColor} ${bgColor} leading-6 text-justify w-fit p-5 rounded-3xl`}
        >
          {text}
        </p>
      </div>
    </div>
  );
};
