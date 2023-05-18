export const ironOptions = {
  cookieName: "webn3",
  password: process.env.SESSION_SECRET ?? "32 characters long secret",
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    ttl: 99 // seconds
  },
};

// Declaring a type for session object
declare module "iron-session" {
  interface IronSessionData {
    user?: {
      address: number;
      meta?: object;
    };
  }
}
