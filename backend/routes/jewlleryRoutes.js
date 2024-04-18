const express = require("express");
const imgUpload = require("../middleware/multer");
const imageController = require("../controllers/jewlleryController");

const router = express.Router();

router.post("/upload-image", imgUpload.single("image"), imageController.uploadImage);
router.get("/get-images", imageController.getImages);
router.put("/update-image/:id", imgUpload.single("image"), imageController.updateImage);
router.delete("/delete-image/:id", imageController.deleteImage);
router.get("/get-item/:id", imageController.getItem);

module.exports = router;