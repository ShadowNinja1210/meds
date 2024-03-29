"use client";

import Link from "next/link";
import { FaChartBar } from "react-icons/fa";
import { LoadingProvider } from "@/utils/LoadingContext";
import { useEffect } from "react";
import dayjs from "dayjs";

export default function Home() {
  const today = new dayjs();

  const createNewMedicine = async () => {
    const medicineRes = await fetch("/api/medicines");
    const medicine = await medicineRes.json();
    const isMedicine = await medicine.filter((item) => {
      return dayjs(item.date).isSame(today, "day");
    });
    console.log(isMedicine.length);

    if (!isMedicine.length) {
      const response = await fetch("/api/medicines/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        console.log("Medicine created successfully");
      } else {
        console.error("Failed to create medicine", response);
      }
    }
  };

  useEffect(() => {
    createNewMedicine();
  }, []);

  return (
    <LoadingProvider>
      <main className="flex min-h-screen flex-col items-center gap-24 py-20">
        <section className="flex flex-col gap-10 items-center">
          <h1 className=" text-4xl font-bold ">
            <span className=" text-yellow-500">Med</span>
            <span className=" text-cyan-500">ici</span>
            <span className=" text-red-500">nes</span>
          </h1>
          <picture>
            <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f9d0/512.webp" type="image/webp" />
            <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f9d0/512.gif" alt="🧐" width="70" height="70" />
          </picture>
        </section>
        <section className="flex flex-col items-center gap-20 font-bold">
          <Link href="/papa">
            <button className="px-4 py-2 text-lg rounded-lg border-4 text-yellow-400 border-yellow-500">Papa</button>
          </Link>
          <Link href="/mamma">
            <button className="px-4 py-2 text-lg rounded-lg border-4 text-cyan-400 border-cyan-500">Mamma</button>
          </Link>
          <Link href="/mummy">
            <button className="px-4 py-2 text-lg rounded-lg border-4 text-red-400 border-red-500">Mummy</button>
          </Link>
        </section>
        <Link href="/dashboard" className="text-6xl">
          <FaChartBar className=" text-gray-200 p-1" />
        </Link>
      </main>
    </LoadingProvider>
  );
}
