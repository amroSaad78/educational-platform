import { IErrMessage } from "./IErrMessage";

export interface ICodeRequestError extends IErrMessage {
  verfErrorMessage?: string;
}
