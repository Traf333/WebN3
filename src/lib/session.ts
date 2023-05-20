import { User } from '@/types';

export const ironOptions = {
  cookieName: 'webn3',
  password: process.env.SESSION_SECRET!,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    ttl: 10 * 60, // 10 minutes
  },
};

// Declaring a type for session object
declare module 'iron-session' {
  interface IronSessionData {
    user?: User;
  }
}
