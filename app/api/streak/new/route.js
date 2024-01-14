import Streak from "@/models/Streak";
import connectDB from "@/utils/db";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const GET = async () => {
  await connectDB();
  try {
    const streaks = await Streak.find();

    const today = new dayjs.utc();
    const formattedToday = dayjs(today).format("MM-DD-YYYY").toString();

    const newData = [
      {
        person: "mamma",
        currentStreak: { startDate: formattedToday, endDate: formattedToday },
        streakHistory: [{ startDate: formattedToday, endDate: formattedToday }],
      },
      {
        person: "papa",
        currentStreak: { startDate: formattedToday, endDate: formattedToday },
        streakHistory: [{ startDate: formattedToday, endDate: formattedToday }],
      },
      {
        person: "mummy",
        currentStreak: { startDate: formattedToday, endDate: formattedToday },
        streakHistory: [{ startDate: formattedToday, endDate: formattedToday }],
      },
    ];

    if (streaks.length === 0) {
      await Streak.create(newData);
      return new Response("Created new streak data", { status: 200 });
    } else {
      return new Response("Already exists", { status: 403 });
    }
  } catch (error) {
    return new Response("GET Failed", { status: 500 });
  }
};
