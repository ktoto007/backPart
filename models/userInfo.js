const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const dateFormatRegexp = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
const phoneRegexp = /^\+380\d{9}$/;
const cityRegexp = /^[A-Za-z\s]+$/;

const userInfoSchema = new Schema({
  avatar: {
    type: String,
    required: true,
    max: 3 * 1024 * 1024,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return emailRegexp.test(value);
      },
      message: "Invalid email format",
    },
  },
  birthday: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return dateFormatRegexp.test(value);
      },
      message: "Invalid date format. Please use DD-MM-YYYY.",
    },
    default: "00.00.0000"
  },
  phone: {
    type: String,
    match: phoneRegexp,
    default: "+38000000000"
  },
  city: {
    type: String,
    match: cityRegexp,
    default: "City"
  },
});

userInfoSchema.post("save", handleMongooseError);

const userInfoValidateSchema = Joi.object({
  avatar: Joi.string()
    .max(3 * 1024 * 1024)
    .required(),
  name: Joi.string(),
  email: Joi.string().pattern(emailRegexp).required(),
  birthday: Joi.string().pattern(dateFormatRegexp).required(),
  phone: Joi.string().pattern(phoneRegexp),
  city: Joi.string().pattern(cityRegexp),
});

const UserInfo = model("usersinfo", userInfoSchema);

module.exports = {
  UserInfo,
  userInfoValidateSchema,
};
