const mongoose = require("mongoose");

const Jewllery = new mongoose.Schema(
  {
    image: String,
    name: String,
    type: String,
    price: String,
    description: String
  },
  {
    collection: "Jewllery",
  }
);

mongoose.model("Jewllery", Jewllery);