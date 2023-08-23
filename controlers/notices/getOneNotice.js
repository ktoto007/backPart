const { Notice } = require("../../models/notice");
const { HttpError } = require("../../helpers");

const getOneNotice = async (req, res) => {
    const { noticeId } = req.params;

    const result = await Notice.findOne({ _id: noticeId });

    if (!result) {
    throw HttpError(404, "Not found");
    };
    
  res.status(200).json(result);
};

module.exports = getOneNotice;