// pages/api/medicines.js
import connectDB from "@/utils/db";
import Medicine from "@/models/Medicine";

export const GET = async () => {
  await connectDB();
  try {
    const medicines = await Medicine.find();
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

// export const PATCH = async (req, res) => {
//   await connectDB();
//   try {
//     const comingData = request.nextUrl.searchParams;
//     console.log(comingData);
//     // console.log(req);
//     // const { person, medicineId, taken, date } = req.body;
//     // const date = req.query.date;
//     // const person = req.query.person;
//     // const medicineId = req.query.medicineId;
//     // const taken = req.query.taken;
//     // console.log(person, medicineId, taken, date);

//     const filter = { date: date, "data.person": person, "data.medicines._id": medicineId };
//     const update = { $set: { "data.$.medicines.$.taken": taken } };

//     const result = await Medicine.updateOne(filter, update);

//     if (result.nModified === 1) {
//       console.log(`Medicine with ID ${medicineId} updated successfully.`);
//       return new Response("Medicine updated successfully", { status: 200 });
//     } else {
//       console.log(`Failed to update medicine with ID ${medicineId}.`);
//       return new Response("Failed to update medicine", { status: 500 });
//     }
//   } catch (error) {
//     return new Response("PATCH Failed", { status: 500 });
//   }
// };
