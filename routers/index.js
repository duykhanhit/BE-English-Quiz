const errorHandle = require("../middlewares/errorHandle");

const authRouter = require("./authRouter");
const examRouter = require("./examRouter");
const answerRouter = require("./answerRouter");
const resultRouter = require("./resultRouter");
const questionRouter = require("./questionRouter");
const historyRouter = require("./historyRouter");

const routers = [
  authRouter,
  examRouter,
  answerRouter,
  resultRouter,
  questionRouter,
  historyRouter,
];

module.exports = (app) => {
  routers.forEach((router) => {
    app.use("/api", router);
  });

  // Middleware handle error
  app.use(errorHandle);
};
