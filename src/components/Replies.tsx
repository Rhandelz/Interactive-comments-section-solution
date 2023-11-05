import Reply_Content from "./Reply_Content";
import { useState } from "react";
import { ReplyType } from "./Comm_Card";
import Reply_Input from "./Reply_Input";
import ReplyCount from "./ReplyCount";

type ThisProps = {
  cont: ReplyType;
};

const Replies = ({ cont }: ThisProps) => {
  const [showR, setShowR] = useState<boolean>(false);
  const [updating, setUpdate] = useState<boolean>(false);

  return (
    <div className="  flex flex-col items-end reply_w gap-4 ">
      <div className="w-full min-w bg-w   flex justify-between p-5 rounded-xl  max-[768px]:flex-col-reverse">
        <ReplyCount
          cc={cont.score}
          updating={updating}
          setUpdate={setUpdate}
          setShow={setShowR}
          userId={cont.userReply}
          id={cont.commentId}
          replyId={cont.id}
        />
        <Reply_Content
          setShow={setShowR}
          mainContent={cont}
          setUpdate={setUpdate}
          updating={updating}
        />
      </div>

      {showR && (
        <Reply_Input
          replyingTo={cont.user.username}
          commentId={cont.commentId}
          setShow={setShowR}
        />
      )}
    </div>
  );
};

export default Replies;
