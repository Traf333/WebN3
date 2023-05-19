export type CryptoAddress = string;

export type LoginResponse = {
  token?: string;
  error?: {
    message: string
  }
}
