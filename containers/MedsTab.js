"use client";

import CalendarDate from "@/components/CalendarDate";
import Completed from "@/components/Completed";
import MedicineTable from "@/components/MedicineTable";
import Link from "next/link";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { IoHomeSharp } from "react-icons/io5";

const MedsTab = ({ person }) => {
  const [completed, setCompleted] = useState(false);

  const today = dayjs.utc();
  const yesterday = today.subtract(1, "day");
  const formattedToday = dayjs(today).format("MM-DD-YYYY");
  const formattedYesterday = dayjs(yesterday).format("MM-DD-YYYY");

  const updateStreak = async () => {
    try {
      let dataToUpdate;

      // GETTING Streak Data from the servers
      const data = await fetch("/api/streak");
      const rawData = await data.json();

      rawData.map((item) => {
        // Checking if the today's medicines are completed
        if (completed) {
          // Checking for the person
          if (item.person == person.toLowerCase()) {
            console.log("item");
            console.log(item);
            console.log("item.currentStreak.endDate");
            console.log(dayjs(item.currentStreak.endDate));
            console.log(dayjs(item.currentStreak.endDate) === dayjs(formattedYesterday));
            console.log("formattedYesterday");
            console.log(dayjs(formattedYesterday));
            // Checking if the person has a streak
            if (dayjs(item.currentStreak.endDate) === dayjs(formattedYesterday)) {
              // Updating the Streak Data
              dataToUpdate = {
                person: person.toLowerCase(),
                startDate: item.currentStreak.startDate,
                endDate: formattedToday,
              };
            } else {
              // Updating the Streak Data with new streak
              dataToUpdate = {
                person: person.toLowerCase(),
                startDate: formattedToday,
                endDate: formattedToday,
              };
            }
          }
        }
      });

      console.log("dataToUpdate");
      console.log(dataToUpdate);

      // PATCHING Streak Data to the servers
      const response = await fetch("/api/streak/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToUpdate),
      });

      if (response.ok) {
        console.log("Streak updated successfully");
      } else {
        console.error("Failed to update streak");
      }
    } catch (err) {
      console.error("Error updating data:", err);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("/api/medicines");
      const rawData = await response.json();
      rawData.map((item) => {
        if (dayjs(item.date).format("MM-DD-YYYY") == formattedToday) {
          item.data.map((item) => {
            if (item.person == person.toLowerCase()) {
              setCompleted(item.completed);
            }
          });
        }
      });
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    if (completed) updateStreak();
  }, [completed]);

  useEffect(() => {
    fetchData();
    // fetchStreak();
  }, []);

  const color = () => {
    switch (person) {
      case "Papa":
        return "rgb(234 179 8)";
      case "Mamma":
        return "rgb(6 182 212)";
      case "Mummy":
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
        <Link href="/">
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
          }}
        >
          {person}
        </h1>
      </section>

      {completed && (
        <section>
          <Completed />
        </section>
      )}

      <section>
        <CalendarDate />
      </section>

      <section>
        <MedicineTable person={person} completed={completed} setCompleted={setCompleted} />
      </section>
    </>
  );
};

export default MedsTab;
