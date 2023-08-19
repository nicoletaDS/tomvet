import React, { useState } from "react";
import { Link } from "react-router-dom";

const DropdownTasks = ({ menuItems }: any) => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <>
      <ul
        onClick={handleClick}
        className={
          click
            ? "hidden"
            : "bg-lilac w-[300px] flex absolute top-5 right-0.5 z-10 list-none text-center rounded-xl border-2 border-gray"
        }
      >
        {menuItems.length === 0 ? (
          <li className="py-3">Nu aveti programari.</li>
        ) : (
          <div className="w-full px-3">
            <li className="py-3 text-sm hover:cursor-auto">CALENDAR</li>
            <li className="mb-3 pt-3 border-t-[1px] border-gray">
              <li className="py-3 text-sm hover:cursor-auto">
                Ultimele programari:
              </li>
              {menuItems.map((item: any, index: number) => {
                return (
                  <li
                    key={index}
                    className="cursor-pointer flex justify-self-center justify-center border-gray py-1 w-full"
                  >
                    <Link
                      to={item.path}
                      className="h-full w-full decoration-0 text-darkblue text-sm p-3 mt-0 font-normal"
                      onClick={() => setClick(false)}
                    >
                      <div className="flex justify-between text-xs">
                        <div
                          className={`${
                            item.isRead ? "font-light" : "font-semibold"
                          } text-left mr-3`}
                        >
                          {item.title}
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
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

export default DropdownTasks;
