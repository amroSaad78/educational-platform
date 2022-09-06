import { Router } from "express";
import { container } from "tsyringe";
import { Roles, RolesArray } from "../constants/enums";
import { UserBasicController } from "../controller/userBasic";
import { UserController } from "../controller/user";
import Guard from "../middleware/guard";

const userRouter = Router();

userRouter
  .route("/user/basic")
  .get(
    container.resolve(Guard).setRoles(RolesArray).protect,
    container.resolve(UserBasicController).getUserData
  );

userRouter
  .route("/user/add")
  .post(
    container.resolve(Guard).setRoles([Roles.ADMIN]).protect,
    container.resolve(UserController).addUser
  );

export default userRouter;
