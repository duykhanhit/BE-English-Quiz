module.exports = {
  apps: [
    {
      name: "Base API",
      script: "app.js",
      watch: true,
      autorestart: true,
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
        MONGO_URI: "mongodb+srv://admin:12345abc@open-source.kwezp.mongodb.net/db-english-quiz?retryWrites=true&w=majority",
        JWT_SECRET: "fgsdfsdffa",
        JWT_EXPIRE: 86400000,
        USER_EMAIL: "m4yby.dev@gmail.com",
        PASSWORD_EMAIL: "12345Abc@",
        PAGE: 1,
        LIMIT: 10,
      },
    },
  ],
};
