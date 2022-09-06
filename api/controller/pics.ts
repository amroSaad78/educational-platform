import { autoInjectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../helper/errorResponse";
import { User } from "../entities/User";
import { DBRepository } from "../repository/repository";
import { requestError } from "../constants/errors";

const path = require("path");
const config = require("../config/configurations");

@autoInjectable()
export class PicsController {
  constructor(private repo: DBRepository<User>) {}
  getUserPic = async (req: Request, res: Response, next: NextFunction) => {
    let { id } = req.params;
    try {
      if (!id) throw { errMessage: requestError, errno: 400 };
      const user = await this.repo.findOne(User, { id: id });
      if (!user) throw { errMessage: requestError, errno: 400 };
      const options = this.getOptions(user.mime);
      res.sendFile(`${config.BLOB.user}/${user.id}`, options);
    } catch (err: any) {
      next(new ErrorResponse(err, err?.errno));
    }
  };

  private getOptions = (mime: string | undefined) => {
    const options = {
      root: path.join(__dirname, `${config.BLOB.root}/`),
      dotfiles: "deny",
      headers: {
        "Content-Type": mime,
        "Cache-Control": "public, max-age=864000, immutable",
      },
    };
    return options;
  };
}
