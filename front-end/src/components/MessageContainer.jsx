import React from "react";
import { HumanMessage } from "./HumanMessage";
import { AIMessage } from "./AIMessage";

export const MessageContainer = () => {
  return (
    <div className="flex flex-col gap-4">
      <HumanMessage />
      <AIMessage />
    </div>
  );
};
