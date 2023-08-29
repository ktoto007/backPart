const current = async (req, res) => {
  const { name, email, avatar, _id } = req.user;

  res.json({
    user: { name, email, avatar, id: _id },
  });
};

module.exports = current;
