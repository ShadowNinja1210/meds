"use client";

import MedsTab from "@/containers/MedsTab";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export default function Mummy() {
  const [meds, setMeds] = useState([]);

  async function fetchData(person) {
    try {
      const today = dayjs.utc();
      const formattedToday = dayjs(today).format("MM-DD-YYYY");
      const response = await fetch("/api/medicines");
      const rawData = await response.json();
      rawData.map((item) => {
        if (dayjs(item.date).format("MM-DD-YYYY") == formattedToday) {
          console.log(item);
          item.data.map((item) => {
            if (item.person == person) {
              setMeds(item.medicines);
            }
          });
        }
      });
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }

  useEffect(() => {
    fetchData("mummy");
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center py-16">
      <MedsTab meds={meds} person="MUMMY" />
    </main>
  );
}
