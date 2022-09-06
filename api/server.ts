import "reflect-metadata";
import express from "express";
import { DataSource } from "typeorm";
import picsRouter from "./routes/pics";
import authRouter from "./middleware/authRouter";
import dashRouter from "./middleware/dashRouter";
import errorHandler from "./middleware/errorHandler";
import { requestPolicy } from "./middleware/requestPolicy";
import { notFound } from "./middleware/notFound";
const app = express();
const fs = require("fs");
const path = require("path");
const https = require("https");
const config = require("./config/configurations");

const log = require("simple-node-logger").createRollingFileLogger(
  config.LOGGER_OPTIONS
);

const namespace = "Server";
let DBSource: DataSource;
let httpsServer: any;

run();

async function run() {
  createExpressApp();
  await runHttpsServer();
  await initializeDB();
}

process.on("unhandledRejection", (err: any, promise) => {
  console.error(`===> ${err.message}`);
  log.error(`${err.message} | ${namespace}`);
  httpsServer?.close(() => process.exit(1));
});

async function initializeDB() {
  DBSource = new DataSource(config.DB_OPTIONS);
  try {
    await DBSource.initialize();
    console.log("Data Source has been initialized!");
  } catch (err: any) {
    console.error(`===> ${err.message}`);
    httpsServer?.close(() => process.exit(2));
  }
}

function createExpressApp() {
  console.info("Creating Express app...");
  app.use(express.json());
  app.use(requestPolicy);
  app.use("/v1/auth", authRouter);
  app.use("/v1/dash", dashRouter);
  app.use("/v1/pics", picsRouter);
  if (config.ENV === "production") {
    app.use(express.static(path.join(__dirname, "client")));
    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "client/index.html"));
    });
  }
  app.post("*", notFound);
  app.use(errorHandler);
}

async function runHttpsServer() {
  const tls = {
    cert: fs.readFileSync(path.join(__dirname, config.CERT)),
    key: fs.readFileSync(path.join(__dirname, config.KEY)),
  };

  httpsServer = https.createServer(tls, app);
  await new Promise((resolve) => {
    httpsServer.listen(config.PORT, resolve);
  })
    .then(() => console.info(`HTTPS server running on port No: ${config.PORT}`))
    .catch((err) => console.error(`===> ${err.message}`));
}

export { DBSource, log };
