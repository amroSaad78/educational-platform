import { ICodeRequestError } from "./ICodeRequestError";

export interface ICodeVerficationError extends ICodeRequestError {
  verfCodeErr?: string;
}
