import { Router } from "express";
import { container } from "tsyringe";
import { CodeVerficationController } from "../controller/codeVerfication";

const verifyRouter = Router();

verifyRouter
  .route("/verify")
  .post(container.resolve(CodeVerficationController).verifyCode);

export default verifyRouter;
