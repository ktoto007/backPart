const { HttpError } = require("../../helpers");
const { User } = require("../../models/user");
const { fixDateFormat, uploadImgTocloud } = require("../../utils");

const updateSub = async (req, res) => {
  const { id: userId, email } = req.user;
  const newEmail = req.body.email;
  let avatar = req.user.avatar;
  console.log(email);
  console.log(newEmail);
  if (email !== newEmail) {
    const user = await User.findOne({ email: newEmail });
    console.log(user);
    if (user) {
      throw HttpError(409, "Email already in use");
    }
  }

  if (req.file) {
    const { path, originalname, destination } = req.file;

    const filename = `${userId}${originalname}`;

    avatar = await uploadImgTocloud(path, destination, filename);
  }

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
};

module.exports = updateSub;
