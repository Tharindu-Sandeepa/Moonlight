const mongoose = require("mongoose");
require("../models/Jewllery");
const Jewllery = mongoose.model("Jewllery");


exports.uploadImage = async (req, res) => {
  const { name, type, price, description } = req.body;
  const imageName = req.file.filename;

  try {
    // Create a new document with image and additional fields
    await Jewllery.create({
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
    const data = await Jewllery.find({});
    res.send({ status: "ok", data: data });
  } catch (error) {
    res.json({ status: error });
  }
};

exports.deleteImage = async (req, res) => {
  const { id } = req.params;

  try {

    
    await Jewllery.findByIdAndDelete(id);
    res.send({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
};

exports.updateImage = async (req, res) => {
  const { id, name, type, price, description } = req.body;
  const imageName = req.file.filename;

  try {
    // Update the existing document with new image and additional fields
    await Jewllery.findByIdAndUpdate(id, {
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

exports.getItem = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Jewllery.findById(id);
    if (!item) {
      return res.status(404).json({ status: "error", message: "Item not found" });
    }
    res.json({ status: "ok", data: item });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
