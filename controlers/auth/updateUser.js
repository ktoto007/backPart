const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");
const updateSub = async (req, res) => {
  const id = req.params["id"];
  if (id !== req.user.id) {
    throw HttpError(
      400,
      "You do not have the right to change another user, please change id  in the request"
    );
  }
  console.log(id === req.user.id);
  const newUser = await User.findByIdAndUpdate(id, req.body, { new: true });
  res.json(newUser);
};

module.exports = updateSub;
