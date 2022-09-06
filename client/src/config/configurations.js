import env from "react-dotenv";

export const config = {
  API_URL: `${env.SERVER_URL}/${env.API_VER}`,
  TOKEN_NAME: env.TOKEN_NAME,
  GOOGLE_CLIENT_ID: env.GOOGLE_CLIENT_ID,
};
