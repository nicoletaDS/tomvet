import { Link } from "react-router-dom";

const BestsellerCard = ({ item, index }: any) => {
  return (
    <div
      key={index}
      className="bg-white h-[200px] w-[160px] rounded-xl p-3 mt-6 ml-6 flex flex-col items-center "
    >
      <div className="h-4/6 w-auto flex self-center">
        <img className="h-full" src={item.image} alt="img" />
      </div>

      <Link to={item.path}>
        <p className="text-[15px] font-bold px-2 mt-4 hover:underline hover:cursor-pointer">
          {item.title}
        </p>
      </Link>
    </div>
  );
};

export default BestsellerCard;
