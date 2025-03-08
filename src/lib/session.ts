import { jwtDecode, JwtPayload } from "jwt-decode";

export const reverse = (str: string) => str.split("").reverse().join("");

export const encrypt = (data: unknown) => reverse(Buffer.from(JSON.stringify(data)).toString("base64"));

export const decrypt = (data?: string) => {
  return data ? jwtDecode<SessionPayload>(Buffer.from(reverse(data), "base64").toString()) : undefined;
};

export type SessionPayload = JwtPayload & {
  userId: string;
  email: string;
  name: string;
};
