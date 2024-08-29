import React, { useState, useRef, useEffect, useContext } from "react";
import { MessageContainer } from "./MessageContainer";
import ConvIdContext from "../context/ConvIdProvider";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const ASK_ASSISTANT = "/assistant";
const GET_CHAT_HISTORY = "assistant/messages";

export const Chat = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);
  const { convIdContext, setConvIdContext } = useContext(ConvIdContext);
  const { auth } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // handle textarea size
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
  // set the messages to null if the conv id is null
  useEffect(() => {
    if (convIdContext == null) {
      setMessages([]);
    }
  }, [convIdContext]);
  // load the messages when the conv id is changed is loaded if the conversation id is not null
  useEffect(() => {
    if (convIdContext) {
      setIsLoading(true);
      axios
        .get(`${GET_CHAT_HISTORY}?conv_id=${convIdContext}`, {
          headers: {
            Authorization: `${auth.tokenType} ${auth.accessToken}`,
          },
        })
        .then((res) => {
          setMessages(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          if (err.status === 401) {
            navigate("/login");
          } else {
            setIsError(true);
          }
        });
    }
  }, [convIdContext]);
  // ask the assistant
  const handleAskAssistant = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(
        ASK_ASSISTANT,
        {
          query: message,
          conv_id: convIdContext,
        },
        {
          headers: {
            Authorization: `${auth.tokenType} ${auth.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        const newMessage = {
          human: message,
          ai: res.data.response,
          msg_id: res.data.msg_id,
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setMessage("");
        setConvIdContext(res.data.conv_id);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.status === 401) {
          navigate("/login");
        } else {
          setIsError(true);
        }
      });
  };

  return (
    <>
      <div className=" w-5/6 md:w-4/6 mx-auto p-4 flex flex-col justify-between h-[calc(100vh-80px)] overflow-auto">
        {isLoading && (
          <div className="flex items-start justify-center">
            <div
              role="status"
              className="flex flex-col items-center justify-center mt-16"
            >
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-custom-green animate-spin dark:text-gray-600 fill-[hsl(0,0%,70%)]"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        <div className="flex-1 overflow-auto">
          {!isLoading &&
            messages.map((msg) => (
              <MessageContainer key={msg.msg_id} msgs={msg} />
            ))}
        </div>
        <form
          onSubmit={handleAskAssistant}
          className="relative border p-[10px] ps-8 pe-12 border-gray-300 rounded-3xl bg-[hsl(0,0%,95%)]"
        >
          <textarea
            type="text"
            id="search"
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`text-wrap resize-none block pt-[4px] p-0 w-full text-sm text-main border-none bg-transparent ring-0 focus:ring-0 focus:outline-none`}
            placeholder="Ask OCP Group Assistant"
            required
          ></textarea>
          <button className="flex justify-center items-center pt-[2px] pr-[1px] absolute end-2.5 bottom-[50%] transform translate-y-1/2  hover:bg-[hsl(0,0%,90%)] focus:outline-none rounded-lg h-[30px] w-[30px]">
            <img
              src="./src/assets/send.svg"
              alt="send message"
              className="w-[23px] h-[23px]"
            />
          </button>
        </form>
      </div>
    </>
  );
};
