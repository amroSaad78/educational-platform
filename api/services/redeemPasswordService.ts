import { IMailerOptions } from "../interfaces/IMailerOptions";
import { SuccessResponse } from "../helper/successResponse";
import { DBRepository } from "../repository/repository";
import * as errors from "../constants/errors";
import { autoInjectable } from "tsyringe";
import { User } from "../entities/User";
import { Mailer } from "./mailer";
import { log } from "../server";
const getUTCDate = require("../helper/getUTCDate");
const getToken = require("../helper/getToken");

@autoInjectable()
export class RedeemPasswordService {
  private namespace = "RedeemPasswordService";
  constructor(private repo: DBRepository<User>, private mailer: Mailer) {
    this.mailer.on(
      "send",
      async (options: IMailerOptions, namespace: string) => {
        await this.mailer.send(options, namespace);
      }
    );
  }

  request = async (email: string): Promise<SuccessResponse> => {
    let existingUser: User | null;

    try {
      existingUser = await this.repo.findOne(User, { email: email });

      if (!existingUser) throw { errMessage: errors.notFoundEmail, errno: 404 };

      if (!existingUser.isActive) {
        throw { errMessage: errors.authentication, errno: 401 };
      }

      existingUser.setVerificationCode();
      existingUser.setCodeExpiration();

      await this.repo.update(
        User,
        { id: existingUser.id },
        {
          verificationCode: existingUser.getVerificationCode(),
          codeExpiration: existingUser.getCodeExpiration(),
        }
      );

      const options = this.mailer.getVerficationOptions(existingUser);
      this.mailer.sendEmail(options, this.namespace);
      return new SuccessResponse({}, 200);
    } catch (err: any) {
      log.error(`${err.message} | ${this.namespace}`);
      throw err;
    }
  };

  verify = async (email: string, code: string): Promise<SuccessResponse> => {
    let existingUser: User | null;

    try {
      existingUser = await this.repo.findOne(User, { email: email });

      if (!existingUser) throw { errMessage: errors.notFoundEmail, errno: 404 };

      if (!existingUser.isActive) {
        throw { errMessage: errors.authentication, errno: 401 };
      }

      const expirationDate = existingUser.getCodeExpiration();
      const currentDate = getUTCDate(0, 0, 0);

      if (expirationDate && currentDate > expirationDate) {
        throw { errMessage: errors.expiredCode, errno: 400 };
      }

      if (existingUser.getVerificationCode() != code) {
        throw { errMessage: errors.codeError, errno: 400 };
      }

      if (!existingUser.isVerified) {
        await this.repo.update(
          User,
          { id: existingUser.id },
          {
            isVerified: true,
          }
        );
      }
      const token = getToken(existingUser);
      return new SuccessResponse({ token: token }, 200);
    } catch (err: any) {
      err.message && log.error(`${err.message} | ${this.namespace}`);
      throw err;
    }
  };
}
