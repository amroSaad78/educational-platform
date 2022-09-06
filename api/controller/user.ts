import { ValidationService } from "../services/validationService";
import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../helper/errorResponse";
import { UserService } from "../services/userService";
import { requestError } from "../constants/errors";
import * as messages from "../constants/messages";
import { autoInjectable } from "tsyringe";
import { User } from "../entities/User";
import { RolesArray } from "../constants/enums";
const base64 = require("base-64");
const utf8 = require("utf8");

@autoInjectable()
export class UserController {
  constructor(
    private userService: UserService,
    private validationService: ValidationService
  ) {}

  addUser = async (req: Request, res: Response, next: NextFunction) => {
    let { name, email, password, tel, identity, role } = req.body;
    try {
      email = utf8.decode(base64.decode(email));
      password = utf8.decode(base64.decode(password));
    } catch {
      return next(new ErrorResponse({ errMessage: requestError }, 400));
    }
    const error = this.validationService
      .between(name, 3, 50, "nameErr", messages.invalidName)
      .required(name, "nameErr", messages.requiredName)
      .isValidEmail(email, "emailErr", messages.invalidEmail)
      .required(email, "emailErr", messages.requiredEmail)
      .isValidTel(tel, "telErr", messages.invalidTel)
      .required(tel, "telErr", messages.requiredTel)
      .isValidLength(identity, 10, "identityErr", messages.invalidIdentity)
      .required(identity, "identityErr", messages.requiredIdentity)
      .isSecure(password, "passwordErr", messages.weakPassword)
      .required(password, "passwordErr", messages.requiredPassword)
      .isIncluded(role, RolesArray, "roleErr", messages.invalidRole)
      .required(role, "roleErr", messages.requiredRole)
      .result();
    if (Object.keys(error).length) {
      error.errMessage = requestError;
      return next(new ErrorResponse(error, 400));
    }
    const user = new User(
      name.trim(),
      email.trim().toLowerCase(),
      password.trim(),
      true,
      false,
      tel,
      identity,
      role
    );
    await user.encryptPassword();
    user.setVerificationCode();
    user.setCodeExpiration();
    try {
      const respone = await this.userService.add(user);
      res.status(respone.statusCode).json(respone.object);
    } catch (err: any) {
      next(new ErrorResponse(err, err?.errno));
    }
  };
}
