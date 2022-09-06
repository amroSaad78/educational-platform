import { Router } from "express";
import loginRouter from "../routes/login";
import regRouter from "../routes/register";
import rateLimit from "express-rate-limit";
import googleRouter from "../routes/google";
import verifyRouter from "../routes/verifyCode";
import redeemRouter from "../routes/redeemPassword";
import codeRequestRouter from "../routes/codeRequest";

const config = require("../config/configurations");
const limiter = rateLimit(config.RATE_LIMIT);
const authRouter = Router();

authRouter.use(
  "",
  limiter,
  regRouter,
  loginRouter,
  googleRouter,
  redeemRouter,
  verifyRouter,
  codeRequestRouter
);

export default authRouter;
