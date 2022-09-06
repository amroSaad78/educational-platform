import EventEmitter from "events";
import { injectable } from "tsyringe";
import { log } from "../server";
import { IMailerOptions } from "../interfaces/IMailerOptions";
import { User } from "../entities/User";
import { emailSubject } from "../constants/messages";
const config = require("../config/configurations");
const nodemailer = require("nodemailer");

@injectable()
export class Mailer extends EventEmitter {
  async send(options: IMailerOptions, namespace: string): Promise<boolean> {
    const transporter = nodemailer.createTransport(config.MAILER_TRANSPORTER);
    const mailOptions = {
      from: config.MAILER.from,
      to: options.to,
      subject: options.subject,
      html: options.html,
    };

    try {
      await transporter.sendMail(mailOptions);
      return true;
    } catch (err: any) {
      log.error(`${err.message} | ${namespace}`);
      return false;
    }
  }

  getVerficationOptions = (user: User) => {
    const options: IMailerOptions = {
      to: user.email,
      subject: emailSubject,
      html: `<p style="direction: rtl; font-size: x-large;">
          ${config.MAILER.centerName}<br>
          الكـود الخـاص بك هو 
          <span style="color: blue;">${user.getVerificationCode()}</span><br>
          هذا الكود صالح لمدة ساعة واحدة فقط.</p>`,
    };
    return options;
  };

  sendEmail = (options: IMailerOptions, namespace: string) =>
    this.emit("send", options, namespace);
}
