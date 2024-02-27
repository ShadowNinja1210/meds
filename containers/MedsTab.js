"use client";

import CalendarDate from "@/components/CalendarDate";
import Completed from "@/components/Completed";
import MedicineTable from "@/components/MedicineTable";
import Link from "next/link";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { IoHomeSharp } from "react-icons/io5";
import { useLoading } from "@/utils/LoadingContext";
import Loader from "@/components/Loader";

const MedsTab = ({ person }) => {
  const [completed, setCompleted] = useState(false);
  const [streak, setStreak] = useState(0);
  const { isLoading, startLoading, stopLoading } = useLoading();

  const today = dayjs.utc();
  const yesterday = today.subtract(1, "day");
  const formattedToday = dayjs(today).format("MM-DD-YYYY");

  const updateStreak = async () => {
    try {
      let dataToUpdate;

      // GETTING Streak Data from the servers
      const data = await fetch("/api/streak");
      const rawData = await data.json();
      if (!isLoading) {
        startLoading();
      }

      rawData.map((item) => {
        // Checking if the today's medicines are completed
        if (completed) {
          // Checking for the person
          if (item.person == person.toLowerCase()) {
            const endDate = dayjs(item.currentStreak.endDate);

            // Checking if the person has a streak
            if (endDate.isSame(dayjs(yesterday), "day")) {
              // If end date is same as yesterday's date for checking the person has streak or not
              // Updating the Streak Data
              dataToUpdate = {
                person: person.toLowerCase(),
                startDate: item.currentStreak.startDate,
                endDate: formattedToday,
                streakHistory: item.streakHistory,
              };
            } else if (!endDate.isSame(dayjs(formattedToday), "day")) {
              // -------
              const startDate = dayjs(item.currentStreak.startDate);
              let canPush;

              if (!item.streakHistory.length || !item.streakHistory) {
                // If history is empty
                item.streakHistory = [];
                item.streakHistory.push({ startDate: startDate, endDate: endDate });
              } else {
                // If history is not empty
                canPush = item.streakHistory.every((item) => item.startDate !== startDate || item.endDate !== endDate);
                if (canPush) {
                  item.streakHistory.push({ startDate: startDate, endDate: endDate });
                } else {
                  console.log("Streak history already updated");
                }
              }

              // -------
              //If end date is not same as today's date, then the streak is broken and we need to update Start Date and End Date to today's date
              // Updating the Streak Data with new streak
              dataToUpdate = {
                person: person.toLowerCase(),
                startDate: formattedToday,
                endDate: formattedToday,
                streakHistory: item.streakHistory,
              };
            } else {
              // If end date is same as today's date, then the streak is already updated
              console.log("Streak already updated");
              return Promise.resolve();
            }
          }
        }
      });

      if (!dataToUpdate) {
        console.log("No data to update");
        return Promise.resolve();
      }

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
      if (!isLoading) {
        startLoading();
      }
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
    } finally {
      stopLoading();
    }
  };

  const fetchStreak = async () => {
    try {
      if (!isLoading) {
        startLoading();
      }
      const data = await fetch("/api/streak");
      const rawData = await data.json();

      rawData.map((item) => {
        if (item.person == person.toLowerCase()) {
          // Checking the streak by comparing the end date and start date
          const streakNum = dayjs(item.currentStreak.endDate).diff(dayjs(item.currentStreak.startDate), "day") + 1;
          console.log;
          // Setting the streak to the state
          setStreak(streakNum); // Setting the streak to the state
        }
      });
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    if (completed)
      updateStreak().then(() => {
        fetchStreak();
        stopLoading();
      });
    fetchStreak();
    stopLoading();
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
      {isLoading ? (
        <Loader />
      ) : (
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

          {/* Congratulations Tab */}
          {completed && (
            <section className="flex flex-col justify-center items-center">
              <Completed />
              {streak > 0 && (
                <div className="px-2 py-1">
                  <span style={{ color: color() }} className="text-3xl">
                    &#9734;
                  </span>

                  <span
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "500",
                      lineHeight: "1.5rem",
                      paddingLeft: "4px",
                      paddingRight: "8px",
                      color: color(),
                    }}
                  >
                    Streak:
                  </span>

                  <span style={{ lineHeight: "1.9rem", fontSize: "1.4rem", fontWeight: "500" }}>{streak}</span>
                </div>
              )}
            </section>
          )}

          <section>
            <CalendarDate />
          </section>

          <section>
            <MedicineTable person={person} completed={completed} setCompleted={setCompleted} />
          </section>
        </>
      )}
    </>
  );
};

export default MedsTab;
