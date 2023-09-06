import React from "react";
import { Link } from "react-router-dom";

import { Services } from "../../utils/constants/Service";
import ServiceCard from "./components/ServiceCard";
import PersonalCard from "./components/PersonalCard";
import { personal } from "../../utils/constants/Personal";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { fetchCabinet } from "../appointment/cabinetSlice";

function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  React.useEffect(() => {
    const fetchCabinetData = async () => {
      try {
        await dispatch(fetchCabinet());
      } catch (error: any) {
        console.log("ERROR:", error);
      }
    };

    fetchCabinetData();
  }, [dispatch]);
  return (
    <div className="mt-6 px-10">
      <div className="bg-helllilac rounded-xl">
        <h2 className="flex justify-center text-xl text-center font-bold my-3 pt-4">
          Servicii
        </h2>

        <div className="flex flex-row justify-between pb-10 pr-10 pl-4">
          {Services.map((item: any, index: number) => (
            <ServiceCard item={item} index={index} />
          ))}
        </div>
      </div>

      <div className="bg-helllilac rounded-xl px-6 mt-10">
        <h2 className="flex justify-center text-xl text-center font-bold my-3 pt-4">
          Personal
        </h2>

        <div className="flex flex-row justify-between">
          <p className="w-[400px] pl-4 mt-6 text-xl font-light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            enim mauris, bibendum malesuada iaculis in, aliquam et turpis.
            <br /> Image created by Mohamed_hassan:
            https://pixabay.com/ro/users/5229782/
          </p>
          <div className="flex flex-row justify-between pb-10 pr-6">
            {personal.map((item: any, index: number) => (
              <PersonalCard item={item} index={index} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-row items-end">
        <div className="w-1/2 mr-5">
          <div className=" w-auto flex self-center mt-10">
            <img
              width="150"
              src="https://img.icons8.com/color-glass/48/pet-commands-stay.png"
              alt="pet-commands-stay"
            />
            {/* <img className="h-full" src="./images/cat.png" alt="img" /> */}
          </div>
          <div className="bg-helllilac p-16 rounded-xl ">
            <p className="text-center text-xl font-bold">Despre noi</p>
            <p className="text-xl font-light mt-4">
              {" "}
              Cras aliquet vulputate libero vitae ultricies. Mauris felis ante,
              interdum at tincidunt eu, tincidunt ac tortor. Aliquam tempor
              purus eu erat mattis porttitor. Vestibulum eget diam in nunc
              euismod dignissim sed ac ligula.{" "}
            </p>
          </div>
        </div>

        <div className="bg-helllilac w-1/2 mt-10 p-16 rounded-xl ml-5">
          <p className="text-center text-xl font-bold">Contact</p>

          <p className="font-bold mt-4">Telefon:</p>
          <p className="font-light">+40722222222</p>

          <p className="font-bold mt-4">Email:</p>
          <p className="font-light">informatii@tomvet.com</p>

          <p className="font-bold mt-4">Program:</p>
          <div className="flex flex-row">
            <div className="flex flex-col">
              <p className="font-light">Lu-Jo:</p>
              <p className="font-light">Vi-Sa:</p>
            </div>
            <div className="flex flex-col ml-10">
              <p className="font-light">09:00 - 18:00</p>
              <p className="font-light">09:00 - 15:00</p>
            </div>
          </div>

          <p className="font-bold mt-4">Adresa:</p>
          <p className="font-light">Piața Victoriei 2, Timișoara 300006</p>

          <div className="h-[280px] w-auto flex self-center mt-10">
            <img className="h-full" src="./images/map.png" alt="img" />
          </div>
        </div>
      </div>

      <div className="bg-helllilac rounded-xl px-10 pb-10 mt-10">
        <h2 className="flex justify-center text-xl text-center font-bold my-3 pt-6 mb-10">
          Galerie
        </h2>

        <div className="flex flex-row justify-between">
          <img
            className="h-[200px] w-auto rounded-xl"
            src="./images/personal.jpg"
            alt="img"
          />
          <img
            className="h-[200px] w-auto rounded-xl"
            src="./images/personal.jpg"
            alt="img"
          />
          <img
            className="h-[200px] w-auto rounded-xl"
            src="./images/personal.jpg"
            alt="img"
          />
          <img
            className="h-[200px] w-auto rounded-xl"
            src="./images/personal.jpg"
            alt="img"
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
