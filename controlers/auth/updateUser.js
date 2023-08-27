const { User } = require("../../models/user");
const { fixDateFormat, uploadImgTocloud } = require("../../utils");

const updateSub = async (req, res) => {
  const userId = req.user.id;
  let avatar = req.user.avatar;

  if (req.file) {
    const { path, originalname, destination } = req.file;

    const filename = `${userId}${originalname}`;

    avatar = await uploadImgTocloud(path, destination, filename);
  }

  try {
    const fixedBirthday = fixDateFormat(req.body.birthday);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { ...req.body, avatar, birthday: fixedBirthday },
      {
        new: true,
      }
    );

    res.json({
      name: updatedUser.name,
      email: updatedUser.email,
      avatar,
      birthday: fixedBirthday,
      city: updatedUser.city,
    });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = updateSub;
