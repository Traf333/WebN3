import { unsealData } from "iron-session";
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from '@/lib/session';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(404).send('Page Not Found');
    return;
  }

  const token = req.headers.authorization?.split(" ")[1] ?? ""
  const data = await unsealData(token, {
    password: process.env.SESSION_SECRET!,
  });


  // const { user } = req.session;
  res.send({ secret: 'shmecret secret', user: data });
}

export default withIronSessionApiRoute(handler, ironOptions);
