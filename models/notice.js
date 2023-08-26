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
      // required: true,
      max: 3 * 1024 * 1024,
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
    .required(),
  title: Joi.string().required(),
  name: Joi.string().min(2).max(16).required(),
  dateOfBirth: Joi.string().pattern(dateFormatRegexp).required(),
  type: Joi.string().required(),
  sex: Joi.string()
    .valid(...sexList)
    .required(),
  location: Joi.string().pattern(cityRegexp).required(),
  price: Joi.number().when("category", {
    is: "sell",
    then: Joi.required(),
  }),
  comments: Joi.string().max(120),
});

const Notice = model("notices", noticeSchema);

module.exports = {
  Notice,
  noticeValidationSchema,
};
