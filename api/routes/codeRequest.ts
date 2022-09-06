import { Router } from "express";
import { container } from "tsyringe";
import { CodeRequestController } from "../controller/codeRequest";

const codeRequestRouter = Router();

codeRequestRouter
  .route("/code")
  .post(container.resolve(CodeRequestController).codeRequest);

export default codeRequestRouter;
