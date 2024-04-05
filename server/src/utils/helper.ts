import jwt from "jsonwebtoken";

export function createJWT(id: string) {
  return jwt.sign({ id }, process.env.JWT_STRING);
}
