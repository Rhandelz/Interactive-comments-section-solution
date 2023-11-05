import myDp from "../assets/images/avatars/image-juliusomo.webp";
import { useState } from "react";
import { useAppDispatch } from "../../app/redux_hook";
import { replyComment } from "../features/slice";

const Reply_Input = ({
  replyingTo,
  commentId,
  setShow,
}: {
  replyingTo: string;
  commentId: string;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();

  const [reply, setReply] = useState<string>(`@${replyingTo} `);

  const onChangeReply = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReply(e.target.value);
  };

  const sendReply = () => {
    if (reply && commentId) {
      dispatch(
        replyComment({ commentId, replyingInto: replyingTo, content: reply })
      );

      setShow((prev) => !prev);
    }
  };

  return (
    <div
      id="reply"
      className="w-full flex flex-row justify-evenly items-start bg-w p-5 rounded-xl gap-4"
    >
      <img src={myDp} alt="" className=" rounded-full w-9 h-9" />
      <textarea
        name=""
        id=""
        className="border border-solid border-m_blue outline-none resize-none input_w rounded-lg px-6 py-4 text-d_blue text-base"
        value={reply}
        onChange={onChangeReply}
      ></textarea>
      <button
        className=" bg-m_blue border-none rounded-lg  text-w font-normal text-base px-7 py-3 hover:opacity-50"
        onClick={sendReply}
      >
        REPLY
      </button>
    </div>
  );
};

export default Reply_Input;
