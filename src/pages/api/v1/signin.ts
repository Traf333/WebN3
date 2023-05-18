import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from '@/lib/session';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(404).send('Page Not Found');
    return;
  }
  let { address } = req.body;
  req.session.user = { address };
  await req.session.save();

  res.send({ data: req.body });
}

export default withIronSessionApiRoute(handler, ironOptions);
