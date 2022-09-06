import { Router } from "express";
import { container } from "tsyringe";
import { GoogleController } from "../controller/google";

const googleRouter = Router();

googleRouter
  .route("/google")
  .post(container.resolve(GoogleController).googleChecking);

export default googleRouter;
