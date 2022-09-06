import { Login } from "./login";

export class Register extends Login {
  constructor(name, email, password) {
    super(email, password);
    this.name = name;
  }
  name;
}
