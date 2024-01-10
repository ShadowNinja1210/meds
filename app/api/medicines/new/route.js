// pages/api/medicines.js
import connectDB from "../../../../utils/db";
import Medicine from "../../../../models/Medicine";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const GET = async (req, res) => {
  await connectDB();
  try {
    const today = dayjs.utc(); // Today's Date
    console.log(today);
    const formattedToday = dayjs(today).format("MM-DD-YYYY").toString();
    console.log(formattedToday, typeof formattedToday);
    const medicines = await Medicine.findOne({ date: formattedToday }); // Getting data from DB
    console.log(medicines);

    const newData = {
      date: formattedToday,
      data: [
        {
          person: "papa",
          completed: false,
          medicines: [
            { name: "Sorba-30 SR", amount: 1, time: "Morning", taken: false, postMeal: false },
            { name: "Telesky MCT 50/12.5", amount: 1, time: "Morning", taken: false, postMeal: true },
            { name: "Glidax", amount: 1, time: "Afternoon", taken: false, postMeal: false },
            { name: "Clopidax A-150", amount: 1, time: "Afternoon", taken: false, postMeal: true },
            { name: "Glidax", amount: 1, time: "Night", taken: false, postMeal: false },
            { name: "Atorvastatin", amount: 1, time: "Night", taken: false, postMeal: true },
          ],
        },
        {
          person: "mummy",
          completed: false,
          medicines: [
            { name: "Esitamat", amount: 0.5, time: "Afternoon", taken: false, postMeal: true },
            { name: "Feferex-XT", amount: 1, time: "Afternoon", taken: false, postMeal: true },
            { name: "Esitamat", amount: 1, time: "Night", taken: false, postMeal: true },
            { name: "Zolmat", amount: 1, time: "Night", taken: false, postMeal: true },
            { name: "Ameride", amount: 0.5, time: "Night", taken: false, postMeal: true },
          ],
        },
        {
          person: "mamma",
          completed: false,
          medicines: [
            { name: "Pentorane", amount: 1, time: "Morning", taken: false, postMeal: false },
            { name: "Metopole 25XL", amount: 1, time: "Morning", taken: false, postMeal: true },
            { name: "Dericip Retard", amount: 1, time: "Morning", taken: false, postMeal: true },
            { name: "Glidax", amount: 1, time: "Afternoon", taken: false, postMeal: false },
            { name: "Feferex-XT", amount: 1, time: "Afternoon", taken: false, postMeal: true },
          ],
        },
      ],
    };

    if (!medicines) {
      console.log(newData);
      await Medicine.create(newData);
      return new Response("New Medicine added Successfully", { status: 200 });
    } else {
      return new Response("Already Exists", { status: 500 });
    }
  } catch (error) {
    return new Response("POST Failed", { status: 500 });
  }
};
