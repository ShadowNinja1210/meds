"use client";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

export default function New() {
  const [person, setPerson] = useState("");
  const [amount, setAmount] = useState(1.0);

  let schema = yup.object().shape({
    person: yup.string().required(),
    name: yup.string().required(),
    amount: yup.number().min(0.5).required(),
    time: yup.string().required(),
    taken: yup.boolean().required(),
    postMeal: yup.boolean().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      taken: false,
      postMeal: false,
    },
  });

  return (
    <main className="flex flex-col p-14 justify-center items-center gap-16 max-h-screen">
      {/* Heading */}
      <div className="flex flex-col items-center justify-center gap-8">
        <h1 className=" text-3xl font-bold">NEW Medicine</h1>
        <picture>
          <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f92f/512.webp" type="image/webp" />
          <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f92f/512.gif" alt="🤯" width="70" height="70" />
        </picture>
      </div>

      <form
        action="/api/medicines"
        method="post"
        className=" bg-zinc-700 p-4 rounded-lg flex flex-col gap-5"
        onSubmit={handleSubmit((data) => console.log(data))}
      >
        {/* Person (Papa // Mamma // Mummy) */}
        <select
          type="text"
          {...register("person")}
          className={` rounded-lg p-3 text-lg font-semibold ${
            person === "Papa"
              ? "bg-yellow-500 text-white"
              : person === "Mamma"
              ? "bg-cyan-500 text-white"
              : person === "Mummy"
              ? "bg-red-500 text-white"
              : "text-black"
          } `}
          onChange={(e) => setPerson(e.target.value)}
        >
          <option value="" className=" bg-white text-black">
            Select
          </option>
          <option value="Papa" className="bg-yellow-500 text-white">
            Papa
          </option>
          <option value="Mamma" className="bg-cyan-500 text-white">
            Mamma
          </option>
          <option value="Mummy" className="bg-red-500 text-white">
            Mummy
          </option>
        </select>

        {/* Medicine Name */}
        <div className="flex flex-col">
          <label htmlFor="medicine" className=" p-1 text-sm">
            Medicine Name
          </label>
          <input
            placeholder="Enter the medicine name"
            type="text"
            {...register("name")}
            id="medicine"
            className="text-black rounded-lg p-2 px-3 font-medium"
          />
        </div>

        {/* Amount */}
        <div className="flex flex-col">
          <label htmlFor="amount" className="text-sm p-1">
            Amount
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              className="bg-zinc-300 w-8 rounded-xl text-black font-bold text-xl"
              onClick={() => setAmount((prev) => parseFloat(prev) - 0.5)}
            >
              -
            </button>
            <input
              type="number"
              {...register("amount")}
              id="amount"
              defaultValue={amount}
              className="text-black rounded-lg px-3 p-2 font-medium w-12 text-center"
            />
            <button
              type="button"
              className="bg-zinc-300 w-8 rounded-xl text-black font-bold text-xl"
              onClick={() => setAmount((prev) => parseFloat(prev) + 0.5)}
            >
              +
            </button>
          </div>
        </div>

        {/* Time */}
        <div className="flex flex-col">
          <label htmlFor="time" className=" p-1 text-sm">
            Time
          </label>
          <select type="time" {...register("time")} id="time" className="text-black rounded-lg p-2 font-medium">
            <option value="">Select</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Night">Night</option>
          </select>
        </div>

        {/* Taken // Post Meal */}
        <section className="flex gap-4 justify-between px-2">
          {/* Taken */}
          <div className=" flex gap-2">
            <label htmlFor="taken">Taken</label>
            <input type="checkbox" disabled {...register("taken")} id="taken" />
          </div>
          {/* Post Meal */}
          <div className=" flex gap-2">
            <label htmlFor="postMeal">Post Meal</label>
            <input type="checkbox" {...register("postMeal")} id="postMeal" />
          </div>
        </section>
        {Object.keys(errors).length > 0 ? (
          <button type="button" disabled className="p-3 bg-neutral-500 text-neutral-300 rounded-xl font-bold">
            Submit
          </button>
        ) : (
          <button type="submit" className="p-3 bg-green-600 rounded-xl font-bold">
            Submit
          </button>
        )}
      </form>
    </main>
  );
}
