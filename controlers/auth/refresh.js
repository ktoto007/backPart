const jwt = require("jsonwebtoken");
const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const refresh = async (req, res) => {
  const { refreshToken: token } = req.body;

  try {
    // перевірка чи видавався токен / чи не закінчився
    const { userId } = jwt.verify(token, REFRESH_SECRET_KEY);
    // перевірка чи є цей токен в БД
    const isExist = await User.findOne({ refreshToken: token });
    if (!isExist) {
      throw HttpError(403, "Token invalid");
    }
    // якщо все ок - створюємо нову пару
    const accessToken = jwt.sign({ userId }, ACCESS_SECRET_KEY, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign({ userId }, REFRESH_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    throw HttpError(403, error.message);
  }
};

module.exports = refresh;
