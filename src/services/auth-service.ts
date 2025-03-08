import { reverse } from "@/lib/session";

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
  private static endpoint = "http://localhost:3333/api/auth";

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
}
