const current = async (req, res) => {
  const { name, email, avatar, _id, phone, birthday, city } = req.user;

  res.json({
    user: { name, email, avatar, id: _id, phone, birthday, city },
  });
};

module.exports = current;
