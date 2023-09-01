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
  name: Joi.string().min(2).max(16).required().messages({
    "string.base": "The name field must be a string.",
    "any.required": "The name field is required.",
    "string.empty": "The name field must not be empty.",
    "string.min": "The name must be not less 2 symbols.",
    "string.max": "The name must not exceed 16 symbols.",
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.base": "The email field must be a string.",
    "any.required": "The email field is required.",
    "string.empty": "The email field must not be empty.",
    "string.pattern.base": "Invalid email format. Please provide a valid email address."
  }),
  password: Joi.string()
    .pattern(passwordRegexp)
    .min(6)
    .max(16)
    .required()
    .messages({
      "string.base": "The password field must be a string.",
      "any.required": "The password field is required.",
      "string.empty": "The password field must not be empty.",
      "string.min": "The password must be not less 6 symbols.",
      "string.max": "The name must not exceed 16 symbols.",
      "string.pattern.base": "Password must contain at least one lowercase letter, one uppercase letter, and one digit."
    }),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.base": "The email field must be a string.",
    "any.required": "The email field is required.",
    "string.empty": "The email field must not be empty.",
    "string.pattern.base": "Invalid email format. Please provide a valid email address."
  }),
  password: Joi.string()
    .pattern(passwordRegexp)
    .min(6)
    .max(16)
    .required()
    .messages({
      "string.base": "The password field must be a string.",
      "any.required": "The password field is required.",
      "string.empty": "The password field must not be empty.",
      "string.min": "The password must be not less 6 symbols.",
      "string.max": "The name must not exceed 16 symbols.",
      "string.pattern.base": "Password must contain at least one lowercase letter, one uppercase letter, and one digit."
    }),
});

const userInfoSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "The name field must be a string.",
    "any.required": "The name field is required.",
    "string.empty": "The name field must not be empty.",
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.base": "The email field must be a string.",
    "any.required": "The email field is required.",
    "string.empty": "The email field must not be empty.",
  }),
  birthday: Joi.string().pattern(dateFormatRegexp).required().messages({
    "string.base": "The birthday field must be a string.",
    "any.required": "The birthday field is required.",
    "string.empty": "The birthday field must not be empty.",
    "string.pattern.base": "Invalid date format. Use DD-MM-YYYY.",
  }),
  phone: Joi.string().pattern(phoneRegexp).required().messages({
    "string.base": "The phone field must be a string.",
    "any.required": "The phone field is required.",
    "string.empty": "The phone field must not be empty.",
    "string.pattern.base":
      "Invalid phone format. Make sure you use the number format '+380XXXXXXXXX'.",
  }),
  city: Joi.string().pattern(cityRegexp).required().messages({
    "string.base": "The city field must be a string.",
    "any.required": "The city field is required.",
    "string.empty": "The city field must not be empty.",
    "string.pattern.base": "City name must only contain letters and spaces",
  }),
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
