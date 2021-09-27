import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const key = "nextjs";

export default function (req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.body;
  const { admin } = jwt.verify(token, key) as { [key: string]: boolean };

  if (admin) {
    res.json({ secretAdminCode: 1234 });
  } else {
    res.json({ admin: false });
  }
}
