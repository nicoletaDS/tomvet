import React, { useState } from "react";
import { Link } from "react-router-dom";

const Dropdown = (props: any) => {
  const { itemsList } = props;
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  console.log("ITEMS", itemsList);

  return (
    <>
      <ul
        onClick={handleClick}
        className={
          click
            ? "hidden"
            : "bg-lilac w-[220px] flex absolute top-5 right-0.5 z-10 list-none text-center rounded-xl border-2 border-gray"
        }
      >
        <div className="w-full">
          {itemsList &&
            itemsList.map((item: any, index: number) => {
              return (
                <li
                  key={index}
                  className="cursor-pointer flex justify-center border-t-[1px] border-gray py-3 p-4 w-full hover:underline"
                >
                  <Link
                    className="h-full w-full decoration-0 text-darkblue text-sm p-3 mt-0 font-normal"
                    to={item.path}
                    onClick={() => setClick(false)}
                  >
                    <p className="text-center font-light">{item.title}</p>
                  </Link>
                </li>
              );
            })}
        </div>
      </ul>
    </>
  );
};

export default Dropdown;
