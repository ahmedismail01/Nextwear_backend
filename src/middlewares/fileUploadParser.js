const multer = require("multer");
const path = require("path");
const fs = require("fs");

const upload = ({
  dest = "uploads/others",
  fileType = "image",
  allowedFileTypes,
  maxSizeMB = 5,
}) => {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  let defaultTypes = [];
  if (fileType === "image") {
    defaultTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  } else if (fileType === "pdf") {
    defaultTypes = ["application/pdf"];
  } else if (fileType === "any") {
    defaultTypes = null;
  }

  const storage = multer.memoryStorage();

  const fileFilter = (req, file, cb) => {
    const typesToUse = allowedFileTypes || defaultTypes;

    if (!typesToUse) {
      return cb(null, true);
    }

    if (typesToUse.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Only ${fileType} files are allowed!`), false);
    }
  };

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: maxSizeMB * 1024 * 1024 },
  });
};

module.exports = {
  upload,
};
