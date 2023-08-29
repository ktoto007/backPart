const { HttpError } = require("../../helpers");
const { Notice } = require("../../models/notice");
const { fixDateFormat, uploadImgTocloud } = require("../../utils");

const addNotice = async (req, res) => {
  const userId = req.user._id;
  if (!req.file) {
    res.status(400).json({ message: "bad request" });
    return;
  }

  const fixedDateOfBirth = fixDateFormat(req.body.dateOfBirth);
  const result = await Notice.create({
    ...req.body,
    owner: userId,
    dateOfBirth: fixedDateOfBirth,
  });

  if (!result) {
    return res.status(403).json({
      message: "Failed to create notice",
    });
  }

  const { path, originalname, destination } = req.file;
  const filename = `${result._id}${originalname}`;

  const petAvatar = await uploadImgTocloud(path, destination, filename);

  result.avatar = petAvatar;
  await result.save();

  res.status(201).json(result);
};

module.exports = addNotice;
