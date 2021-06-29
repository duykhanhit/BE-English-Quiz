const ErrorResponse = require("../helpers/ErrorResponse");
const asyncHandle = require("../middlewares/asyncHandle");
const Result = require("../models/Result");

module.exports = {
  getResult: asyncHandle(async (req, res, next) => {
    const { result_id } = req.params;

    const result = await Result.findById(result_id);

    if (!result) {
      return next(new ErrorResponse(404, `Cannot find result.`));
    }

    return res.status(200).json({
      success: true,
      data: { successAnswer: result.countCorrect },
    });
  }),
};
