import { parseISO, formatDistanceToNow } from "date-fns";

type Props = {
  createdAt: string;
};

const Ago = ({ createdAt }: Props) => {
  let timeAgo: string = "";

  if (createdAt) {
    const dated = parseISO(createdAt);
    const timePeriod = formatDistanceToNow(dated);
    timeAgo = `${timePeriod} ago`;
  }

  return <p className=" text-g_blue font-rubik font-normal">{timeAgo}</p>;
};

export default Ago;
