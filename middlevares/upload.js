const multer = require("multer");
const path = require("path");

const tmpDir = path.join(__dirname, "../", "tmp");

const multerConfig = multer.diskStorage({
  destination: tmpDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileSizeLimit = 3 * 1024 * 1024;

const upload = multer({
  storage: multerConfig,
  limits: {
    fileSize: fileSizeLimit,
  },
});

module.exports = upload;
