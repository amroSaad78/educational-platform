import { Column, Entity } from "typeorm";
import { Roles } from "../constants/enums";
import { BaseModel } from "../repository/baseModel";
const getUTCDate = require("../helper/getUTCDate");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

@Entity({ name: "users" })
export class User extends BaseModel {
  constructor(
    name: string,
    email: string,
    password: string,
    isActive: boolean = true,
    isVerified: boolean = false,
    tel: string = "",
    identity: string = "",
    role: Roles = Roles.TRAINEE
  ) {
    super();
    (this.name = name),
      (this.email = email),
      (this.password = password),
      (this.tel = tel),
      (this.role = role),
      (this.identity = identity),
      (this.isActive = isActive),
      (this.isVerified = isVerified);
  }

  @Column({ type: "nvarchar", length: 50, nullable: false })
  public name: string;

  @Column({ type: "varchar", length: 50, nullable: false, unique: true })
  public email: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  private password: string;

  @Column({ type: "nvarchar", length: 11, nullable: true })
  public tel: string;

  @Column({ type: "nvarchar", length: 10, nullable: true })
  public identity: string;

  @Column({ type: "bool", default: true })
  public isActive: boolean;

  @Column({ type: "bool", default: false })
  public isVerified: boolean;

  @Column({ type: "enum", enum: Roles, default: Roles.TRAINEE })
  public role: Roles;

  @Column({ type: "nvarchar", length: 12, nullable: true })
  private verificationCode: string | undefined;

  @Column({ type: "datetime", nullable: true })
  private codeExpiration: Date | undefined;

  @Column({ type: "varchar", length: 16, nullable: true })
  public mime: string | undefined;

  async encryptPassword() {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
  }

  setVerificationCode() {
    this.verificationCode = crypto.randomBytes(6).toString("hex");
  }

  setCodeExpiration() {
    this.codeExpiration = getUTCDate(1, 0, 0);
  }

  getVerificationCode = () => this.verificationCode;
  getCodeExpiration = () => this.codeExpiration;
  getPassword = () => this.password;
}
