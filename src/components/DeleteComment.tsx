import React from "react";
import { deleteComment, deleteReply } from "../features/slice";
import { useAppDispatch } from "../../app/redux_hook";
import { motion } from "framer-motion";

type DeleteProps = {
  setDeleted: React.Dispatch<React.SetStateAction<boolean>>;
  deleted: boolean;
  commentId: string;
  replyId: string;
  replyCommentId: string;
};

const DeleteComment = ({
  deleted,
  setDeleted,
  commentId,
  replyId,
  replyCommentId,
}: DeleteProps) => {
  const dispatch = useAppDispatch();

  const deleteContent = () => {
    if (!replyId) {
      dispatch(deleteComment(commentId));
      setDeleted((prev) => !prev);
      console.log(replyCommentId);
    } else {
      dispatch(deleteReply({ commentId: replyId, userId: commentId }));
      /* setDeleted((prev) => !prev); */
      //   deleteReply({ commentId: mainContent.id, userId: mainContent.commentId })
      console.log(replyCommentId);
    }
  };

  const variants = {
    start: {
      scale: 0.4,
      borderRadius: 100,
      transition: {
        staggerChildren: 0.1 /* delayChildren: 0.2 */,
        when: "afterChildren",
      },
    },
    end: {
      scale: 1,
      borderRadius: 10,

      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div
      className={`${
        deleted ? "block" : "hidden"
      } absolute left-0 top-0 flex justify-center items-center  w-screen h-screen after:bg-d_blue after:h-full after:w-full after:absolute after:opacity-50`}
    >
      <motion.div
        initial={false}
        animate={deleted ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.1 }}
        className=" bg-w  modal_w rounded-xl px-8 pt-7 pb-6 flex flex-col mb-6 z-10"
      >
        <h1 className=" font-bold text-d_blue ">Delete Comment</h1>
        <p className=" leading-6 text-g_blue mb-5">
          are you sure you want to delete this comment? This will remove the
          comment and can't be undone
        </p>

        <span className=" w-full flex flex-row justify-center items-center gap-2">
          <button
            className=" px-6 py-3 text-base font-bold bg-d_blue rounded-xl text-w hover:opacity-50"
            onClick={() => setDeleted((prev) => !prev)}
          >
            No,Cancel
          </button>
          <button
            className=" px-6 py-3 text-base font-bold bg-s_red rounded-xl text-w hover:opacity-50"
            onClick={deleteContent}
          >
            Yes,Delete
          </button>
        </span>
      </motion.div>
    </div>
  );
};

export default DeleteComment;
