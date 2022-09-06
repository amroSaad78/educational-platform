class Validate {
  constructor() {
    this._error = {};
  }

  result() {
    return this._error;
  }

  reset() {
    this._error = {};
    return this;
  }

  required(value, errorName, message) {
    if (value?.trim() === "") this._error[errorName] = message;
    return this;
  }

  between(value, min, max, errorName, message) {
    let length = value?.trim()?.length;
    if (!(length >= min && length <= max)) this._error[errorName] = message;
    return this;
  }

  isValidEmail(value, errorName, message) {
    const reg =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!reg.test(value.trim())) this._error[errorName] = message;
    return this;
  }

  isValidTel(value, errorName, message) {
    const reg =
      /^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/im;
    if (!reg.test(value.trim())) this._error[errorName] = message;
    return this;
  }

  isValidLength(value, length, errorName, message) {
    if (value?.trim()?.length !== length) this._error[errorName] = message;
    return this;
  }

  isNumbersOnly(value, errorName, message) {
    const reg = /^\d+$/;
    if (!reg.test(value.trim())) this._error[errorName] = message;
    return this;
  }

  isSecure(value, errorName, message) {
    const reg = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    if (!reg.test(value.trim())) this._error[errorName] = message;
    return this;
  }

  isEqual(value1, value2, errorName, message) {
    if (value1?.trim() !== value2?.trim()) this._error[errorName] = message;
    return this;
  }
}

const Validator = new Validate();
export { Validator };
