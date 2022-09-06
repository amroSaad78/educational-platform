import { Basic } from "./basic";

const base64 = require("base-64");
const utf8 = require("utf8");

export class Verfication extends Basic {
  constructor(email, code) {
    super(email);
    this.code = base64.encode(utf8.encode(code));
  }
  code;
}
