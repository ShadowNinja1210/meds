import connectDB from "@/utils/db";
import Streak from "@/models/Streak";

export const GET = async () => {
  await connectDB();
  try {
    const streaks = await Streak.find();
    return new Response(JSON.stringify(streaks), { status: 200 });
  } catch (error) {
    return new Response("GET Failed", { status: 500 });
  }
};
