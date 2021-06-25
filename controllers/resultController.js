const ErrorResponse = require("../helpers/ErrorResponse");
const asyncHandle = require("../middlewares/asyncHandle");
const Answer = require("../models/Answer");
const SubmitAnswer = require("../models/SubmitAnswer");

module.exports = {
  getResult: asyncHandle(async (req, res, next) => {
    const { result_id } = req.params;

    const submitAnswer = await SubmitAnswer.find({
      result_id,
    });

    if (submitAnswer.length === 0) {
      return next(new ErrorResponse(404, `Cannot find submit answer`));
    }

    const listAnswerId = submitAnswer.map((value) => value.answer_id);

    const successAnswer = await Answer.find({
      _id: {
        $in: listAnswerId,
      },
      isCorrect: true,
    }).countDocuments();

    if (successAnswer.length === 0) {
      return next(new ErrorResponse(404, `Cannot find result answer`));
    }

    return res.status(200).json({
      success: true,
      data: { successAnswer },
    });
  }),
};
