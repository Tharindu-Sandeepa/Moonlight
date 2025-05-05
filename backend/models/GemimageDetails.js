const mongoose = require("mongoose");

const ImageDetailsScehma = new mongoose.Schema(
  {
    image: String,
    name: String,
    type: String,
    price: String,
    description: String
  },
  {
    collection: "ImageDetails",
  }
);

mongoose.model("ImageDetails", ImageDetailsScehma);
