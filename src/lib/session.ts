import { jwtDecode } from "jwt-decode";

export const encrypt = (data: unknown) => Buffer.from(JSON.stringify(data)).toString("base64");

export const decrypt = (data?: string) => (data ? jwtDecode<SessionPayload>(data) : undefined);

export type SessionPayload = {
  userId: string;
  email: string;
};
