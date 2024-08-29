import React from "react";
import { Message } from "./Message";

export const HumanMessage = (props) => {
  const { value } = props;
  return <Message messageFor="human" text={props.value} />;
};
