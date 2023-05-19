export type CryptoAddress = string;

export type LoginResponse = {
  token: string;
  error?: {
    message: string
  }
}

export type User = {
  address: string;
  meta?: object;
}

export type Payload = {
  address: CryptoAddress;
  message: string;
  signature: string;
}
