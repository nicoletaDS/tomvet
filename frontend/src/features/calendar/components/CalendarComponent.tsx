import { default as dayjs } from "dayjs";
import { useEffect, useState } from "react";

import ScrollMenu from "react-horizontal-scroll-menu";

type Select = string | number | null;

const CalendarComponent = ({ selected, setSelected }: any) => {
  const [daysOfweek, setDaysOfWeek] = useState<dayjs.Dayjs[]>([]);

  const [customFormat, setCustomFormat] = useState<string>("ddd");
  const currentDay = dayjs().format("D");

  const getCurrentWeekDays = () => {
    const weekStart = dayjs().startOf("week");

    const days = [];
    for (let i = 0; i <= 31; i++) {
      days.push(dayjs(weekStart).add(i, "days"));
    }
    return days;
  };

  useEffect(() => {
    setDaysOfWeek(getCurrentWeekDays());
  }, []);

  const MenuItem = ({ title, text, selected, key }: any) => {
    return (
      <div
        className={`border h-[70px] w-[60px] m-3 rounded-xl flex flex-col justify-center items-center ${
          selected ? "bg-white border-2" : ""
        } ${currentDay === text ? "bg-yellow" : null}`}
        key={key}
      >
        <h5 className="title">{title}</h5>
        <span className="text"> {text}</span>
      </div>
    );
  };

  const Menu = (selected: any) =>
    daysOfweek.map((day: any) => {
      return (
        <MenuItem
          title={day.format(customFormat)}
          text={day.format("D")}
          key={day.format("D")}
          selected={selected}
        />
      );
    });

  const Arrow = ({ text, className }: any) => {
    return (
      <div className="mx-4 hover:cursor-pointer">
        <div className={className}>{text}</div>
      </div>
    );
  };

  const ArrowLeft = Arrow({ text: "<" });
  const ArrowRight = Arrow({ text: ">" });

  const onSelect = (key: Select) => {
    if (key === selected) {
      setSelected(0);
    } else {
      setSelected(key);
    }
  };

  const menu = Menu(selected);

  return (
    <>
      <ScrollMenu
        data={menu}
        arrowLeft={ArrowLeft}
        arrowRight={ArrowRight}
        selected={selected as string}
        onSelect={onSelect}
        scrollToSelected={true}
      />
    </>
  );
};

export default CalendarComponent;
