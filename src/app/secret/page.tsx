'use client';
import { get } from '@/lib/http';
import React, { useEffect, useState } from 'react';
import { LoadingOverlay } from '@/components/LoadingOverlay';
import Link from 'next/link';
import { Unauthorized } from '@/components/Unauthorized';

type SecretState = {
  secret: string;
  address: string;
  error?: { message: string }
}

async function fetchSecret(): Promise<SecretState> {
  const res = await get('/api/v1/secret');
  return await res.json();
}

export default async function SecretPage() {
  const [data, setData] = useState<SecretState>();

  useEffect(() => {
    fetchSecret().then(setData);
  }, []);

  if (!data) return <LoadingOverlay />;

  if (data.error) return <Unauthorized />;

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
