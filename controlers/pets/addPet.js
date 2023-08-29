const { Pet } = require("../../models/pet");
const { fixDateFormat, uploadImgTocloud } = require("../../utils");

const addPet = async (req, res) => {
  const fixedDateOfBirth = fixDateFormat(req.body.dateOfBirth);

  const newPet = await Pet.create({
    ...req.body,
    owner: req.user._id,
    dateOfBirth: fixedDateOfBirth,
  });

  if (!req.file) {
    res.status(400).json("photo is required");
    return;
  }

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
};

module.exports = addPet;
