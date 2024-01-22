const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  name: String, // Metropol
  amount: Number, // 1
  time: String, // Morning
  taken: Boolean, // false
  postMeal: Boolean, // false
});

const personSchema = new mongoose.Schema({
  person: String, // Papa
  completed: Boolean, // false
  medicines: [medicineSchema],
});

const finalSchema = new mongoose.Schema({
  date: { type: Date, unique: true }, //Today and no repetition
  data: [personSchema],
});

let Medicine;

if (mongoose.models.Final) {
  Medicine = mongoose.model("Final");
} else {
  Medicine = mongoose.model("Final", finalSchema);
}

module.exports = Medicine;
