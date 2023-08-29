const { User } = require("../../models/user");
const { Pet } = require("../../models/pet");
const { HttpError } = require("../../helpers");

const profile = async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId).select(
    "-password -token -updatedAt -createdAt"
  );
  if (!user) {
    throw HttpError(404, "User not found");
  }

  const pets = await Pet.find({ owner: userId }).select(
    "-updatedAt -createdAt"
  );

  res.json({ user, pets });
};

module.exports = profile;
