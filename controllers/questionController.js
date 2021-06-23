const asyncHandle = require("../middlewares/asyncHandle");
const Question = require("../models/Question");

module.exports = {
  createQuestion: asyncHandle(async (req, res, next) => {
    const { exam_id, content } = req.body;

    const question = await Question.create({ exam_id, content });

    return res.status(201).json({
      success: true,
      data: question,
    });
  }),
};
