import { Router } from "express";
import { container } from "tsyringe";
import { RegisterController } from "../controller/register";

const regRouter = Router();

regRouter
  .route("/register")
  .post(container.resolve(RegisterController).registerUser);

export default regRouter;
