import { CryptoAddress } from '@/types';

import { decodeAddress, signatureVerify } from '@polkadot/util-crypto';
import { u8aToHex } from '@polkadot/util';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { web3FromSource } from '@polkadot/extension-dapp';

type Payload = {
  address: CryptoAddress;
  message: string;
  signature: string;
}

function toMessage(address: CryptoAddress) {
  return `Sign-in request for address ${address}.`;
}

export async function preparePayload(account: InjectedAccountWithMeta) {
  const injector = await web3FromSource(account.meta.source);

  // this injector object has a signer and a signRaw method
  // to be able to sign raw bytes
  const signRaw = injector?.signer?.signRaw;

  if (!signRaw) return;

  const { address } = account;
  const message = toMessage(address);

  const { signature } = await signRaw({
    address,
    data: message,
    type: 'bytes',
  });

  return { message, signature, address };
}

export function isValidPayload({ address, message, signature }: Payload) {
  const publicKey = decodeAddress(address);
  const hexPublicKey = u8aToHex(publicKey);

  return signatureVerify(message, signature, hexPublicKey).isValid;
}

export function isValidAddress(address: CryptoAddress) {
  const alphanumeric = /^[a-zA-Z0-9]+$/;
  return alphanumeric.test(address);
}

