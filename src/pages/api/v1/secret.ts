import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from '@/lib/session';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(404).send('Page Not Found');
    return;
  }

  const { user } = req.session;
  res.send({ data: { secret: 'secret' } });
}

export default withIronSessionApiRoute(handler, ironOptions);
