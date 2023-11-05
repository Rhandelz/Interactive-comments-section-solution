import datas from "../data/data.json";
import Comm_Card from "./components/Comm_Card";
import My_Comment from "./components/My_Comment";
import { selectComment } from "./features/slice";
import { useAppSelector } from "../app/redux_hook";
import { DataType } from "./features/slice";

const App = () => {
  const data = useAppSelector(selectComment);

  const mapData = data.map((data: DataType) => (
    <Comm_Card contents={data} key={parseInt(data.id)} />
  ));

  return (
    <>
      <div className="p_w h-min max-h-full gap-5 flex flex-col  pt-8 mb-5   items-end overflow-auto max-[768px]:w-full  ">
        {mapData}
      </div>
      <My_Comment dp={datas.currentUser.image.webp} />
    </>
  );
};

export default App;
