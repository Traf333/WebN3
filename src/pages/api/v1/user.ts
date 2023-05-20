import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from '@/lib/session';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(404).send('Page Not Found');
    return;
  }

  res.send({ user: req.session.user });
}

export default withIronSessionApiRoute(handler, ironOptions);
