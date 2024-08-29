import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const GET_CONVS_URL = "/assistant/convs";

const SideBar = (props) => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [convs, setConvs] = useState({});
  const [id] = useState(1);
  const [title, setTitle] = useState("hello world");
  const [newTitle, setNewTitle] = useState("");
  const [isEditTitleClicked, setIsEditTitleClicked] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  useEffect(() => {
    setIsDataLoaded(false);
    axios
      .get(GET_CONVS_URL, {
        headers: {
          Authorization: `${auth.tokenType} ${auth.accessToken}`,
        },
      })
      .then((res) => {
        // response = res.data;
        console.log(res.data);
      })
      .catch((err) => {
        if (err.status === 401) {
          navigate("/unauthorized");
        }
        console.log(err);
      });

    const timer = setTimeout(() => {
      setIsDataLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const EDIT_TITLE_ICON = "./src/assets/edit-2.svg";
  const DELETE_CONV_ICON = "./src/assets/trash.svg";
  const CONFIRM_NEW_TITLE_ICON = "./src/assets/check.svg";
  const CANCEL_EDIT_TITLE_ICON = "./src/assets/x.svg";

  const handleClickEditButton = () => {
    setIsEditTitleClicked(true);
  };

  const handleCancelButton = () => {
    setIsEditTitleClicked(false);
    setNewTitle(""); // Reset newTitle when canceling
  };

  const handleConfirmNewTitle = () => {
    setIsEditTitleClicked(false);
    setTitle(newTitle);
    setNewTitle(""); // Clear newTitle after confirming
  };

  const handleChangeTitle = (e) => {
    setNewTitle(e.target.value);
  };

  const handleDeleteConv = () => {
    // handle delete conv with `id`
  };

  return (
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
        <button className="flex justify-center items-center hover:bg-[hsl(0,0%,90%)] focus:outline-none rounded-md h-[30px] w-[30px]">
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
            <li
              key={id}
              className="conv-title mb-3 h-9 hover:bg-[hsl(0,0%,90%)] rounded-md p-[8px]"
            >
              {!isEditTitleClicked ? (
                <span className="conv-text text-sm text-main overflow-hidden">
                  {title}
                </span>
              ) : (
                <input
                  type="text"
                  className="conv-text w-[120px] p-[4px] bg-[hsl(0,0%,94%)] text-xs md:text-sm border-none h-[21px]"
                  value={newTitle}
                  onChange={handleChangeTitle}
                />
              )}
              <div className="conv-icons flex justify-end items-center">
                <img
                  src={
                    isEditTitleClicked
                      ? CANCEL_EDIT_TITLE_ICON
                      : EDIT_TITLE_ICON
                  }
                  alt="edit conversation's title"
                  className="w-[14px] h-[14px] mr-[10px] hover:cursor-pointer"
                  onClick={
                    isEditTitleClicked
                      ? handleCancelButton
                      : handleClickEditButton
                  }
                />
                <img
                  src={
                    isEditTitleClicked
                      ? CONFIRM_NEW_TITLE_ICON
                      : DELETE_CONV_ICON
                  }
                  alt="delete conversation"
                  className="w-[14px] h-[14px] hover:cursor-pointer"
                  onClick={
                    isEditTitleClicked
                      ? handleConfirmNewTitle
                      : () => handleDeleteConv(id)
                  }
                />
              </div>
            </li>
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
  );
};

export default SideBar;
