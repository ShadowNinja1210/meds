"use client";

import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import dayjs from "dayjs";
import { useMemo, useState } from "react";

const Calendar = ({ data }) => {
  const today = dayjs();
  const [month, setMonth] = useState(today.month());
  const monthName = today.month(month).format("MMMM");
  const year = today.year();
  //   const dayOfTheWeek = today.month(month).date(1).day();
  const weekNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const numOfDays = today.month(month).daysInMonth();
  const firstDayOfMonth = today.month(month).date(1).day();

  const days = Array.from({ length: numOfDays }, (_, index) => index + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth - 1 }, (_, index) => null);
  const daysWithEmpty = [...emptyDays, ...days];
  const rows = Array.from({ length: Math.ceil(daysWithEmpty.length / 7) }, (_, rowIndex) =>
    daysWithEmpty.slice(rowIndex * 7, (rowIndex + 1) * 7)
  );

  const nextMonth = () => {
    setMonth(month + 1);
  };

  const prevMonth = () => {
    setMonth(month - 1);
  };

  const dataDates = data.data.map((days) => {
    const [day, month, year] = days.date.split("-");
    return dayjs(`${year}-${month}-${day}`).format("MMDDYYYY");
  });

  const color = (day) => {
    if (dayjs().month(month).date(day).format("MMDDYYYY") === dayjs(today).format("MMDDYYYY")) {
      return "blue";
    } else if (dataDates.includes(dayjs().month(month).date(day).month(month).format("MMDDYYYY"))) {
      return "green";
    }
  };

  return (
    <main
      className="flex flex-col items-center justify-center gap-4 p-2 bg-gray-900 rounded-md"
      style={{ width: "350px", minHeight: "360px" }}
    >
      <section className="flex justify-between items-center w-full bg-slate-700 p-1 rounded-md">
        <button
          disabled={month === 0}
          className="text-xl p-2 rounded-full  active:bg-slate-500 hover:bg-slate-600 disabled:opacity-40 disabled:hover:bg-slate-700 disabled:active:bg-slate-700"
          onClick={prevMonth}
        >
          <IoArrowBack />
        </button>

        <h1 className=" font-bold text-lg">
          {monthName}, {year}
        </h1>

        <button
          disabled={month === 11}
          className=" text-xl p-2 rounded-full active:bg-slate-500 hover:bg-slate-600 disabled:hover:bg-slate-700 disabled:opacity-40 disabled:active:bg-slate-700"
          onClick={nextMonth}
        >
          <IoArrowForward />
        </button>
      </section>

      <section className="flex flex-col gap-5">
        {/* Weeks */}
        <div className="flex gap-3 font-bold">
          {weekNames.map((weekName, index) => {
            return (
              <p key={index} style={{ width: "35px" }}>
                {weekName}
              </p>
            );
          })}
        </div>

        {/* Days */}
        <div>
          <div className="flex flex-col gap-4">
            {rows.map((row, rowIndex) => {
              return (
                <div key={rowIndex} className="flex gap-3">
                  {row.map((dates, columnIndex) => {
                    return (
                      <p
                        key={columnIndex}
                        style={{
                          width: "35px",
                          height: "35px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          background: color(dates),
                          borderRadius: "100%",
                        }}
                      >
                        {dates}
                      </p>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Calendar;
