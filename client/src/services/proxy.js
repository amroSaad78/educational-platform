import axiosController from "../services/abortController";
import { noConnection } from "../constants/errors";
import { config } from "../config/configurations";
const axios = require("axios");

export class Proxy {
  static async PostJsonData(url, payload) {
    let postUrl = `${config.API_URL}/${url}`;
    try {
      const result = await axios.post(postUrl, JSON.stringify(payload), {
        signal: axiosController.signal(),
        headers: this.#GetHeader("application/json"),
      });
      return result.data;
    } catch (error) {
      console.log(error);
      if (error.code === "ERR_CANCELED") return undefined;
      return error.response.data ?? { errMessage: noConnection };
    }
  }

  static async GetData(url) {
    let getUrl = `${config.API_URL}/${url}`;
    try {
      const result = await axios.get(getUrl, {
        headers: this.#GetHeader("application/json"),
      });
      return result.data;
    } catch (error) {
      return error.response.data ?? { errMessage: noConnection };
    }
  }

  static #GetHeader(contentType) {
    const auth = "Bearer " + (localStorage.getItem(config.TOKEN_NAME) ?? "");
    return { "Content-type": contentType, Authorization: auth };
  }
}
