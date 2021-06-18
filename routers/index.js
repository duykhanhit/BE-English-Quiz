const errorHandle = require("../middlewares/errorHandle");

const authRouter = require("./authRouter");

const routers = [authRouter];

module.exports = (app) => {
  routers.forEach(router => {
    app.use('/api', router)
  })

  // Middleware handle error
  app.use(errorHandle);
};
