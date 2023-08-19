import React, { useState } from "react";
import { Link } from "react-router-dom";

const Dropdown = (props: any) => {
  const {
    noItem,
    itemsList,
    headerItem,
    showAll,
    component: Component,
  } = props;
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <>
      <ul
        onClick={handleClick}
        className={
          click
            ? "hidden"
            : "bg-white w-[300px] flex absolute top-6 right-1 z-10 list-none text-center rounded-xl"
        }
      >
        {itemsList.length === 0 && noItem && <li className="py-3">{noItem}</li>}
        {itemsList.length !== 0 && (
          <div className="w-full px-3">
            {headerItem && (
              <li className="py-3 text-sm hover:cursor-auto">{headerItem}</li>
            )}
            {itemsList.map((item: any, index: number) => {
              console.log("inainte", item);
              return (
                <li
                  key={index}
                  className="cursor-pointer flex justify-self-center justify-center border-t-[1px] border-gray py-3 p-4 w-full hover:bg-gray hover:p-4"
                >
                  <Link
                    className="h-full w-full decoration-0 text-darkblue text-sm p-3 mt-0 font-normal"
                    to={item.path}
                    onClick={() => setClick(false)}
                  >
                    <Component item={item} />
                  </Link>
                </li>
              );
            })}
            <li className="mb-3 pt-3 border-t-[1px] border-gray">
              <Link
                className="text-sm underline"
                to=""
                onClick={() => setClick(false)}
              >
                Afiseaza toate
              </Link>
            </li>
          </div>
        )}
      </ul>
    </>
  );
};

export default Dropdown;
