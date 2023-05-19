'use client';
import { get } from '@/lib/http';
import { useEffect, useState } from 'react';

type SecretState = {
  secret: string;
  address: string;
}

async function fetchSecret(): Promise<SecretState> {
  // await new Promise(resolve => setTimeout(resolve, 3000)); // 3 sec
  const res = await get('/api/v1/secret');

  return await res.json();
}

export default async function SecretPage() {
  const [data, setData] = useState<SecretState>();

  useEffect(() => {
    fetchSecret().then(setData);
  }, []);


  if (!data) return (
    <div>Please login to see the secret</div>
  );

  return (
    <div>
      <h3>Hover to see secret for address {data.address}:</h3>
      <div
        className="text-transparent font-black hover:text-slate-800 ml-4 px-4 bg-slate-800 hover:bg-transparent select-none"
      >
        {data.secret}
      </div>
    </div>
  );
}
