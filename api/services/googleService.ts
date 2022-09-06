import { authentication, googleAccount } from "../constants/errors";
import { IMailerOptions } from "../interfaces/IMailerOptions";
import { SuccessResponse } from "../helper/successResponse";
import { DBRepository } from "../repository/repository";
import { GoogleClient } from "../helper/googleClient";
import { autoInjectable } from "tsyringe";
import { User } from "../entities/User";
import { Mailer } from "./mailer";
import { log } from "../server";
import { BlobService } from "./blobService";
const getToken = require("../helper/getToken");
const config = require("../config/configurations");

@autoInjectable()
export class GoogleService {
  private namespace = "GoogleService";
  constructor(
    private repo: DBRepository<User>,
    private mailer: Mailer,
    private blob: BlobService
  ) {
    this.mailer.on(
      "send",
      async (options: IMailerOptions, namespace: string) => {
        await this.mailer.send(options, namespace);
      }
    );

    this.blob.on("update", async (id: string, mime: string) => {
      await this.updateMime(id, mime);
    });

    this.blob.on(
      "download",
      (namespace: string, folder: string, fileName: string, url: string) => {
        this.blob.download(namespace, folder, fileName, url);
      }
    );
  }

  google = async (token: string): Promise<SuccessResponse> => {
    let existingUser: User | null;
    try {
      const ticket = await GoogleClient.getInstance().verifyIdToken({
        idToken: token,
        audience: config.GOOGLE.clientID,
      });
      const { name, email, picture, email_verified } = ticket.getPayload();

      if (!name || !email || !email_verified)
        throw { errMessage: googleAccount, errno: 401 };

      existingUser = await this.repo.findOne(User, { email: email });

      if (!existingUser) {
        existingUser = new User(name, email, "", true, email_verified);
        existingUser.setVerificationCode();
        existingUser.setCodeExpiration();
        existingUser = await this.repo.create(existingUser);
        this.blob.emitDownload(
          this.namespace,
          `${config.BLOB.root}/${config.BLOB.user}`,
          existingUser.id,
          picture
        );
      }

      if (!existingUser.isActive)
        throw { errMessage: authentication, errno: 401 };

      token = getToken(existingUser);
      return new SuccessResponse({ token: token }, 200);
    } catch (err: any) {
      err.message && log.error(`${err.message} | ${this.namespace}`);
      throw err;
    }
  };

  private updateMime = async (id: string, mime: string) => {
    try {
      await this.repo.update(
        User,
        { id: id },
        {
          mime: mime,
        }
      );
    } catch (err: any) {
      await this.blob.unlink(
        this.namespace,
        `${config.BLOB.root}/${config.BLOB.user}`,
        id
      );
      err.message && log.error(`${err.message} | ${this.namespace}`);
    }
  };
}
