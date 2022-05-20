const express = require("express");
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");

const { authenticate } = require("./middleware/authenticate");
const { authorize } = require("./middleware/authorize");

const { uploadFile, downloadFile } = require("./functions/S3");

const router = express.Router();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.includes("image")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  dest: "./uploads",
  limits: { fileSize: 1024 * 1024 * 50 },
  fileFilter: fileFilter,
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});
const inlineFileFilter = (file) => {
  if (file.mimetype.includes("image")) {
    return true;
  } else {
    return false;
  }
};

router.get("/:id", (req, res) => {
  const readStream = downloadFile(req.params.id);

  readStream.pipe(res);
});

router.post(
  "/",
  authenticate,
  authorize("admin", "leadgen.permissions.UploadPhoto"),
  upload.single("file"),
  async (req, res) => {
    try {
      if (!req.authorized)
        return res
          .status(403)
          .json({ message: "You are not allowed to upload" });
      console.log(req.file);
      const tempPath = req.file.path;

      const random = crypto.randomBytes(10).toString("hex");
      const fileExtension = path.extname(req.file.originalname).toLowerCase();

      const targetPath = path.join(
        __dirname,
        "../uploads/" + random + fileExtension
      );

      const result = await uploadFile(req.file, random + fileExtension);
      console.log(result);

      if (inlineFileFilter(req.file)) {
        fs.rename(tempPath, targetPath, (err) => {
          if (err) return res.status(500).json({ message: err });

          return res.status(200).json({
            message: "File uploaded!",
            file: "/image/" + random + fileExtension,
          });
        });
      } else {
        return res
          .status(500)
          .json({ message: "Only .png files are allowed!" });
      }
    } catch (err) {
      res.status(500).json({ message: err });
      console.log(err);
    }
  }
);

module.exports = router;
