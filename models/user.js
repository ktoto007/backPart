const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require('../helpers');

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

const userSchema = new Schema({
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
      validator: function(value) {
        return emailRegexp.test(value);
      },
      message: 'Invalid email format',
    },
  },
  password: {
    type: String,
    match: passwordRegexp,
    minlength: 6,
    maxlength: 16,
    required: true,
    },
    token: String,
    avatarURL: String,
}, { versionKey: false, timestamps: true });

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
    name: Joi.string().min(2).max(16).required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().pattern(passwordRegexp).min(6).max(16).required()
});

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().pattern(passwordRegexp).min(6).max(16).required()
});

const schemas = {
    registerSchema,
    loginSchema
};

const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
};