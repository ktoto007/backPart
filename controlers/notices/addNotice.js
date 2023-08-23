const { Notice } = require("../../models/notice");
const path = require("path");
const fs = require("fs/promises");
const fixDateFormat = require("../../utils/fixDateFormat");

const petPhotosDir = path.join(__dirname, "../", "../", "public", "petPhotos");

const addNotice = async (req, res) => {
  try {
    const userId = req.user._id;
    const fixedDateOfBirth = fixDateFormat(req.body.dateOfBirth);
    const result = await Notice.create({
      ...req.body,
      owner: userId,
      dateOfBirth: fixedDateOfBirth,
    });

    if (!result) {
      return res.status(500).json({
        message: "Failed to create notice",
      });
    }

    if (req.file) {
      const { path: tempUpload, originalname } = req.file;
      const filename = `${result._id}${originalname}`;
      const resultUpload = path.join(petPhotosDir, filename);

      await fs.rename(tempUpload, resultUpload);

      const petAvatar = path.join("petPhotos", filename);

      result.avatar = petAvatar;
      await result.save();
    }

    res.status(201).json(result);
  } catch (error) {
    console.log("Error creating notice:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = addNotice;
