import replyIcon from "../assets/images/icon-reply.svg";
import React, { useState } from "react";
import { DataType } from "./Comm_Card";
import deleteIcon from "../assets/images/icon-delete.svg";
import editIcon from "../assets/images/icon-edit.svg";
import data from "../../data/data.json";
import { useAppDispatch } from "../../app/redux_hook";
import { deleteComment, editComment } from "../features/slice";
import DeleteComment from "./DeleteComment";
import Ago from "./Ago";

type PropType = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  mainContent: DataType;
  updating: boolean;
};

const Content = ({ setShow, mainContent, updating, setUpdate }: PropType) => {
  const dispatch = useAppDispatch();
  const [deleted, showDeleted] = useState<boolean>(false);

  const [content, setContent] = React.useState<string>(mainContent.content);

  const user: boolean = data.currentUser.id === mainContent.commentId;

  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const deleteCom = () => {
    /*   dispatch(deleteComment(mainContent.id)); */
    showDeleted((prev) => !prev);
  };

  const sendUpdate = () => {
    setUpdate((prev) => !prev);
    if (content) {
      dispatch(editComment({ id: mainContent.id, content }));
    }
  };

  return (
    <>
      <DeleteComment
        setDeleted={showDeleted}
        deleted={deleted}
        commentId={mainContent.id}
        replyId=""
        replyCommentId=""
      />
      <div className="h-full w-full min">
        <div className=" w-full h-9 gap-4 flex flex-row justify-between mb-3">
          {/* Left */}
          <div
            className="px-1 min-w-min  w-min max-[768px]:w_dp h-full flex flex-row justify-between  gap-4 items-center 
    "
            id="left"
          >
            {/*  */}
            <div className="h-8 w-8 bg-vl_gray rounded-full ">
              <img
                src={mainContent.user.image.png}
                alt=""
                className="h-full w-full object-fill"
              />
            </div>
            <span className="text-d_blue p_size font-bold font-rubik flex flex-row">
              {mainContent.user.username}

              {user ? (
                <p className=" text-w bg-m_blue p-1 text-xs rounded-md ml-2">
                  you
                </p>
              ) : (
                ""
              )}
            </span>

            {/*  */}
          </div>

          {/* Right */}
          <div
            className="w-full dp_left_w flex flex-row items-center justify-between max-[768px]:w-full"
            id="right"
          >
            <Ago createdAt={mainContent?.createdAt} />

            {user ? (
              <span className="flex flex-row items-center justify-center gap-6  max-[768px]:hidden">
                <button
                  className="flex justify-center flex-row items-center gap-2 hover:opacity-50  "
                  onClick={deleteCom}
                >
                  <img src={deleteIcon} alt="" />
                  <p className=" font-bold text-s_red text-base">Delete</p>
                </button>

                <button
                  className="flex justify-center flex-row items-center gap-2 hover:opacity-50 "
                  onClick={() => setUpdate((prev) => !prev)}
                >
                  <img src={editIcon} alt="" />
                  <p className=" font-bold text-m_blue text-base">Edit</p>
                </button>
              </span>
            ) : (
              <button
                className="flex flex-row text-m_blue none font-bold justify-center items-center gap-2 hover:opacity-50  max-[768px]:hidden"
                onClick={() => setShow((prev) => !prev)}
              >
                <img src={replyIcon} alt="" className=" h-4 w-4" />
                <p>reply</p>
              </button>
            )}
          </div>
        </div>

        <div className="w-full h-min p-1 gap-4">
          {updating ? (
            <>
              <textarea
                name=""
                id=""
                className="border border-solid border-m_blue outline-none w-full h-auto resize-none overflow-y-auto row-auto px-6 py-4"
                value={content}
                onChange={onChangeContent}
                rows={4}
              ></textarea>
              <span className="w-full flex justify-end">
                {" "}
                <button
                  className={`${
                    content === mainContent.content ? "bg-lg_blue" : "bg-m_blue"
                  } border-none rounded-lg  text-w font-normal text-base px-7 py-3 hover:opacity-50`}
                  disabled={content === mainContent.content}
                  onClick={sendUpdate}
                >
                  UPDATE
                </button>
              </span>
            </>
          ) : (
            <p className="text-g_blue leading-6 w-fullw ">
              {mainContent.content}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Content;
