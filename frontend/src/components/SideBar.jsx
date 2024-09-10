import React, { useEffect, useState, useContext } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const GET_CONVS_URL = "/assistant/convs";
const DELETE_CONV = "/assistant/delete";
const EDIT_TITLE = "/assistant/title";

const SideBar = (props) => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["convId"]);
  const { auth } = useAuth();
  const [convs, setConvs] = useState([]);
  const [id] = useState(1);
  const [title, setTitle] = useState("hello world");
  const [newTitle, setNewTitle] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  function getAllConvs() {
    axios
      .get(GET_CONVS_URL, {
        headers: {
          Authorization: `${auth.tokenType} ${auth.accessToken}`,
        },
      })
      .then((res) => {
        setConvs(res.data);
        setIsDataLoaded(true);
      })
      .catch((err) => {
        if (err.status === 401) {
          navigate("/unauthorized");
        }
        console.log(err);
      });
  }
  useEffect(() => {
    setIsDataLoaded(false);
    getAllConvs();
  }, [cookies.convId]);

  const EDIT_TITLE_ICON = "./src/assets/edit-2.svg";
  const DELETE_CONV_ICON = "./src/assets/trash.svg";
  const CONFIRM_NEW_TITLE_ICON = "./src/assets/check.svg";
  const CANCEL_EDIT_TITLE_ICON = "./src/assets/x.svg";

  const handleClickEditButton = (convId) => {
    setIsEditing(convId);
  };

  const handleCancelButton = () => {
    setIsEditing(null);
    setNewTitle(""); // Reset newTitle when canceling
  };

  const handleConfirmNewTitle = () => {
    if (isEditing !== null) {
      axios
        .put(
          EDIT_TITLE,
          {
            conversation_id: isEditing,
            user_id: auth.user_id,
            title: newTitle,
          },
          {
            headers: {
              Authorization: `${auth.tokenType} ${auth.accessToken}`,
            },
          }
        )
        .then((response) => {
          // Handle success
          console.log("Success:", response.data);
        })
        .catch((error) => {
          // Handle error
          console.error("Error:", error.response?.data || error.message);
        });

      setConvs((prevConvs) =>
        prevConvs.map((conv) =>
          conv.conversation_id === isEditing
            ? { ...conv, title: newTitle }
            : conv
        )
      );
      setIsEditing(null);
      setNewTitle(""); // Clear newTitle after confirming
    }
  };

  const handleChangeTitle = (e) => {
    setNewTitle(e.target.value);
  };

  const handleDeleteConv = (convId) => {
    axios
      .delete(`${DELETE_CONV}/${convId}`, {
        headers: {
          Authorization: `${auth.tokenType} ${auth.accessToken}`,
        },
      })
      .then((response) => {
        getAllConvs();
        setCookie("convId", null);
      })
      .catch((error) => {
        console.error(
          "Error deleting conversation:",
          error.response?.data || error.message
        );
      });
  };

  return (
    <>
      <div className="bg-[hsl(0,0%,95%)] h-dvh overflow-auto sidebar">
        <div className="flex items-center justify-between h-[80px] px-3 py-7">
          <button className="flex justify-center items-center hover:bg-[hsl(0,0%,90%)] focus:outline-none rounded-md h-[30px] w-[30px]">
            <img
              src="./src/assets/sidebar.svg"
              alt="hide side bar"
              className="hover:cursor-pointer x-[20px] h-[20px]"
              onClick={props.toggleSidebar}
            />
          </button>
          <button
            onClick={() => setCookie("convId", null)}
            className="flex justify-center items-center hover:bg-[hsl(0,0%,90%)] focus:outline-none rounded-md h-[30px] w-[30px]"
          >
            <img
              src="./src/assets/edit.svg"
              alt="new conversation"
              className="hover:cursor-pointer x-[20px] h-[20px]"
            />
          </button>
        </div>
        {isDataLoaded && (
          <div className="p-3">
            <ul>
              {convs.length !== 0 &&
                convs.map((conv) => (
                  <li
                    key={conv.conversation_id}
                    className={`conv-title mb-3 h-9 hover:bg-[hsl(0,0%,90%)] rounded-md p-[8px] ${
                      conv.conversation_id == cookies.convId
                        ? "bg-[hsl(0,0%,90%)]"
                        : ""
                    }`}
                  >
                    {isEditing === conv.conversation_id ? (
                      <input
                        type="text"
                        className="conv-text w-[106px] p-[4px] bg-[hsl(0,0%,94%)] text-xs border-none h-[21px]"
                        value={newTitle}
                        onChange={handleChangeTitle}
                      />
                    ) : (
                      <span
                        onClick={() =>
                          setCookie("convId", conv.conversation_id)
                        }
                        className="conv-text text-sm text-main truncate cursor-pointer"
                      >
                        {conv.title}
                      </span>
                    )}
                    <div className="conv-icons flex justify-end items-center">
                      <img
                        src={
                          isEditing === conv.conversation_id
                            ? CANCEL_EDIT_TITLE_ICON
                            : EDIT_TITLE_ICON
                        }
                        alt="edit conversation's title"
                        className="w-[14px] h-[14px] mr-[10px] hover:cursor-pointer"
                        onClick={
                          isEditing === conv.conversation_id
                            ? handleCancelButton
                            : () => handleClickEditButton(conv.conversation_id)
                        }
                      />
                      {isEditing === conv.conversation_id ? (
                        <img
                          src={CONFIRM_NEW_TITLE_ICON}
                          className="w-[14px] h-[14px] hover:cursor-pointer"
                          onClick={handleConfirmNewTitle}
                        />
                      ) : (
                        <>
                          {/* <button
                            id="deleteButton"
                            data-modal-target="deleteModal"
                            data-modal-toggle="deleteModal"
                            type="buttom"
                            onClick={() =>
                              handleDeleteConv(conv.conversation_id)
                            }
                          >
                            <img
                              src={DELETE_CONV_ICON}
                              className="w-[14px] h-[14px] hover:cursor-pointer"
                            />
                          </button>
                          <div
                            id="deleteModal"
                            tabIndex="-1"
                            aria-hidden="true"
                            data-modal-target="deleteModal"
                            data-modal-toggle="deleteModal"
                            className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"
                          >
                            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                              <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                                <button
                                  type="button"
                                  className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                  data-modal-toggle="deleteModal"
                                  data-modal-hide="deleteModal"
                                >
                                  <svg
                                    aria-hidden="true"
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                      clipRule="evenodd"
                                    ></path>
                                  </svg>
                                  <span className="sr-only">Close modal</span>
                                </button>
                                <svg
                                  className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
                                  aria-hidden="true"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                  ></path>
                                </svg>
                                <p className="mb-4 text-gray-500 dark:text-gray-300">
                                  Are you sure you want to delete this item?
                                </p>
                                <div className="flex justify-center items-center space-x-4">
                                  <button
                                    data-modal-toggle="deleteModal"
                                    type="button"
                                    className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                  >
                                    No, cancel
                                  </button>
                                  <button
                                    type="submit"
                                    className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                                  >
                                    Yes, I'm sure
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div> */}
                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteConv(conv.conversation_id)
                            }
                          >
                            <img
                              src={DELETE_CONV_ICON}
                              className="w-[14px] h-[14px] hover:cursor-pointer"
                            />
                          </button>
                        </>
                      )}
                    </div>
                  </li>
                ))}
              {isDataLoaded && convs.length == 0 && (
                <p className="text-center text-sm">No Conversations</p>
              )}
            </ul>
          </div>
        )}
        {!isDataLoaded && (
          <div className="flex items-start justify-center">
            <div
              role="status"
              className="flex flex-col items-center justify-center mt-16"
            >
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[hsl(0,0%,70%)]"
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
      </div>
    </>
  );
};

export default SideBar;
