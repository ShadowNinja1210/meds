import connectDB from "@/utils/db";
import Streak from "@/models/Streak";

export const PATCH = async (req) => {
  await connectDB();
  try {
    const { person, endDate, startDate } = await req.json();
    console.log(person, endDate, startDate);

    const streaks = await Streak.find();
    if (!streaks) {
      return new Response("Not found", { status: 404 });
    } else {
      streaks.map(async (item) => {
        if (item.person === person) {
          item.currentStreak.startDate = startDate;
          item.currentStreak.endDate = endDate;
        }
        await item.save();
      });
      return new Response("PATCH Success", { status: 200 });
    }
  } catch (error) {
    return new Response("GET Failed", { status: 500 });
  }
};
