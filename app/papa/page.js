"use client";

import Link from "next/link";
import { IoHomeSharp } from "react-icons/io5";
import MedicineTable from "@/components/MedicineTable";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import MedsTab from "@/containers/MedsTab";

dayjs.extend(utc);

export default function Papa() {
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
    fetchData("papa");
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center py-16">
      <MedsTab meds={meds} person="PAPA" />
    </main>
  );
}
