import React from "react";
import data from "../../data/data.json";
import { DataType } from "./Comm_Card";
import { nanoid } from "nanoid";
import { addComment } from "../features/slice";
import { useAppDispatch } from "../../app/redux_hook";

const My_Comment = ({ dp }: { dp: string }) => {
  const comId: string = nanoid().toString();

  const dispatch = useAppDispatch();

  const [comment, setComment] = React.useState<DataType>({
    id: comId,
    content: "",
    createdAt: new Date().toISOString(),
    score: 0,
    commentId: data.currentUser.id,
    user: {
      image: {
        png: data.currentUser.image.png,
        webp: data.currentUser.image.png,
      },
      username: data.currentUser.username,
    },
    replies: [],
  });

  const onChangeSet = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment((prev) => {
      return { ...prev, content: e.target.value };
    });
  };

  const send = () => {
    if (comment.content) {
      dispatch(addComment(comment));

      window.scrollBy(0, 100);
    }

    setComment({
      id: comId,
      content: "",
      createdAt: new Date().toISOString(),
      score: 0,
      commentId: data.currentUser.id,
      user: {
        image: {
          png: data.currentUser.image.png,
          webp: data.currentUser.image.png,
        },
        username: data.currentUser.username,
      },
      replies: [],
    });
  };

  return (
    <div
      id="my_comment"
      className=" p_w w-full flex flex-row justify-evenly items-start bg-w p-5 rounded-xl max-[768px]:w-full max-[768px]:flex-col max-[768px]:items-center "
    >
      <img
        src={dp}
        alt=""
        className=" rounded-full w-9 h-9 max-[768px]:hidden"
      />
      <textarea
        name=""
        id=""
        className="border border-solid border-m_blue outline-none resize-none input_w rounded-lg px-6 py-4 text-d_blue text-base max-[768px]:w-full"
        placeholder="Add comment ..."
        onChange={onChangeSet}
        value={comment.content}
      ></textarea>
      <button
        className=" bg-m_blue border-none rounded-lg  text-w font-normal text-base px-7 py-3 hover:opacity-50 max-[768px]:hidden"
        onClick={send}
      >
        REPLY
      </button>

      <span className=" w-full min-h-min flex flex-row justify-between items-start mt-4 md:hidden">
        <img src={dp} alt="" className=" rounded-full w-9 h-9" />

        <button
          className=" bg-m_blue border-none rounded-lg  text-w font-normal text-base px-7 py-3 hover:opacity-50"
          onClick={send}
        >
          REPLY
        </button>
      </span>
    </div>
  );
};

export default My_Comment;
