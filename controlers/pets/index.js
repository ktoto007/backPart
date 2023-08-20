const { ctrlWrapper } = require("../../helpers");
const addPet = require("./addPet");
const deletePet = require("./deletePet");

module.exports = {
  addPet: ctrlWrapper(addPet),
  deletePet: ctrlWrapper(deletePet),
};
