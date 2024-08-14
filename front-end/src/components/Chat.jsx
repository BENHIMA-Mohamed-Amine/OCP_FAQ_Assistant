import React from "react";
import { MessageContainer } from "./MessageContainer";

export const Chat = () => {
  return (
    <div className=" w-5/6 md:w-4/6 mx-auto p-4 flex flex-col justify-between max-h-[calc(100%-80px)] h-[calc(100%-80px)] overflow-auto">
      <div className="flex-1 overflow-auto">
        <MessageContainer />
        <MessageContainer />
      </div>
      <div>
        <div className="relative">
          <input
            type="text"
            id="search"
            className="text-wrap block w-full p-4 ps-8 text-sm text-main border border-gray-300 rounded-lg bg-[#F9F9F9] focus:ring-[hsl(0,0%,90%)] focus:border-[hsl(0,0%,90%)] focus:outline-none"
            placeholder="Message OCP Group Assistant"
            required
          />
          <button
            type="submit"
            className="flex justify-center items-center pt-[2px] pr-[1px] absolute end-2.5 bottom-2.5 hover:bg-[hsl(0,0%,90%)] focus:outline-none rounded-lg h-[30px] w-[30px]"
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
