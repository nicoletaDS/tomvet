import { Link } from "react-router-dom";

const CategoriesCard = ({ item, bgColor, index }: any) => {
  return (
    <div
      key={index}
      style={{ backgroundColor: `${item.bgColor}` }}
      className={
        item.bgColor +
        "h-[100px] w-[80px] rounded-xl p-3 mt-4 ml-6 flex flex-col items-center"
      }
    >
      <div className="flex self-center">{item.icon}</div>

      <Link to={item.path}>
        <p className="text-[15px] font-bold px-2 mt-2 hover:underline hover:cursor-pointer">
          {item.title}
        </p>
      </Link>
    </div>
  );
};

export default CategoriesCard;
