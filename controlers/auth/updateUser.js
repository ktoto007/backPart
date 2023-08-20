const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");
const updateSub = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;

  // Перевірка, чи користувач оновлює свої дані
  if (id !== userId) {
    throw HttpError(400, "You do not have the right to change another user.");
  }

  // Обмеження полів
  const allowedFields = ["name", "email", "birthday", "phone", "city"];
  const updateData = {};
  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      updateData[field] = req.body[field];
    }
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.json(updatedUser);
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = updateSub;
