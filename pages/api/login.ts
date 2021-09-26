import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const key = "nextjs";

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.body) {
    return res.status(404).end("No Input");
  }

  const { username, password } = req.body;

  let token = jwt.sign(
    { username, admin: username == "admin" && password == "admin" },
    key
  );
  return res.status(200).json({ token });
};

export default login;
