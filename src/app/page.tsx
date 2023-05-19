'use client';

import { useEffect, useState } from 'react';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import { LoginForm } from '@/components/LoginForm';
import Link from 'next/link';
import { destroy, get } from '@/lib/http';
import { User } from '@/types';
import { InjectedAccountWithMeta, InjectedExtension } from '@polkadot/extension-inject/types';

async function getUser(): Promise<User> {
  const res = await get('/api/v1/user');
  const { user } = await res.json();
  return user;
}

export default function Home() {
  const [extension, setExtensions] = useState<InjectedExtension | undefined>();
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[] | undefined>();
  const [user, setUser] = useState<User | null>(null);

  const init = async () => {
    const extensions = await web3Enable('webn3');
    const extension = extensions.find((e) => e.name === 'polkadot-js');
    const [accounts, user] = await Promise.all([
      web3Accounts(),
      getUser(),
    ]);

    setExtensions(extension);
    setAccounts(accounts);
    setUser(user);
  };

  useEffect(() => {
    init();
  }, []);

  const logout = async () => {
    await destroy('/api/v1/signout');

    // hard reload would be better option for bigger app
    setUser(null);
  };

  if (!extension && !accounts) return <h2>Loading...</h2>;

  const readyToLogin = accounts!.length > 0 && !user;

  return (
    <div className="text-center">
      <h1 className="text-4xl mb-4 mt-8">Welcome to WebN3</h1>
      <h2 className="text-xl text-gray-500">
        The app which help you to entry to Web3 with your famous extension <br />
        <small>(currently supported only Polkadot extension)</small>
      </h2>
      <div className="mt-8">
        {!extension && (
          <div>
            It seems you do not have Polkadot extension yet. Please setup one by following
            <a href="https://polkadot.js.org/extension/">the link</a>
            and try to refresh page once you have installed it
          </div>
        )}
        {accounts!.length === 0 && (
          <div>It seems you do not have any accounts yet. Probably you have to create one with Polkadot extension.
            Please create one by following
            <a
              href="https://support.polkadot.network/support/solutions/articles/65000098878-how-to-create-a-dot-account"
            >
              the link
            </a> and try to refresh page once you have created it
          </div>
        )}
        {user && (
          <div>
            <div>Hi user with address: <code>{user.address}</code></div>
            <div className="mt-4 flex gap-4 justify-center">
              <Link href="/secret" className="font-medium text-blue-600 hover:underline">
                Go to Secrets page
              </Link>
              <span>|</span>
              <button onClick={logout} className="font-medium text-blue-600 hover:underline"  >
                Logout
              </button>
            </div>
          </div>
        )}
        {readyToLogin && <LoginForm accounts={accounts!} onSubmit={setUser} extension={extension!} />}
      </div>
    </div>
  );
}
