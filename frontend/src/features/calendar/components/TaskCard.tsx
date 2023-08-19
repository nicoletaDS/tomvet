import { Link } from "react-router-dom";
import CustomCheckbox from "../../../app/components/form/CustomCheckbox";
import React from "react";

const TaskCard = ({ item, index, handleChange }: any) => {
  return (
    <div
      key={index}
      className="h-[200px] w-[700px] min-w-[600px] p-3 mt-6 ml-6 items-center justify-between"
    >
      <Link to="">
        <div className="flex w-full px-2 justify-between align-center content-center">
          <div className="flex flex-col">
            <p className="mb-3">{item.date}</p>
            <p className="mb-3">{item.time}</p>
            <div className="custom-checkbox flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={item.done}
                onChange={handleChange}
                className="hidden"
              />
              <span
                className={`checkbox-icon w-6 h-6 border border-gray-400 rounded-md mr-2 ${
                  item.done ? "bg-lilac" : "bg-white"
                }`}
              ></span>
            </div>
            <p className="mb-3">{item.done}</p>
          </div>
          <div className="flex flex-col w-full bg-white rounded-xl ml-12 px-10 pt-6 text-[18px] ">
            <p className="font-bold">{item.title}</p>
            <p className="font-bold mb-3 ">{item.pet}</p>
            <p className="">{item.details}</p>
            {item.repeat && (
              <p>
                {item.repeat} din {item.date} pana la {item.endDate}
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TaskCard;
