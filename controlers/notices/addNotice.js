const { Notice } = require("../../models/notice");
// const fixDateFormat = require('../../utils/fixDateFormat');

const addNotice = async (req, res) => {
    
    // ===================== add avatar =====================

    try {
        const userId = req.user._id;
        // const fixedDateOfBirth = fixDateFormat(req.body.dateOfBirth);
        const result = await Notice.create({ ...req.body, owner: userId });
        // dateOfBirth: fixedDateOfBirth

        if (!result) {
            return res.status(500).json({
                message: "Failed to create notice"
            });
        };

        res.status(201).json({
            message: "Notice successfully added"
        });

    } catch (error) {
        console.log("Error creating notice:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    };
};

module.exports = addNotice;