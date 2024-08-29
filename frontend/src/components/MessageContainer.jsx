import React from "react";
import { HumanMessage } from "./HumanMessage";
import { AIMessage } from "./AIMessage";

export const MessageContainer = (props) => {
  const { msgs } = props;
  return (
    <div className="flex flex-col">
      <HumanMessage value={msgs.human} />
      <AIMessage value={msgs.ai} />
    </div>
  );
};
