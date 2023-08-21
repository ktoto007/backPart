const { User } = require("../../models/user");
const path = require("path");
const fs = require("fs/promises");

const avatarsDir = path.join(__dirname, "../", "../", "public", "avatars");

const updateSub = async (req, res) => {
  const userId = req.user.id;

  const { path: tempUpload, originalname } = req.file;

  const filename = `${userId}${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);

  await fs.rename(tempUpload, resultUpload);

  const avatar = path.join("avatars", filename);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { ...req.body, avatar },
      {
        new: true,
      }
    );

    res.json({
      name: updatedUser.name,
      email: updatedUser.email,
      avatar,
      birthday: updatedUser.birthday,
      city: updatedUser.city,
    });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = updateSub;
