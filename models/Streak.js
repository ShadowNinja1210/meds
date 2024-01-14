const mongoose = require("mongoose");

const streakSchema = new mongoose.Schema({
  person: String,
  currentStreak: { startDate: Date, endDate: Date },
  streakHistory: [{ startDate: Date, endDate: Date }],
});

let Streak;

if (mongoose.models.Streak) {
  Streak = mongoose.model("Streak");
} else {
  Streak = mongoose.model("Streak", streakSchema);
}

module.exports = Streak;
