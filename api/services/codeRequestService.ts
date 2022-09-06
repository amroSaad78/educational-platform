import { log } from "../server";
import { Mailer } from "./mailer";
import { User } from "../entities/User";
import { autoInjectable } from "tsyringe";
import { DBRepository } from "../repository/repository";
import { SuccessResponse } from "../helper/successResponse";
import * as errors from "../constants/errors";
import { IMailerOptions } from "../interfaces/IMailerOptions";

@autoInjectable()
export class CodeRequestService {
  private namespace = "CodeRequestService";
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
      if (existingUser.isVerified) {
        throw { errMessage: errors.verfiedEmail, errno: 400 };
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
      err.message && log.error(`${err.message} | ${this.namespace}`);
      throw err;
    }
  };
}
