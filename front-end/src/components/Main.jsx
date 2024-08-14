import React from "react";
import { Button } from "./Button";

export const Main = () => {
  return (
    <main className="flex flex-col justify-between md:flex-row my-5 md:my-10">
      <div className="flex flex-col justify-between items-start gap-6">
        <h1 className="text-base md:text-2xl">OCP Group Assistant</h1>
        <p className="pt-[-20px] w-5/6 leading-8 text-justify text-sm md:text-base">
          We are delighted to introduce you to your innovative chat-bot,
          specially designed to provide you with seamless support and
          solutions.Feel free to reach out with any questions or problems, and
          we'll be more than happy to assist you.
        </p>
        <Button content="Try It Now" />
      </div>
      <img
        src="./src/assets/chatbot_green 1.png"
        alt="chat-bot image"
        className="mt-[10px] h-[224px] w-[245px] lg:w-[360px] lg:h-[330px]"
      />
    </main>
  );
};
