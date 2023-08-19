import { useSelector } from "react-redux";

import { RootState } from "../../../../store/store";
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faPaw } from "@fortawesome/free-solid-svg-icons";
import Navitem from "./components/NavItem";
import { Tasks } from "../../../../utils/constants/Tasks";
import { DropdownOptions } from "../../../../utils/constants/UserMeniu";
import Dropdown from "./components/Dropdown";
import DropdownTasks from "./components/DropdownTasks";

const Header = () => {
  const sessionState = useSelector((state: RootState) => state.auth);
  const [barsMenu, setBarsMenu] = React.useState(false);

  return (
    <header className="w-full px-12 py-6 m-0 flex flex-col items-center">
      <section>
        <FontAwesomeIcon
          icon={faPaw}
          style={{ color: "#fed762", height: "30px" }}
        />
        <Link
          to="/"
          className="text-2xl text-[34px] mt-4 ml-2 w-32 hover:text-[36px]"
        >
          Tom Vet
        </Link>
      </section>

      <div className="flex flex-row relative bg-lilac justify-between w-full h-10 rounded-full mx-5 mt-2 px-8 items-center">
        <div className="flex flex-row space-x-4">
          <Link to="/" className="text-white">
            Acasă
          </Link>
          <Link to="/produse" className="text-white">
            Magazin
          </Link>
          <Link to="/cos" className="text-white">
            Coșul meu
          </Link>
        </div>

        <div className="flex absolute inset-x-2/4 justify-center my-2">
          <Link
            to="/programare"
            className="bg-white px-3 rounded-full  text-base"
          >
            +programare
          </Link>
        </div>

        <div className="flex flex-row space-x-4">
          <Navitem
            itemLink="/calendar"
            itemName={
              <FontAwesomeIcon
                icon={faCalendarDays}
                style={{ color: "#ffffff", height: "19px" }}
              />
            }
            dropdown={
              <DropdownTasks
                menuItems={Tasks.map((task) => ({
                  title: task.date + " - " + task.time + " " + task.title,
                  path: task.path,
                }))}
              />
            }
          />

          <Navitem
            itemLink="/animale"
            itemName={
              <FontAwesomeIcon
                icon={faPaw}
                style={{ color: "#ffffff", height: "20px" }}
              />
            }
          />

          <Navitem
            itemLink="/profil"
            className="flex relative"
            itemName={<i className="fa-solid fa-user" />}
            dropdown={<Dropdown itemsList={DropdownOptions} />}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
