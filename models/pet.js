const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const dateFormatRegexp = /^\d{2}.\d{2}.\d{4}$/;

const petSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
      match: dateFormatRegexp,
    },
    type: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    comments: {
      type: String,
      maxlength: 120,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

petSchema.post("save", handleMongooseError);

const petValidationSchema = Joi.object({
  name: Joi.string().min(2).max(16).required().messages({
    "string.base": "The name field must be a string.",
    "any.required": "The name field is required.",
    "string.min": "The name must be not less 2 symbols.",
    "string.max": "The name must not exceed 16 symbols.",
    "string.empty": "The name field must not be empty.",
  }),
  dateOfBirth: Joi.string().pattern(dateFormatRegexp).required().messages({
    "string.base": "The dateOfBirth field must be a string.",
    "any.required": "The dateOfBirth field is required.",
    "string.empty": "The dateOfBirth field must not be empty.",
    "string.pattern.base": "Invalid date format. Use DD-MM-YYYY.",
  }),
  type: Joi.string().min(2).max(16).required().messages({
    "string.base": "The type field must be a string.",
    "any.required": "The type field is required.",
    "string.min": "The type must be not less 2 symbols.",
    "string.max": "The type must not exceed 16 symbols.",
    "string.empty": "The type field must not be empty.",
  }),
  comments: Joi.string().max(120).messages({
    "string.base": "The comments field must be a string.",
    "string.max": "The comments must not exceed 120 symbols.",
  }),
});

const Pet = model("pets", petSchema);

module.exports = {
  Pet,
  petValidationSchema,
};
