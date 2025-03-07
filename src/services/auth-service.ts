export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

export class AuthService {
  private static endpoint = "http://localhost:3333/api/auth";

  static login(data: LoginRequest) {
    return fetch(`${AuthService.endpoint}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  static signUp(data: SignUpRequest) {
    return fetch(`${AuthService.endpoint}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
}
