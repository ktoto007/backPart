const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const dateFormatRegexp = /^\d{2}.\d{2}.\d{4}$/;
const sexList = ["male", "female"];
const cityRegexp = /^[A-Za-z\s]+$/;

const petSchema = new Schema({
  category: {
    type: String,
    enum: ["sell", "lost-found", "in-good-hands", "my-pet"],
    required: true,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 16,
    required: true,
  },
  date: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return dateFormatRegexp.test(value);
      },
      message: "Invalid date format. Please use DD.MM.YYYY",
    },
  },
  type: {
    type: String,
    minlength: 2,
    maxlength: 16,
    required: true,
  },
  avatar: {
    type: String,
    max: 3 * 1024 * 1024,
  },
  sex: {
    type: String,
    enum: sexList,
    required: function () {
      return ["sell", "lost-found", "in-good-hands"].includes(this.category);
    },
  },
  location: {
    type: String,
    required: function () {
      return ["sell", "lost-found", "in-good-hands"].includes(this.category);
    },
    match: cityRegexp,
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
    ref: 'user'
  }
}, { versionKey: false, timestamps: true });

petSchema.post("save", handleMongooseError);

const petValidationSchema = Joi.object({
  category: Joi.string()
    .valid("sell", "lost-found", "in-good-hands", "my-pet")
    .required(),
  name: Joi.string().min(2).max(16).required(),
  date: Joi.string().pattern(dateFormatRegexp).required(),
  type: Joi.string().min(2).max(16).required(),
  avatar: Joi.string().max(3 * 1024 * 1024),
  // required(),
  sex: Joi.string()
    .valid(...sexList)
    .when("category", {
      is: Joi.valid("sell", "lost-found", "in-good-hands"),
      then: Joi.required(),
    }),
  location: Joi.string()
    .pattern(cityRegexp)
    .when("category", {
      is: Joi.valid("sell", "lost-found", "in-good-hands"),
      then: Joi.required(),
    }),
  price: Joi.number().when("category", {
    is: "sell",
    then: Joi.required(),
  }),
  comments: Joi.string().max(120),
});

const Pet = model("pets", petSchema);

module.exports = {
    Pet,
    petValidationSchema
};
