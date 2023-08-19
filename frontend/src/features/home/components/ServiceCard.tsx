import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";

const ServiceCard = ({ item, index }: any) => {
  return (
    <div
      key={index}
      className="bg-white h-[180px] w-[150px] min-w-[150px] rounded-xl p-3 mt-6 ml-6 flex flex-col relative items-center justify-between"
    >
      <FontAwesomeIcon
        icon={faPaw}
        style={{
          color: "#fed762",
          height: "100px",
          opacity: "40%",
          position: "absolute",
          marginTop: "20px",
        }}
      />
      <div className="z-10 flex flex-col w-full px-2 justify-between align-center content-center">
        <div>
          <p className="font-bold mb-3">{item.title}</p>
          <ul className="list-disc pl-2">
            {item.categories.map((category: String, i: number) => (
              <li className="text-[13px]">{category}</li>
            ))}
          </ul>
        </div>
        <Link
          to=""
          className="absolute bottom-3 right-6 text-[12px] hover:underline hover:cursor-pointer"
        >
          detalii...
        </Link>{" "}
      </div>
    </div>
  );
};

export default ServiceCard;
