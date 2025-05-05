const mongoose = require("mongoose");
require("../models/GemimageDetails");
const Images = mongoose.model("ImageDetails");


exports.uploadImage = async (req, res) => {
  const { name, type, price, description } = req.body;
  const imageName = req.file.filename;

  try {
    // Create a new document with image and additional fields
    await Images.create({
      image: imageName,
      name: name,
      type: type,
      price: price,
      description: description
    });

    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
};



exports.getImages = async (req, res) => {
  try {
    const data = await Images.find({});
    res.send({ status: "ok", data: data });
  } catch (error) {
    res.json({ status: error });
  }
};

const fs = require("fs");
const path = require("path");
//const imagesPath = path.join(__dirname, "../../Frontend/src/images/");
const imagesPath = path.join(__dirname, "../../src/images/");

exports.deleteImage = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the existing document to determine which image file to delete
        const existingJewellery = await Images.findById(id);

        if (!existingJewellery) {
            return res.status(404).json({ status: "not found" });
        }

        // Delete the image file associated with the entry
        const imagePath = path.join(imagesPath, existingJewellery.image);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        // Delete the entry from the database
        await Images.findByIdAndDelete(id);

        res.json({ status: "ok" });
    } catch (error) {
        console.error("Error deleting image:", error);
        res.status(500).json({ status: error.message });
    }
};


exports.updateImage = async (req, res) => {
  const { name, type, price, description } = req.body;
  const { id } = req.params;
  let imageName;

  try {
      // Check if a new image file was uploaded
      if (req.file) {
          imageName = req.file.filename;
      }

      // Find the existing document
      const existingGem = await Images.findById(id);

      // If an image was uploaded, update the image field
      if (imageName) {
        existingGem.image = imageName;
      }

      // Update other fields as well
      existingGem.name = name || existingGem.name;
      existingGem.type = type || existingGem.type;
      existingGem.price = price || existingGem.price;
      existingGem.description = description || existingGem.description;

      // Save the updated document
      await existingGem.save();

      res.json({ status: "ok" });
  } catch (error) {
      console.error("Error updating image:", error);
      res.status(500).json({ status: error.message });
  }
};


exports.getItem = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Images.findById(id);
    if (!item) {
      return res.status(404).json({ status: "error", message: "Item not found" });
    }
    res.json({ status: "ok", data: item });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
