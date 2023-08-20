const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const id = req.params["petId"];
  if (!isValidObjectId(id)) {
    next(HttpError(400, `${id} it's not valid id`));
  }
  next();
};

module.exports = isValidId;
