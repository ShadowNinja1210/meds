import connectDB from "@/utils/db";
import Medicine from "@/models/Medicine";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const POST = async () => {
  await connectDB();
  try {
    const today = dayjs.utc();
    const formattedToday = dayjs(today).format("MM-DD-YYYY").toString();
    const medicines = await Medicine.findOne({ date: formattedToday }); // Getting data from DB

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
            { name: "Becosules", amount: 1, time: "Afternoon", taken: false, postMeal: true },
            { name: "Esitamat", amount: 1, time: "Night", taken: false, postMeal: true },
            { name: "Zolmat", amount: 1, time: "Night", taken: false, postMeal: true },
            { name: "Amipride", amount: 0.5, time: "Night", taken: false, postMeal: true },
          ],
        },
        {
          person: "mamma",
          completed: false,
          medicines: [
            { name: "Pentorane", amount: 1, time: "Morning", taken: false, postMeal: false },
            { name: "Renodax", amount: 1, time: "Morning", taken: false, postMeal: true },
            { name: "Febukas 40", amount: 1, time: "Morning", taken: false, postMeal: true },
            { name: "Glidax", amount: 1, time: "Afternoon", taken: false, postMeal: false },
            { name: "Hymet-XL 25", amount: 1, time: "Afternoon", taken: false, postMeal: true },
            { name: "Dericip Retard", amount: 1, time: "Afternoon", taken: false, postMeal: true },
            // { name: "Feferex-XT", amount: 1, time: "Afternoon", taken: false, postMeal: true },
          ],
        },
      ],
    };

    if (!medicines) {
      await Medicine.create(newData);
      return new Response("New Medicine added Successfully", { status: 200 });
    } else {
      return new Response("Already Exists", { status: 418 });
    }
  } catch (error) {
    return new Response("POST Failed", { status: 500 });
  }
};
