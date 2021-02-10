import axios from "axios";
import { stringify } from "querystring";

let savedToken: string;

export async function getToken(forced?: boolean): Promise<string | null> {
  try {
    if (forced || !savedToken) {
      const payload = {
        "Api-Secret": process.env.API_SECRET,
        "Client-Secret": process.env.CLIENT_SECRET,
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        grant_type: "password",
      };

      const { data } = await axios.post(
        "https://api.eksisozluk.com/Token",
        stringify(payload),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      if (!data.access_token) {
        throw new Error();
      }
      savedToken = data.access_token;
    }
    return savedToken;
  } catch {
    return null;
  }
}
