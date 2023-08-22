const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const dateFormatRegexp = /^\d{2}.\d{2}.\d{4}$/;

const petSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  dateOfBirth: {
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
    required: true,
  },
  avatar: {
    type: String,
    max: 3 * 1024 * 1024,
  },
  comments: {
    type: String,
    maxlength: 120,
  },
   owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  }
}, { versionKey: false, timestamps: true });

petSchema.post("save", handleMongooseError);

const petValidationSchema = Joi.object({
  name: Joi.string().min(2).max(16).required(),
  date: Joi.string().pattern(dateFormatRegexp).required(),
  type: Joi.string().min(2).max(16).required(),
  comments: Joi.string().max(120),
});

const Pet = model("pets", petSchema);

module.exports = {
    Pet,
    petValidationSchema
};
