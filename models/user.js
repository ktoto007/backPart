const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require('../helpers');

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 10,
    required: true,
  },
  email: {
    type: String,
    match: emailRegexp,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 7,
    required: true,
    },
    token: String,
    avatarURL: String,
}, { versionKey: false, timestamps: true });

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(7).required()
});

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(7).required()
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