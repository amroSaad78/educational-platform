import { IErrMessage } from "./IErrMessage";

export interface ILoginError extends IErrMessage {
  loginEmailErr?: string;
  loginPasswordErr?: string;
}
