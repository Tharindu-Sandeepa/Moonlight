const multer = require("multer");
const path = require("path");
const imagesPath = path.join(__dirname, "../../Frontend/src/images/");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imagesPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;