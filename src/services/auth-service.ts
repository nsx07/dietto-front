import { reverse } from "@/lib/session";
import { headers } from "next/headers";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

export interface IpInfo {
  ip: string;
  hostname: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  postal: string;
  timezone: string;
}

export class AuthService {
  private static endpoint = process.env.NEXT_PUBLIC_API_URL + "/auth";

  private static async getIp() {
    return await fetch("https://ipinfo.io/json").then((response) => response.json() as Promise<IpInfo>);
  }

  static async login(data: LoginRequest) {
    return fetch(`${AuthService.endpoint}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Origin-IP": await this.getIp().then((ipInfo: IpInfo) => reverse(Buffer.from(JSON.stringify(ipInfo)).toString("base64"))),
      },
      body: JSON.stringify(data),
    }).then((response) => response.json());
  }

  static async signUp(data: SignUpRequest) {
    return fetch(`${AuthService.endpoint}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => response.json());
  }

  static async sendResetPassword(email: string) {
    const _headers = await headers();
    const origin = _headers.get("origin");

    const hders = {
      "Content-Type": "application/json",
      origin: origin,
    };

    return fetch(`${AuthService.endpoint}/send-reset-password`, {
      method: "POST",
      headers: hders as HeadersInit,
      body: JSON.stringify({ email }),
    }).then((response) => response.json());
  }

  static async resetPassword(token: string, password: string, newPassword: string) {
    return fetch(`${AuthService.endpoint}/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, password, newPassword }),
    }).then((response) => response.json());
  }
}
