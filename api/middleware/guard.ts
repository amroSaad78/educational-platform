import { NextFunction, Request, Response } from "express";
import { DBRepository } from "../repository/repository";
import { ErrorResponse } from "../helper/errorResponse";
import { authentication } from "../constants/errors";
import { Roles } from "../constants/enums";
import { autoInjectable } from "tsyringe";
import { User } from "../entities/User";

const jwt = require("jsonwebtoken");
const config = require("../config/configurations");

@autoInjectable()
export default class Guard {
  private routeRoles: Roles[] = [];
  constructor(private repo: DBRepository<User>) {}

  setRoles = (routeRoles: Roles[]) => {
    this.routeRoles = routeRoles;
    return this;
  };

  protect = async (req: Request, res: Response, next: NextFunction) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    try {
      if (!token) throw {};
      const { id } = jwt.verify(token, config.TOKEN.secret);
      if (!id) throw {};
      const user = await this.repo.findOne(User, { id: id });
      if (!user) throw {};
      if (!user.isActive) throw {};
      if (!this.routeRoles.includes(user.role)) throw {};
      req.body.userData = user;
      next();
    } catch {
      next(new ErrorResponse({ errMessage: authentication }, 401));
    }
  };
}
