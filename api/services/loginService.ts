import { log } from "../server";
import { Mailer } from "./mailer";
const bcrypt = require("bcryptjs");
import { User } from "../entities/User";
import { autoInjectable } from "tsyringe";
import { DBRepository } from "../repository/repository";
import { SuccessResponse } from "../helper/successResponse";
import { IMailerOptions } from "../interfaces/IMailerOptions";
import {
  authentication,
  notFoundEmail,
  passwordError,
} from "../constants/errors";
const getToken = require("../helper/getToken");

@autoInjectable()
export class LoginService {
  private namespace = "LoginService";
  constructor(private repo: DBRepository<User>, private mailer: Mailer) {
    this.mailer.on(
      "send",
      async (options: IMailerOptions, namespace: string) => {
        await this.mailer.send(options, namespace);
      }
    );
  }
  login = async (email: string, password: string): Promise<SuccessResponse> => {
    let existingUser: User | null;

    try {
      existingUser = await this.repo.findOne(User, { email: email });

      if (!existingUser) {
        throw { errMessage: notFoundEmail, errno: 404 };
      }

      if (!existingUser.isActive) {
        throw { errMessage: authentication, errno: 401 };
      }

      if (!existingUser.getPassword()) {
        throw { errMessage: passwordError, errno: 400 };
      }

      const isMatch = await bcrypt.compare(
        password,
        existingUser.getPassword()
      );
      if (!isMatch) throw { errMessage: passwordError, errno: 401 };

      if (existingUser.isVerified) {
        const token = getToken(existingUser);
        return new SuccessResponse({ token: token }, 200);
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
      return new SuccessResponse({}, 202);
    } catch (err: any) {
      err.message && log.error(`${err.message} | ${this.namespace}`);
      throw err;
    }
  };
}
