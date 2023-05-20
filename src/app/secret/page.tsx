'use client';
import { get } from '@/lib/http';
import { useEffect, useState } from 'react';
import { LoadingOverlay } from '@/components/LoadingOverlay';
import { Unauthorized } from '@/components/Unauthorized';
import Link from 'next/link';

type SecretState = {
  secret: string;
  address: string;
}

export default function SecretPage() {
  const [data, setData] = useState<SecretState>();
  const [error, setError] = useState('');

  const init = async () => {
    const res = await get('/api/v1/secret');
    if (res.status !== 200) {
      setError('Unauthorized');
    }
    setData(await res.json());
  };

  useEffect(() => {
    init()
  }, []);

  if (!data) return <LoadingOverlay />;

  if (error) return <Unauthorized />;

  return (
    <div className="m-auto max-w-3xl text-center">
      <h1 className="text-4xl mb-4 mt-8">Secret Page</h1>
      <h2 className="text-xl text-gray-500">
        Now you can see secret for address {data.address}
      </h2>
      <div className="bg-amber-100 p-2 mt-8">
        <code>{data.secret}</code>
      </div>
      <div className="mt-4 flex gap-4 justify-center">
        <Link href="/" className="font-medium text-blue-600 hover:underline">
          Go Back
        </Link>
      </div>
    </div>
  );
}
