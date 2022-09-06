import path from "path";
import { throttle } from "../constants/errors";
require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 4443,
  ENV: process.env.ENV || "development",
  CERT: process.env.TLS_CERT || "./certs/cert.pem",
  KEY: process.env.TLS_KEY || "./certs/key.pem",
  ORIGIN: process.env.ORIGIN || "*",
  DB_OPTIONS: {
    type: "mysql",
    host: "localhost",
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_NAME || "sofraa",
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "#tRx-1402m9@",
    entities: [path.resolve(__dirname, "..", "entities/*")],
    synchronize: true,
    charset: "UTF8_GENERAL_CI",
  },
  LOGGER_OPTIONS: {
    logDirectory: path.join(__dirname, "../../logs"),
    fileNamePattern: "roll-<DATE>.log",
    dateFormat: "YYYY.MM.DD",
  },
  MAILER: {
    from: process.env.EMAIL_FROM,
    centerName: process.env.CENTER_NAME,
  },
  MAILER_TRANSPORTER: {
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  },
  RATE_LIMIT: {
    windowMs: 60 * 1000,
    max: process.env.RATE_OF_REQUESTS || 5,
    message: { errMessage: throttle },
    standardHeaders: false,
    legacyHeaders: false,
  },
  TOKEN: {
    secret: process.env.SERVER_TOKEN_SECRET || "NoTokenSecret",
    issuer: process.env.SERVER_TOKEN_ISSUER || "HomeCompany",
    expireTime: process.env.SERVER_TOKEN_EXPIRETIME || 3600,
  },
  GOOGLE: {
    clientID: process.env.GOOGLE_CLIENT_ID,
  },
  BLOB: {
    root: process.env.BLOB_ROOT || "../blob",
    user: "1",
  },
};
