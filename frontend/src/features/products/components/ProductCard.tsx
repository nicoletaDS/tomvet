import { Link } from "react-router-dom";

const backendURL = "http://127.0.0.1:8000";

const ProductCard = ({ item, index }: any) => {
  return (
    <div
      key={index}
      className="bg-helllilac flex-wrap h-[300px] w-[200px] rounded-xl p-3 mt-6 ml-12 flex flex-col items-center hover:cursor-pointer hover:border hover:border-lilac"
    >
      <Link
        to={`/produse/${item.id}`}
        className="h-5/6 flex flex-col justify-between items-center"
      >
        <div className="h-4/6 w-auto">
          <img className="h-full" src={backendURL + item.image} alt="img" />
        </div>
        <div className="px-2">
          <p className="font-bold">{item.title}</p>
          <p>
            {item.price} {item.sell_by}
          </p>
        </div>
      </Link>
      <div className="bg-lilac w-full mt-2 flex justify-center items-center rounded-full">
        <Link
          to=""
          className="mt-1 text-white text-center hover:underline pb-1"
        >
          + adaugă în coș
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
