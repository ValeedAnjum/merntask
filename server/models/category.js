const mongoose = require("mongoose");
const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  
});

module.exports = Category = mongoose.model("CATEGORIES_ROPSTAM", categorySchema);
