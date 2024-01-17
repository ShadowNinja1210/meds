"use client";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const DashboardTab = ({ person }) => {
  const [data, setData] = useState({ person: "", data: [], highest: 0 });

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

      const formatData = (data) => {
        return data.map((item) => ({ date: dayjs(item.date).format("DD-MM-YYYY") }));
      };

      const filteredCompleted = formatData(completedDataResult.filter((item) => item.person === person));
      const filteredStreak = streakHis.filter((item) => item.person === person);

      setData({ person: person, data: filteredCompleted, highest: filteredStreak[0].streakNum });
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>{data.person}</h2>
      <h3>{data.highest}</h3>
      {data.data.map((item, index) => {
        return <p key={index}>{item.date}</p>;
      })}
    </div>
  );
};

export default DashboardTab;
