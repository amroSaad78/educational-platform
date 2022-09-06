import { autoInjectable } from "tsyringe";

@autoInjectable()
export class ValidationService {
  private _error: any;
  constructor() {
    this._error = {};
  }

  result() {
    return this._error;
  }

  required(value: string, errorName: string, message: string) {
    if (value?.trim() === "") this._error[errorName] = message;
    return this;
  }

  between(
    value: string,
    min: number,
    max: number,
    errorName: string,
    message: string
  ) {
    let length = value?.trim()?.length;
    if (!(length >= min && length <= max)) this._error[errorName] = message;
    return this;
  }

  isValidEmail(value: string, errorName: string, message: string) {
    const reg =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!reg.test(value.trim())) this._error[errorName] = message;
    return this;
  }

  isValidTel(value: string, errorName: string, message: string) {
    const reg =
      /^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/im;
    if (!reg.test(value.trim())) this._error[errorName] = message;
    return this;
  }

  isValidLength(
    value: string,
    length: number,
    errorName: string,
    message: string
  ) {
    if (value?.trim()?.length !== length) this._error[errorName] = message;
    return this;
  }

  isNumbersOnly(value: string, errorName: string, message: string) {
    const reg = /^\d+$/;
    if (!reg.test(value.trim())) this._error[errorName] = message;
    return this;
  }

  isSecure(value: string, errorName: string, message: string) {
    const reg = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    if (!reg.test(value.trim())) this._error[errorName] = message;
    return this;
  }

  isEqual(value1: string, value2: string, errorName: string, message: string) {
    if (value1?.trim() !== value2?.trim()) this._error[errorName] = message;
    return this;
  }

  isIncluded(
    value: string,
    values: string[],
    errorName: string,
    message: string
  ) {
    if (!values.includes(value?.trim())) this._error[errorName] = message;
    return this;
  }
}
