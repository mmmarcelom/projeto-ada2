// config/config.js

module.exports = {
    port: process.env.PORT_SERVER || 8080,
    allowedOrigins: "http://localhost:8081",
    database: {
        user: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        ssl: process.env.DB_SSL,
      },
    jwtSecret: process.env.JWT_SECRET
}
  