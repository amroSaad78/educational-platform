import { config } from "../config/configurations";
import { Reset } from "./types";

export function logout() {
  localStorage.removeItem(config.TOKEN_NAME);
  return { type: Reset.AllReducers };
}
