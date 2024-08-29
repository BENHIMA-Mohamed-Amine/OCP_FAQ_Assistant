import React from "react";
import { Message } from "./Message";

export const AIMessage = (props) => {
  const { value } = props;
  return <Message messageFor="ai" text={value} />;
};
