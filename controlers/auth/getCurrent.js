const getCurrent = async (req, res) => {
  const { name, email, avatar } = req.user;

  res.json({
    user: { name, email, avatar },
  });
};

module.exports = getCurrent;
