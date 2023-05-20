import { unsealData } from 'iron-session';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from '@/lib/session';
import { NextApiRequest, NextApiResponse } from 'next';
import { randomSecret } from '@/lib/utils';
import { User } from '@/types';

// obtaining address adds compatibility for both
// 1. direct requests to api
// 2. access from frontend app with encrypted session
async function obtainAddress(req: NextApiRequest): Promise<string> {
  if (req.session.user != null) return Promise.resolve(req.session.user.address);

  const token = req.headers.authorization?.split(' ')[1] ?? '';
  const { address }: User = await unsealData(token, {
    password: process.env.SESSION_SECRET!,
  });
  return address;
}

let Database: Record<string, string> = {};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(404).send('Page Not Found');
    return;
  }

  const address = await obtainAddress(req);

  if (!address) {
    res.status(401).send({ error: { message: 'Unauthorized' } });
    return;
  }
  Database[address] = Database[address] ?? randomSecret();
  res.send({ secret: Database[address], address });
}

export default withIronSessionApiRoute(handler, ironOptions);
