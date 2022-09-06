const { OAuth2Client } = require("google-auth-library");
const config = require("../config/configurations");

export class GoogleClient {
  private static instance: typeof GoogleClient;
  constructor() {
    throw new Error(
      "Cannot initialize singleton class using new. Use OauthClient.getInstance instead"
    );
  }
  static getInstance = (): typeof OAuth2Client => {
    if (!GoogleClient.instance) {
      this.instance = new OAuth2Client(config.GOOGLE.clientID);
    }
    return GoogleClient.instance;
  };
}
