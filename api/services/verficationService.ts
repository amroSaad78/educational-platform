import { log } from "../server";
import { User } from "../entities/User";
import { autoInjectable } from "tsyringe";
import { DBRepository } from "../repository/repository";
import { SuccessResponse } from "../helper/successResponse";
import * as errors from "../constants/errors";
const getUTCDate = require("../helper/getUTCDate");
const getToken = require("../helper/getToken");

@autoInjectable()
export class VerficationService {
  private namespace = "VerficationService";
  constructor(private repo: DBRepository<User>) {}

  verify = async (email: string, code: string): Promise<SuccessResponse> => {
    let existingUser: User | null;
    try {
      existingUser = await this.repo.findOne(User, { email: email });

      if (!existingUser) throw { errMessage: errors.notFoundEmail, errno: 404 };

      if (!existingUser.isActive) {
        throw { errMessage: errors.authentication, errno: 401 };
      }

      if (existingUser.isVerified) {
        throw { errMessage: errors.verfiedEmail, errno: 400 };
      }

      const expirationDate = existingUser.getCodeExpiration();
      const currentDate = getUTCDate(0, 0, 0);

      if (expirationDate && currentDate > expirationDate) {
        throw { errMessage: errors.expiredCode, errno: 400 };
      }

      if (existingUser.getVerificationCode() != code) {
        throw { errMessage: errors.codeError, errno: 400 };
      }

      await this.repo.update(
        User,
        { id: existingUser.id },
        {
          isVerified: true,
        }
      );

      const token = getToken(existingUser);
      return new SuccessResponse({ token: token }, 200);
    } catch (err: any) {
      err.message && log.error(`${err.message} | ${this.namespace}`);
      throw err;
    }
  };
}
