import connectDB from "@/utils/db";
import Streak from "@/models/Streak";
import dayjs from "dayjs";

export const GET = async () => {
  await connectDB();
  try {
    const streaks = await Streak.find();
    let data;
    const streakHistoryNum = [];
    data = {};

    streaks.map((item) => {
      item.streakHistory.map((history) => {
        const diff = dayjs(history.endDate).diff(dayjs(history.startDate), "day");
        const hisData = {
          person: item.person,
          startDate: history.startDate,
          endDate: history.endDate,
          streakNum: diff + 1,
        };
        streakHistoryNum.push(hisData);
      });
      data = {
        streakHistory: streakHistoryNum,
      };
    });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response("GET Failed", { status: 500 });
  }
};
