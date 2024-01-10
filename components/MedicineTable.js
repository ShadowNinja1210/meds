"use client";

import { BsCircleHalf, BsCircleFill } from "react-icons/bs";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import Loader from "./Loader";

const MedicineRow = ({ medicine, person, setLoading, completed }) => {
  const newPerson = person.toLowerCase();
  const handleTakeMedicine = async (medicine) => {
    try {
      const dataToUpdate = {
        person: newPerson,
        completed: completed,
        medicineId: medicine._id,
        taken: !medicine.taken,
      };
      setLoading(true);
      const response = await fetch("/api/medicines/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToUpdate),
      });

      if (response.ok) {
        console.log("Medicine updated successfully");
      } else {
        console.error("Failed to update medicine");
      }
    } catch (error) {
      console.error("Error updating medicine:", error);
    } finally {
      setLoading(false);
    }
  };

  const Tick = () => <span className=" font-black">&#10003;</span>;

  return medicine.map((medicine, index) => (
    <span
      key={index}
      className={`flex gap-4 ${medicine.taken ? "opacity-70" : "opacity-100"} ${
        medicine.postMeal ? "bg-slate-700" : "bg-slate-500"
      }`}
    >
      <span className="py-2 px-4 w-36 flex justify-start items-center">{medicine.name}</span>
      <span className="py-2 px-4 w-24 flex justify-center items-center">
        {medicine.amount == 1 ? <BsCircleFill className="text-white" /> : <BsCircleHalf className="text-white" />}
      </span>
      <span className="py-2 px-4 w-24 flex justify-start items-center">
        <button
          onClick={() => handleTakeMedicine(medicine)}
          className={`${medicine.taken ? "bg-green-500" : "bg-gray-800"} text-white px-2 py-1 rounded w-14`}
        >
          {!medicine.taken ? "Take" : <Tick />}
        </button>
      </span>
    </span>
  ));
};

const MedicineTable = ({ person }) => {
  //--------------------------------------------------------//
  //--------------------------------------------------------//
  const [meds, setMeds] = useState([]);
  const [completed, setCompleted] = useState(true);
  const [loading, setLoading] = useState(false);
  const [personId, setPersonId] = useState("");

  const CompletedUpdate = () => {
    console.log("Checking completion");
    meds.map((item) => {
      if (item.taken === false) {
        setCompleted(false);
      } else {
        setCompleted(true);
      }
    });
  };

  async function fetchData(person) {
    try {
      const today = dayjs.utc();
      const formattedToday = dayjs(today).format("MM-DD-YYYY");
      const response = await fetch("/api/medicines");
      const rawData = await response.json();
      rawData.map((item) => {
        if (dayjs(item.date).format("MM-DD-YYYY") == formattedToday) {
          item.data.map((item) => {
            if (item.person == person.toLowerCase()) {
              setPersonId(item._id);
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
    fetchData(person.toLowerCase());
    CompletedUpdate();
  }, [loading]);

  //--------------------------------------------------------//
  //--------------------------------------------------------//

  const morning = meds.filter((medicine) => medicine.time === "Morning");
  const afternoon = meds.filter((medicine) => medicine.time === "Afternoon");
  const night = meds.filter((medicine) => medicine.time === "Night");

  return (
    <main className="flex flex-col gap-3 p-4 min-w-full bg-gray-900 rounded-lg">
      <section className="flex gap-4 bg-slate-700 rounded-lg font-bold">
        <span className="py-2 px-4 w-32 flex justify-start items-center">Name</span>
        <span className="py-2 px-4 w-24 flex justify-start items-center">Amount</span>
        <span className="py-2 px-4 w-24 flex justify-start items-center">Actions</span>
      </section>

      <section className="flex flex-col gap-4">
        {/* Morning */}
        <div className="">
          {morning.length > 0 && (
            <>
              <picture>
                <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f305/512.webp" type="image/webp" />
                <img
                  src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f305/512.gif"
                  alt="🌅"
                  width="50"
                  height="50"
                  className="mb-2"
                />
              </picture>
              <MedicineRow
                medicine={morning}
                time="Morning"
                person={person}
                loading={loading}
                setLoading={setLoading}
                completed={completed}
                personId={personId}
              />
            </>
          )}
        </div>

        {/* Afternoon */}
        <div className="">
          {afternoon.length > 0 && (
            <>
              <picture>
                <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f60e/512.webp" type="image/webp" />
                <img
                  src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f60e/512.gif"
                  alt="😎"
                  width="50"
                  height="50"
                  className="mb-2"
                />
              </picture>
              <MedicineRow
                medicine={afternoon}
                time="Afternoon"
                person={person}
                loading={loading}
                setLoading={setLoading}
                completed={completed}
                personId={personId}
              />
            </>
          )}
        </div>

        {/* Night */}
        <div className="flex flex-col">
          {night.length > 0 && (
            <>
              <picture>
                <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f31c/512.webp" type="image/webp" />
                <img
                  src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f31c/512.gif"
                  alt="🌜"
                  width="50"
                  height="50"
                  className="mb-2"
                />
              </picture>
              <MedicineRow
                medicine={night}
                time="Night"
                person={person}
                loading={loading}
                setLoading={setLoading}
                completed={completed}
                personId={personId}
              />
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default MedicineTable;
