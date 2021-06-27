const asyncHandle = require("../middlewares/asyncHandle");
const Question = require("../models/Question");

module.exports = {
  createQuestion: asyncHandle(async (req, res, next) => {
    const { exam_id, content, _id } = req.body;

    let question;
    if (_id) {
      question = await Question.findByIdAndUpdate(
        _id,
        {
          content,
        },
        { new: true, runValidators: true }
      );
    } else {
      question = await Question.create({ exam_id, content });
    }

    return res.status(201).json({
      success: true,
      data: question,
    });
  }),
};
