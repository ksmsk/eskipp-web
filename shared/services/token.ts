import axios from "axios";
import { stringify } from "querystring";
import { v1 as uuid } from "uuid";

const savedTokens: Record<string, [string, string]> = {};

export async function getToken(
  ip: any = "generic",
  forced?: boolean
): Promise<[string, string] | null> {
  if (forced || !savedTokens[ip]) {
    const secret = uuid();
    const payload = {
      "Api-Secret": process.env.API_SECRET,
      "Client-Secret": secret,
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
    savedTokens[ip] = [data.access_token, secret];
    return savedTokens[ip];
  }
  return savedTokens[ip];
}
