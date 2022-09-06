import { Basic } from "./basic";
const base64 = require("base-64");
const utf8 = require("utf8");

export class Login extends Basic {
  constructor(email, password) {
    super(email);
    this.password = base64.encode(utf8.encode(password));
  }
  password;
}
