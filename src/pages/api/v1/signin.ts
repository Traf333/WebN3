import { sealData } from 'iron-session';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from '@/lib/session';
import { isValidAddress, isValidPayload } from '@/lib/payload';
import type { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(404).send('Page Not Found');
    return;
  }

  const { address, message, signature } = req.body;

  if (!isValidAddress(address)) {
    res.status(400).send({ error: { message: 'Given address is not alphanumeric' } });
    return;
  }

  if (!isValidPayload({ address, message, signature })) {
    res.status(400).send({ error: { message: 'Given payload is not valid' } });
    return;
  }

  req.session.user = { address };
  await req.session.save();

  const token = await sealData({ address }, { password: process.env.SESSION_SECRET! });

  res.send({ token });
}

export default withIronSessionApiRoute(handler, ironOptions);
