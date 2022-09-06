import { Router } from "express";
import userRouter from "../routes/user";

const dashRouter = Router();

dashRouter.use("", userRouter);

export default dashRouter;
