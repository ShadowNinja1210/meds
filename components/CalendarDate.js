import dayjs from "dayjs";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({ subsets: ["latin"] });

const CalendarDate = () => {
  const today = dayjs();
  const date = today.get("date");
  const month = today.format("MMMM");
  const year = today.get("year");

  return (
    <div
      className={` rounded-md border-2 mt-3 mb-6 bg-gray-900 border-gray-600 py-1 px-4 uppercase flex gap-5 text-xl tracking-wider date-calendar font-semibold ${orbitron.className}`}
    >
      <p>{date}</p>
      <hr className=" my-1 border-t-0 border-r-2 h-auto border-gray-600 " />
      <p>{month}</p>
      <hr className=" my-1 border-t-0 border-r-2 h-auto border-gray-600 " />
      <p>{year}</p>
    </div>
  );
};

export default CalendarDate;
