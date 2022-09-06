import { Router } from "express";
import { container } from "tsyringe";
import { RedeemPasswordController } from "../controller/redeemPassword";

const redeemRouter = Router();

redeemRouter
  .route("/redeem/code")
  .post(container.resolve(RedeemPasswordController).codeRequest);

redeemRouter
  .route("/redeem/verify")
  .post(container.resolve(RedeemPasswordController).verifyCode);

export default redeemRouter;
