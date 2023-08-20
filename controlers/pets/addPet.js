const { Pet } = require('../../models/pet');

const addPet = async (req, res) => {
    const { _id: owner } = req.user;
    // const date = new Date(req.body.date);
    const result = await Pet.create({ ...req.body, owner });
    res.status(201).json(result);
};

module.exports = addPet;