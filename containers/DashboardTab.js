"use client";
import { useEffect, useState } from "react";
import { IoHomeSharp } from "react-icons/io5";
import { Orbitron } from "next/font/google";
import Link from "next/link";
import dayjs from "dayjs";
import Calendar from "@/components/Calendar";
import Money from "@/components/Money";

const orbitron = Orbitron({ subsets: ["latin"] });

const DashboardTab = ({ person }) => {
  const [data, setData] = useState({ person: "", data: [], highest: 0, streak: 0 });

  const completedData = async () => {
    const res = await fetch("/api/medicines");
    const data = await res.json();
    const dataArr = [];
    data.forEach((item) => {
      item.data.forEach((persons) => {
        if (persons.completed) {
          dataArr.push({ date: item.date, person: persons.person });
        }
      });
    });
    return dataArr;
  };

  const fetchStreak = async () => {
    const res = await fetch("/api/streak");
    const data = await res.json();
    return data;
  };

  const fetchStreakHis = async () => {
    const res = await fetch("/api/streak/history");
    const data = await res.json();
    const highestStreaks = {};

    // Iterate through the streakHistory
    data.streakHistory.forEach((entry) => {
      const { person, streakNum, startDate, endDate } = entry;

      // Check if the person is already in the highestStreaks object
      if (!(person in highestStreaks) || streakNum > highestStreaks[person].streakNum) {
        highestStreaks[person] = { person, streakNum, startDate, endDate };
      }
    });

    // Convert the object values to an array
    const result = Object.values(highestStreaks);

    return result;
  };

  useEffect(() => {
    const fetchData = async () => {
      const completedDataResult = await completedData();
      const streakHis = await fetchStreakHis();
      const streak = await fetchStreak();

      const formatData = (data) => {
        return data.map((item) => ({ date: dayjs(item.date).format("DD-MM-YYYY") }));
      };

      const filteredCompleted = formatData(completedDataResult.filter((item) => item.person === person));
      const filteredStreak = streakHis.filter((item) => item.person === person);
      const streakData = streak.filter((item) => item.person === person);

      const startDate = dayjs(streakData[0].currentStreak.startDate);
      const endDate = dayjs(streakData[0].currentStreak.endDate);

      const checkHighest = () => {
        if (filteredStreak[0].streakNum > endDate.diff(startDate, "day")) {
          return filteredStreak[0].streakNum;
        } else {
          return endDate.diff(startDate, "day");
        }
      };

      setData({
        person: person,
        data: filteredCompleted,
        highest: checkHighest(),
        streak: endDate.diff(startDate, "day"),
      });
    };

    fetchData();
  }, []);

  const color = () => {
    switch (person) {
      case "papa":
        return "rgb(234 179 8)";
      case "mamma":
        return "rgb(6 182 212)";
      case "mummy":
        return "rgb(239 68 68)";
      default:
        return "yellow";
    }
  };

  return (
    <>
      <section
        style={{
          fontSize: "2rem",
          lineHeight: "2rem",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "20rem",
          marginBottom: "0.5rem",
          color: color(),
        }}
      >
        <Link href="/dashboard">
          <button>
            <IoHomeSharp />
          </button>
        </Link>

        <h1
          style={{
            padding: "2px 6px",
            fontSize: "1.35rem",
            borderRadius: "6px",
            border: `solid 4px ${color()}`,
            color: color(),
            textTransform: "capitalize",
          }}
        >
          {person}
        </h1>
      </section>

      <Money data={data} />

      <section className=" rounded-md border-2  bg-gray-900 border-gray-600 py-2 px-4 uppercase flex gap-5 text-xl tracking-wider date-calendar font-semibold">
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm flex flex-col items-center text-gray-300">Current Streak</p>
          <p className={`${orbitron.className} text-4xl`}>{data.streak}</p>
        </div>
        <hr className=" my-1 border-t-0 border-r-2 h-auto border-gray-600 " />
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm flex flex-col items-center text-gray-300">Highest Streak</p>
          <p className={`${orbitron.className} text-4xl`}>{data.highest}</p>
        </div>
      </section>

      <Calendar data={data} />
    </>
  );
};

export default DashboardTab;
