import { Register } from "./register";

export class User extends Register {
  constructor(name, email, password, tel, identity, role) {
    super(name, email, password);
    this.tel = tel;
    this.role = role;
    this.identity = identity;
  }
  tel;
  role;
  identity;
}
