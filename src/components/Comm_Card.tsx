import React, { useEffect } from "react";
import Content from "./Content";
import Count from "./Count";
import Reply_Input from "./Reply_Input";
import Replies from "./Replies";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef } from "react";

export interface DataType {
  id: string;
  content: string;
  createdAt: string;
  score: number;
  commentId: string;
  user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
  replies: ReplyType[];
}

export interface ReplyType extends Omit<DataType, "replies"> {
  replyingTo: string;
  userReply: string;
}

type DataProps = {
  contents: DataType;
  key?: number;
};

const Comm_Card = ({ contents }: DataProps) => {
  const [showReply, setShow] = React.useState<boolean>(false);
  const [updating, setUpdate] = React.useState<boolean>(false);

  const divRef = useRef(null);
  const isView = useInView(divRef, {
    /*  once: true  */
  });

  const control = useAnimation();

  useEffect(() => {
    if (isView) {
      control.start("visible");
    }
  }, [isView]);

  return (
    <motion.div
      className="w-full min-h-min flex-col flex justify-between gap-4 items-end  "
      variants={{
        hidden: { scale: 0 },
        visible: { scale: 1 },
      }}
      initial="hidden"
      animate={control}
      ref={divRef}
      transition={{ duration: 0.1 }}
    >
      <div className="w-full min-w-min bg-w gap-3 flex justify-between p-5 rounded-xl max-[768px]:flex-col-reverse max-[768px]:w-full">
        <Count
          cc={contents.score}
          updating={updating}
          setUpdate={setUpdate}
          setShow={setShow}
          userId={contents.commentId}
          id={contents.id}
        />
        <Content
          setShow={setShow}
          mainContent={contents}
          updating={updating}
          setUpdate={setUpdate}
        />
      </div>
      {showReply && (
        <Reply_Input
          replyingTo={contents.user.username}
          commentId={contents.id}
          setShow={setShow}
        />
      )}

      <div className="flex flex-col br_l  reply_w gap-5 items-end x">
        {contents.replies.map((cont) => (
          <Replies cont={cont} key={parseInt(cont.id)} />
        ))}
      </div>
    </motion.div>
  );
};

export default Comm_Card;
