const base64 = require("base-64");
const utf8 = require("utf8");

export class Basic {
  constructor(email) {
    this.email = base64.encode(utf8.encode(email));
  }
  email;
}
