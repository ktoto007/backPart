const { User } = require("../../models/user");
const { Pet } = require("../../models/pet");
const { HttpError } = require("../../helpers");

const getUserInfo = async (req, res) => {
  try {
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
  } catch (error) {
    console.log("Error", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = getUserInfo;
