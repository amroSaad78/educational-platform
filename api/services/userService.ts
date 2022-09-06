import { log } from "../server";
import { User } from "../entities/User";
import { autoInjectable } from "tsyringe";
import { DBRepository } from "../repository/repository";
import { SuccessResponse } from "../helper/successResponse";
import { dublicatedEmail } from "../constants/errors";

@autoInjectable()
export class UserService {
  private namespace = "UserService";
  constructor(private repo: DBRepository<User>) {}
  add = async (user: User): Promise<SuccessResponse> => {
    let existingUser: User | null;

    try {
      existingUser = await this.repo.findOne(User, { email: user.email });
      if (existingUser) throw { errMessage: dublicatedEmail, errno: 400 };
      user = await this.repo.create(user);
      return new SuccessResponse({ id: user.id }, 201);
    } catch (err: any) {
      err.message && log.error(`${err.message} | ${this.namespace}`);
      throw err;
    }
  };
}
