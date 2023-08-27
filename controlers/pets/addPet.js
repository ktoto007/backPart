const { Pet } = require("../../models/pet");
const { fixDateFormat, uploadImgTocloud } = require("../../utils");

const addPet = async (req, res) => {
  try {
    const fixedDateOfBirth = fixDateFormat(req.body.dateOfBirth);

    const newPet = await Pet.create({
      ...req.body,
      owner: req.user._id,
      dateOfBirth: fixedDateOfBirth,
    });

    const { path, originalname, destination } = req.file;

    const filename = `${newPet._id}${originalname}`;

    const avatar = await uploadImgTocloud(path, destination, filename);

    await Pet.findByIdAndUpdate(
      newPet._id,
      { avatar },
      {
        new: true,
      }
    );

    res.status(201).json({
      name: newPet.name,
      dateOfBirth: fixedDateOfBirth,
      type: newPet.type,
      avatar,
      id: newPet._id,
      comments: newPet.comments,
    });
  } catch (error) {
    console.error("Update petAvatar error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = addPet;
