import { NextFunction, Request, Response } from "express";
import { autoInjectable } from "tsyringe";
import { User } from "../entities/User";

@autoInjectable()
export class UserBasicController {
  getUserData = async (req: Request, res: Response, next: NextFunction) => {
    let { userData } = req.body;
    const user = userData as User;
    res.status(200).json({
      userRole: user.role,
      imageURL: user.mime ? `pics/user/${user.id}` : "",
    });
  };
}
