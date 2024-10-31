import axios from "axios";
import { to } from "../utils";

export class StripoHttpClient {
  constructor() {
    this.client = axios.create({
      baseURL:
        "https://try.readme.io/https://my.stripo.email/emailgeneration/v1",
      headers: {
        accept: "application/json",
        "Stripo-Api-Auth": process.env.STRIPO_TOKEN,
      },
    });
  }

  async validate() {
    const [error, response] = await to(this.client.get("/validate"));

    if (error) {
      throw error;
    }

    return response.data;
  }
}

export const stripoApi = new StripoHttpClient();
