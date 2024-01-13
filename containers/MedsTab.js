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

  const fetchData = async () => {
    try {
      const today = dayjs.utc();
      const formattedToday = dayjs(today).format("MM-DD-YYYY");
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
    fetchData();
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
