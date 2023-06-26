"use client";

import { BiCalendar } from "react-icons/bi";

interface Props {
  date: string;
  onSelectDate: any;
}

const DateInput = ({ date, onSelectDate }: Props) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex gap-2 text-lg text-primary-500 items-center">
        <BiCalendar />
        <span>Data</span>
        <input
          type="date"
          className=" cursor-pointer absolute inset-0 opacity-0"
          onChange={(e) => onSelectDate(e.target.value)}
        />
      </div>
      <span className="font-semibold text-lg text-gray-300">
        {date || "Hoje"}
      </span>
    </div>
  );
};

export default DateInput;
