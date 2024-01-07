// pages/api/medicines.js
import connectDB from "../../../utils/db";
import Medicine from "../../../models/Medicine";
import dayjs from "dayjs";

export const GET = async (req, res) => {
  await connectDB();
  try {
    // Getting data from DB
    const medicines = await Medicine.find();
    let dataDate;
    medicines.map((item) => (dataDate = item.date));
    console.log("The date is ", dayjs(dataDate));
    return new Response(JSON.stringify(medicines), { status: 200 });
  } catch (error) {
    return new Response("GET Failed", { status: 500 });
  }
};

export const POST = async (req, res) => {
  await connectDB();
  try {
    const formData = req.body; // Data from the form (Client Side)

    const today = new Date(); // Today's Date
    const filter = { date: today, "data.person": formData.person }; // Filtering the data to find the person in today's date
    const update = {
      $push: {
        // Pushing the new medicine to the array
        "data.$.medicines": {
          // $ is the index of the person in the array
          name: formData.name,
          amount: formData.amount,
          time: formData.time,
          taken: formData.taken,
          postMeal: formData.postMeal,
        },
      },
    };

    // Updating the data in DB or creating a new one if not found
    const result = await Medicine.updateOne(filter, update, { upsert: true });

    // Logging the result
    if (result.upserted) console.log("New Medicine added Successfully:", formData.person);
    else console.log("Medicine Updated Successfully", formData.person);

    return new Response("New Medicine added Successfully", { status: 200 });
  } catch (error) {
    return new Response("POST Failed", { status: 500 });
  }
};
