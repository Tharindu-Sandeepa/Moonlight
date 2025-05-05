const express = require("express");
const upload = require("../middleware/multer");
const imageController = require("../controllers/imageController");

const router = express.Router();

router.post("/gemupload-image", upload.single("image"), imageController.uploadImage);
router.get("/gemget-images", imageController.getImages);
router.put("/gemupdate-image/:id", upload.single("image"), imageController.updateImage);
router.delete("/gemdelete-image/:id", imageController.deleteImage);
router.get("/gemget-item/:id", imageController.getItem);

module.exports = router;