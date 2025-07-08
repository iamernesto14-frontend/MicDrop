export interface Auth {}

export interface LoginResponse {
  status: string;
  message: string;
  data: {
    user: {
      id: number;
      name: string;
      email: string;
      role: string;
      created_at: string;
    };
    token: string;
  };
}
