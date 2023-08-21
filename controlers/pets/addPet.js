const { Pet } = require("../../models/pet");
const path = require("path");
const fs = require("fs/promises");

const petPhotosDir = path.join(__dirname, "../", "../", "public", "petPhotos");

const addPet = async (req, res) => {

  try {
      const newPet = await Pet.create(
          { ...req.body, owner: req.user._id },
    );
      
    const { path: tempUpload, originalname } = req.file;

  const filename = `${newPet._id}${originalname}`;
  const resultUpload = path.join(petPhotosDir, filename);

      await fs.rename(tempUpload, resultUpload);

      const petAvatar = path.join("petPhotos", filename);
   
    const updatedPet = await Pet.findByIdAndUpdate(newPet._id, { avatar: petAvatar }, {
      new: true,
      })
      console.log(updatedPet);

      res.status(201).json({
        name: newPet.name,
        date: newPet.date,
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