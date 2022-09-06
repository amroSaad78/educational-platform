import { log } from "../server";
import { User } from "../entities/User";
import { autoInjectable } from "tsyringe";
import { DBRepository } from "../repository/repository";
import { IMailerOptions } from "../interfaces/IMailerOptions";
import { Mailer } from "./mailer";
import { SuccessResponse } from "../helper/successResponse";
import { authentication, dublicatedEmail } from "../constants/errors";

@autoInjectable()
export class RegisterService {
  private namespace = "RegisterService";
  constructor(private repo: DBRepository<User>, private mailer: Mailer) {
    this.mailer.on(
      "send",
      async (options: IMailerOptions, namespace: string) => {
        await this.mailer.send(options, namespace);
      }
    );
  }
  register = async (user: User): Promise<SuccessResponse> => {
    let existingUser: User | null;

    try {
      existingUser = await this.repo.findOne(User, { email: user.email });

      if (!existingUser) {
        user = await this.repo.create(user);
        const options = this.mailer.getVerficationOptions(user);
        this.mailer.sendEmail(options, this.namespace);
        return new SuccessResponse({}, 201);
      }

      if (!existingUser.isActive)
        throw { errMessage: authentication, errno: 401 };
      if (existingUser.isVerified) {
        throw { errMessage: dublicatedEmail, errno: 400 };
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
