import { Router } from "express";
import { container } from "tsyringe";
import { LoginController } from "../controller/login";

const loginRouter = Router();

loginRouter.route("/login").post(container.resolve(LoginController).loginUser);

export default loginRouter;
