import connectDB from "../../../../utils/db";
import Medicine from "../../../../models/Medicine";

export const PATCH = async (req) => {
  await connectDB();
  try {
    const { person, medicineId, taken, date } = await req.json();
    console.log(person, medicineId, taken, date);

    /*------------------------------------------------------------------------------*/
    const foundMeds = await Medicine.findOne({ "data.medicines._id": medicineId });

    if (!foundMeds) return new Response("Not found", { status: 404 });

    const personToUpdate = foundMeds.data.find((item) => item.person === person);

    console.log(personToUpdate);

    if (!personToUpdate) return new Response("Not found", { status: 404 });
    else {
      const medicineToUpdate = personToUpdate.medicines.find((meds) => meds._id.toString() === medicineId);

      if (!medicineId) {
        return new Response("Not found", { status: 404 });
      } else {
        console.log(medicineToUpdate);
        medicineToUpdate.taken = taken;
        foundMeds.save();
        return new Response(JSON.stringify(foundMeds), { status: 200 });
      }
    }
    /*------------------------------------------------------------------------------*/
  } catch (error) {
    console.log(error);
    return new Response("PATCH Failed", { status: 500 });
  }
};
