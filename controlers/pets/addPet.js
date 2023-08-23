const { Pet } = require("../../models/pet");
const path = require("path");
const fs = require("fs/promises");
const fixDateFormat = require("../../utils/fixDateFormat");

const petPhotosDir = path.join(__dirname, "../", "../", "public", "petPhotos");

const addPet = async (req, res) => {
  try {

    const fixedDateOfBirth = fixDateFormat(req.body.dateOfBirth);

    const newPet = await Pet.create({
      ...req.body,
      owner: req.user._id,
      dateOfBirth: fixedDateOfBirth,
    });

    const { path: tempUpload, originalname } = req.file;

    const filename = `${newPet._id}${originalname}`;
    const resultUpload = path.join(petPhotosDir, filename);

    await fs.rename(tempUpload, resultUpload);

    const petAvatar = path.join("petPhotos", filename);

    const updatedPet = await Pet.findByIdAndUpdate(
      newPet._id,
      { avatar: petAvatar },
      {
        new: true,
      }
    );

    res.status(201).json({
      name: newPet.name,
      dateOfBirth: fixedDateOfBirth,
      type: newPet.type,
      avatar: petAvatar,
      id: newPet._id,
      comments: newPet.comments,
    });
  } catch (error) {
    console.error("Update petAvatar error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = addPet;
