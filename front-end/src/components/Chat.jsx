import React, { useState, useRef, useEffect } from "react";
import { MessageContainer } from "./MessageContainer";

export const Chat = () => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      if (message === "") {
        textarea.style.height = "25px";
        return;
      }

      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight - 15}px`;
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className=" w-5/6 md:w-4/6 mx-auto p-4 flex flex-col justify-between h-[calc(100vh-80px)] overflow-auto">
      <div className="flex-1 overflow-auto">
        <MessageContainer />
        <MessageContainer />
      </div>
      <div>
        <div className="relative border p-4 ps-8 pe-12 border-gray-300 rounded-lg bg-[#F9F9F9] focus:ring-[hsl(0,0%,90%)] focus:border-[hsl(0,0%,90%)]">
          <textarea
            type="text"
            id="search"
            ref={textareaRef}
            value={message}
            onChange={handleChange}
            className="text-wrap resize-none block pt-[4px] p-0 w-full text-sm text-main border-none bg-transparent ring-0 focus:ring-0 focus:outline-none"
            placeholder="Message OCP Group Assistant"
            required
          ></textarea>
          <button
            type="submit"
            className="flex justify-center items-center pt-[2px] pr-[1px] absolute end-2.5 bottom-[50%] transform translate-y-1/2  hover:bg-[hsl(0,0%,90%)] focus:outline-none rounded-lg h-[30px] w-[30px]"
          >
            <img
              src="./src/assets/send.svg"
              alt="send message"
              className="w-[23px] h-[23px]"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
