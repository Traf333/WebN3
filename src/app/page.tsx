'use client';

import { useEffect, useState } from 'react';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import { InjectedAccountWithMeta, InjectedExtension } from '@polkadot/extension-inject/types';
import { LoginForm } from '@/components/LoginForm';

export default function Home() {
  const [extensions, setExtensions] = useState<InjectedExtension[] | null>(null);
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[] | null>(null);

  const init = async () => {
    const extensions = await web3Enable('webn3');
    const accounts = await web3Accounts();
    setExtensions(extensions);
    setAccounts(accounts);
  };

  useEffect(() => {
    init();
  }, []);

  if (!extensions && !accounts) return <h2>Loading...</h2>;

  if (extensions!.length === 0) return (
    <h2>No extension</h2>
  );

  if (accounts!.length === 0) return (
    <h2>No accounts</h2>
  );

  return <LoginForm accounts={accounts} />;
}
