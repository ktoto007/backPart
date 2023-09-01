const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const categoryList = ["sell", "lost-found", "in-good-hands"];
const dateFormatRegexp = /^\d{2}.\d{2}.\d{4}$/;
const sexList = ["male", "female"];
const cityRegexp = /^[A-Za-z\s]+$/;

const noticeSchema = new Schema(
  {
    category: {
      type: String,
      enum: categoryList,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
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
    sex: {
      type: String,
      enum: sexList,
      required: true,
    },
    location: {
      type: String,
      match: cityRegexp,
      required: true,
    },
    favorite: {
      type: Array,
      default: [],
    },
    price: {
      type: Number,
      required: function () {
        return this.category === "sell";
      },
      min: [1, "Price must be greater than 0"],
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

noticeSchema.post("save", handleMongooseError);

const noticeValidationSchema = Joi.object({
  category: Joi.string()
    .valid(...categoryList)
    .required()
    .messages({
      "string.base": "The category field must be a string.",
      "string.valid":
        "The category field must have one of the values 'sell', 'lost-found' or 'in-good-hands'.",
      "any.required": "The category field is required.",
      "string.empty": "The category field must not be empty.",
    }),
  title: Joi.string().required().messages({
    "string.base": "The title field must be a string.",
    "any.required": "The title field is required.",
    "string.empty": "The title field must not be empty.",
  }),
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
  type: Joi.string().required().messages({
    "string.base": "The type field must be a string.",
    "any.required": "The type field is required.",
    "string.empty": "The type field must not be empty.",
  }),
  sex: Joi.string()
    .valid(...sexList)
    .required()
    .messages({
      "string.base": "The sex field must be a string.",
      "string.valid":
        "The sex field must have one of the values 'female' or 'male'.",
      "any.required": "The sex field is required.",
      "string.empty": "The sex field must not be empty.",
    }),
  location: Joi.string().pattern(cityRegexp).required().messages({
    "string.base": "The location field must be a string.",
    "any.required": "The location field is required.",
    "string.empty": "The location field must not be empty.",
    "string.pattern.base": "City name must only contain letters and spaces",
  }),
  price: Joi.number()
    .when("category", {
      is: "sell",
      then: Joi.required(),
    })
    .messages({
      "number.base": "The price field must be a number.",
      "any.required": "The price field is required for 'sell' category.",
    }),
  comments: Joi.string().max(120).messages({
    "string.base": "The comments field must be a string.",
    "string.max": "The comments must not exceed 120 symbols.",
  }),
});

const Notice = model("notices", noticeSchema);

module.exports = {
  Notice,
  noticeValidationSchema,
};
