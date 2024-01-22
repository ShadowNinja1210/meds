"use client";

import { BsCircleHalf, BsCircleFill } from "react-icons/bs";
import dayjs from "dayjs";
import { useState, useEffect, useRef } from "react";
import { useLoading } from "@/utils/LoadingContext";

const MedicineRow = ({ medicines, person, meds, setCompleted }) => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const dialogRef = useRef(null);
  const newPerson = person.toLowerCase();

  const areAllMedsTaken = (updatedMedicines) => {
    return updatedMedicines.every((medicine) => medicine.taken);
  };

  const handleTakeMedicine = async (medicine) => {
    try {
      toggleDialog();
      if (!isLoading) {
        startLoading();
      }
      const updatedMeds = [];

      for (let i = 0; i < meds.length; i++) {
        if (meds[i]._id === medicine._id) {
          updatedMeds.push({ ...meds[i], taken: !meds[i].taken });
        } else {
          updatedMeds.push(meds[i]);
        }
      }

      const dataToUpdate = {
        person: newPerson,
        completed: areAllMedsTaken(updatedMeds),
        medicineId: medicine._id,
        taken: !medicine.taken,
      };
      const response = await fetch("/api/medicines/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToUpdate),
      });

      if (response.ok) {
        console.log("Medicine updated successfully");
        setCompleted(dataToUpdate.completed);
      } else {
        console.error("Failed to update medicine");
      }
    } catch (error) {
      console.error("Error updating medicine:", error);
    } finally {
      stopLoading();
    }
  };

  const toggleDialog = () => {
    if (!dialogRef.current) {
      return;
    }
    dialogRef.current.hasAttribute("open") ? dialogRef.current.close() : dialogRef.current.showModal();
  };

  return medicines.map((medicine, index) => (
    <span key={index} className={`flex gap-4 ${medicine.postMeal ? "bg-slate-700" : "bg-slate-500"}`}>
      <span
        className={`${medicine.taken ? "line-through" : "opacity-100"} py-2 px-4 w-36 flex justify-start items-center`}
      >
        {medicine.name}
      </span>
      <span
        className={`${medicine.taken ? "opacity-60" : "opacity-100"} py-2 px-4 w-24 flex justify-center items-center`}
      >
        {medicine.amount == 1 ? <BsCircleFill className="text-white" /> : <BsCircleHalf className="text-white" />}
      </span>
      <span className={` py-2 px-4 w-24 flex justify-start items-center`}>
        {!medicine.taken ? (
          <button
            onClick={() => handleTakeMedicine(medicine)}
            className="bg-gray-800 text-white px-2 py-1 rounded w-14"
          >
            Take
          </button>
        ) : (
          <button onClick={() => toggleDialog()} className="bg-green-500 font-black text-white px-2 py-1 rounded w-14">
            &#10003;
          </button>
        )}

        <dialog className="p-4 rounded-lg" ref={dialogRef}>
          <div className="flex flex-col items-center justify-center gap-2 text-center font-semibold">
            <p className=" text-sm">Are you sure?</p>
            <div className="flex gap-4">
              <button
                onClick={() => handleTakeMedicine(medicine)}
                className="bg-green-500 font-bold text-white text-xs px-1 py-1 rounded w-14"
              >
                Yes
              </button>
              <button
                className=" bg-red-500 font-bold text-xs text-white px-1 py-1 rounded w-14"
                onClick={() => toggleDialog()}
              >
                No
              </button>
            </div>
          </div>
        </dialog>
      </span>
    </span>
  ));
};

const MedicineTable = ({ person, setCompleted }) => {
  //--------------------------------------------------------//
  //--------------------------------------------------------//
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [meds, setMeds] = useState([]);

  async function fetchData(person) {
    try {
      if (!isLoading) {
        startLoading();
      }
      const today = dayjs.utc();
      const formattedToday = dayjs(today).format("MM-DD-YYYY");
      const response = await fetch("/api/medicines");
      const rawData = await response.json();
      rawData.map((item) => {
        if (dayjs(item.date).format("MM-DD-YYYY") == formattedToday) {
          item.data.map((item) => {
            if (item.person == person.toLowerCase()) {
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
    stopLoading();
  }, [isLoading]);

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
              <MedicineRow medicines={morning} meds={meds} time="Morning" person={person} setCompleted={setCompleted} />
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
                medicines={afternoon}
                meds={meds}
                time="Afternoon"
                person={person}
                setCompleted={setCompleted}
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
              <MedicineRow medicines={night} meds={meds} time="Night" person={person} setCompleted={setCompleted} />
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default MedicineTable;
