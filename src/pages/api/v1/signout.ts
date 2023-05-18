import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from '@/lib/session';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    res.status(404).send("Page Not Found");
    return;
  }
  await req.session.destroy();
  res.send({ data: req.session.user });
}

export default withIronSessionApiRoute(handler, ironOptions);
