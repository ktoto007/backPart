const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
const dateFormatRegexp = /^\d{2}.\d{2}.\d{4}$/;
const phoneRegexp = /^\+380\d{9}$/;
const cityRegexp = /^[A-Za-z\s]+$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 16,
      required: true,
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
    password: {
      type: String,
      match: passwordRegexp,
      required: true,
    },
    token: String,
    avatar: {
      type: String,
    },
    birthday: {
      type: Date,
      default: null,
    },
    phone: {
      type: String,
      match: phoneRegexp,
      default: "+380000000000",
    },
    city: {
      type: String,
      match: cityRegexp,
      default: "City",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(16).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().pattern(passwordRegexp).min(6).max(16).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().pattern(passwordRegexp).min(6).max(16).required(),
});

const userInfoSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  birthday: Joi.string().pattern(dateFormatRegexp).required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
  city: Joi.string().pattern(cityRegexp).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  userInfoSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
