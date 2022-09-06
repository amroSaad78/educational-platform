import { IErrMessage } from "./IErrMessage";

export interface IRegistrationError extends IErrMessage {
  nameErr?: string;
  regEmailErr?: string;
  regPasswordErr?: string;
}
