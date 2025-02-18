import { expireDate } from "../../shared/utils/helpers";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { stringify } from "querystring";
import { setCookie } from "nookies";
import { v1 as uuid } from "uuid";

export default async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    const payload = {
      "Api-Secret": process.env.API_SECRET,
      "Client-Secret": uuid(),
    };

    const response = await axios.post(
      "https://api.eksisozluk.com/v2/account/anonymoustoken",
      stringify(payload),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    setCookie({ res }, "auth_token", response.data.Data.access_token, {
      path: "/",
      expires: expireDate(response.data.Data.expires_in),
      sameSite: true,
    });

    res.statusCode = 200;
    res.json({ message: "Misafir girişi yapıldı." });
  } catch {
    res.statusCode = 500;
    res.send({ message: "Misafir girişi yapılamadı." });
  }
};
