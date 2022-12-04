const mongoose = require("mongoose");
const carSchema = mongoose.Schema({
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CATEGORIES_ROPSTAM",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  reg: {
    type: String,
    required: true,
  },
});

module.exports = Car = mongoose.model("CARS_ROPSTAM", carSchema);
