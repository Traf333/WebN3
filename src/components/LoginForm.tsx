import { FormEvent, useState } from 'react';
import { InjectedAccountWithMeta, InjectedExtension } from '@polkadot/extension-inject/types';
import { shortenAddress } from '@/lib/utils';
import { preparePayload } from '@/lib/payload';
import { LoginResponse } from '@/types';
import { post } from '@/lib/http';

type Props = {
  extension: InjectedExtension;
  accounts: InjectedAccountWithMeta[];
  onSubmit: (account: InjectedAccountWithMeta) => void;
}

export function LoginForm({ accounts, onSubmit, extension }: Props) {
  const [selectedAccount, setSelectedAccount] = useState(accounts[0]);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const payload = await preparePayload(extension, selectedAccount);

    if (!payload) {
      setError('Signature was cancelled from the extension or extension was turned off, please check that the extension is enabled');
      return;
    }

    const res = await post('/api/v1/signin', payload);

    const { token, error }: LoginResponse = await res.json();
    // might store token and use it with API, but we also have stored session already
    // and do not need to use it within app
    if (error) {
      setError(error.message);
      return;
    }

    onSubmit(selectedAccount);
  };

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Please, sign in to get the Secret
      </h2>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="/api/v1/signin" method="POST" onSubmit={handleSubmit}>
          <div>
            <h3 className="block text-sm font-medium leading-6 text-gray-900 text-center">
              Select one of your addresses from the extension
            </h3>
            {error && (
              <p className="text-red-700 my-4">{error}</p>
            )}
            {accounts.map((account) => (
              <div className="flex items-center mt-4" key={account.address}>
                <input
                  id={account.address}
                  type="radio"
                  value={account.address}
                  onChange={() => setSelectedAccount(account)}
                  checked={account.address === selectedAccount.address}
                  name="address"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                />
                <label
                  htmlFor={account.address}
                  className="ml-2 text-sm font-medium text-gray-900"
                >
                  {shortenAddress(account.address)} <small className="text-gray-500">({account.meta.source})</small>
                </label>
              </div>
            ))}
          </div>
          <div>
            <button
              type="submit"
              disabled={!selectedAccount}
              className="flex w-full justify-center disabled:bg-gray-400 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
