import { jwtDecode } from "jwt-decode";

export const encrypt = (data: unknown) => Buffer.from(JSON.stringify(data)).toString("base64");

export const decrypt = (data?: string) => {
  return data ? jwtDecode<SessionPayload>(Buffer.from(data, "base64").toString()) : undefined;
};

export type SessionPayload = {
  userId: string;
  email: string;
  name: string;
};
