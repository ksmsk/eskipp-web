import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { getToken } from "@shared/services/token";
import { ITopicEntriesResponse } from "@shared/data";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { query } = req;
    const [token, secret] = await getToken(req.headers["x-forwarded-for"]);

    const response = await axios.get<ITopicEntriesResponse>(
      `https://api.eksisozluk.com/v2/topic/${query.topicId}/search/${query.keyword}`,
      {
        params: { p: query.page },
        headers: {
          Authorization: `Bearer ${token}`,
          "Client-Secret": secret,
        },
      }
    );
    res.statusCode = response.status;
    res.send(response.data);
  } catch {
    await getToken(req.headers["x-forwarded-for"], true);
    res.statusCode = 500;
    res.send({ message: "Bir hata olustu" });
  }
};
