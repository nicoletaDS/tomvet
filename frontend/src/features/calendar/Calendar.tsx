import { Link } from "react-router-dom";
import { Services } from "../../utils/constants/Service";
import ServiceCard from "../home/components/ServiceCard";

import {
  Datepicker,
  DatepickerEvent,
} from "@meinefinsternis/react-horizontal-date-picker";
import { enUS } from "date-fns/locale";
import React from "react";
import { Tasks } from "../../utils/constants/Tasks";
import TaskCard from "./components/TaskCard";
import CalendarComponent from "./components/CalendarComponent";
import { default as dayjs } from "dayjs";
import AppointmentModal from "./components/AppointmentModal";
import TaskModal from "./components/TaskModal";
type Select = string | number | null;

const Calendar = (props: any) => {
  // if selected show task from selected day, else show all
  const currentDay = dayjs().format("DD.MM.YYYY");
  const [selected, setSelected] = React.useState<Select>();

  // daca data e selectata
  const handleCheckboxChange = (id: any) => {
    //set item.done= !item.done
  };

  const [appModalIsOpen, setAppModalIsOpen] = React.useState(false);

  function openAppModal() {
    setAppModalIsOpen(true);
  }

  function closeAppModal() {
    setAppModalIsOpen(false);
  }

  const [taskModalIsOpen, setTaskModalIsOpen] = React.useState(false);

  function openTaskModal() {
    setTaskModalIsOpen(true);
  }

  function closeTaskModal() {
    setTaskModalIsOpen(false);
  }

  return (
    <div className="mt-6 px-10">
      <div className="bg-helllilac rounded-xl py-4">
        <div className="flex flex-row relative justify-center pt-4">
          <p className="text-xl font-bold">Azi</p>
          <p className="w-fit absolute right-16">{currentDay}</p>
        </div>

        <CalendarComponent selected={selected} setSelected={setSelected} />
      </div>

      <div className="bg-helllilac rounded-xl mt-10">
        <h2 className="flex justify-center text-xl font-bold my-3 pt-8">
          Calendar
        </h2>

        <div className="flex justify-center my-6 ">
          <button
            className="bg-white rounded-full border px-4 py-1 mr-2 hover:text-white hover:bg-lilac"
            onClick={openAppModal}
          >
            + adauga programare
          </button>
          <AppointmentModal
            modalIsOpen={appModalIsOpen}
            closeModal={closeAppModal}
          />

          <button
            className="bg-white rounded-full border px-4 py-1 ml-2 hover:text-white hover:bg-lilac"
            onClick={openTaskModal}
          >
            + adauga activitate
          </button>
          <TaskModal
            modalIsOpen={taskModalIsOpen}
            closeModal={closeTaskModal}
          />
        </div>

        <div className="bg-helllilac rounded-xl flex flex-col justify-center align-center items-center pb-10 pr-10 pl-4">
          {Tasks.map((item: any, index: number) => (
            <TaskCard
              item={item}
              index={index}
              handleChange={() => handleCheckboxChange(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
