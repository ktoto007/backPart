const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const newsSchema = new Schema(
  {
    imgUrl: String,
    title: String,
    text: String,
    date: String,
    url: String,
  },
  { versionKey: false, timestamps: true }
);

newsSchema.post("save", handleMongooseError);

const News = model("news", newsSchema);

module.exports = {
  News,
};
