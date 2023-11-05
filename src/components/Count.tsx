import deleteIcon from "../assets/images/icon-delete.svg";
import editIcon from "../assets/images/icon-edit.svg";
import replyIcon from "../assets/images/icon-reply.svg";
import data from "../../data/data.json";
import { increament, decreament } from "../features/slice";
import { useAppDispatch } from "../../app/redux_hook";
import { useState } from "react";
import DeleteComment from "./DeleteComment";

type CountProps = {
  cc: number;
  updating: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
  id: string;
};

const Count = ({ cc, setUpdate, setShow, userId, id }: CountProps) => {
  const dispatch = useAppDispatch();
  const [deleted, showDeleted] = useState<boolean>(false);

  const user: boolean = data.currentUser.id === userId;

  const deleteCom = () => {
    /*     dispatch(deleteComment(id)); */
    showDeleted((prev) => !prev);
  };

  return (
    <>
      <DeleteComment
        setDeleted={showDeleted}
        deleted={deleted}
        commentId={id}
        replyId=""
        replyCommentId=""
      />
      <div className=" h-full btn_w flex justify-center items-start max-[768px]:w-full max-[768px]:justify-between max-[768px]:items-center">
        <div className="bg-lg_blue w-10 flex flex-col justify-center items-center h-24  p_size rounded-xl text-m_blue max-[768px]:h-min max-[768px]:flex-row max-[768px]:w-min max-[768px]:gap-4 max-[768px]:p-4">
          <button
            className="font-bold hover:opacity-100 opacity-50"
            onClick={() => dispatch(increament({ id, replyId: null }))}
          >
            +
          </button>
          <p className="font-bold">{cc}</p>
          <button
            className="font-bold hover:opacity-100 opacity-50"
            onClick={() => dispatch(decreament({ id, replyId: null }))}
          >
            -
          </button>
        </div>

        {user ? (
          <span className="flex flex-row items-center justify-center gap-6  md:hidden">
            <button
              className="flex justify-center flex-row items-center gap-2 hover:opacity-50"
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
            className="flex flex-row text-m_blue none font-bold justify-center items-center gap-2 hover:opacity-50  md:hidden"
            onClick={() => setShow((prev) => !prev)}
          >
            <img src={replyIcon} alt="" className=" h-4 w-4" />
            <p>reply</p>
          </button>
        )}
      </div>
    </>
  );
};

export default Count;
