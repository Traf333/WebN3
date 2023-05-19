import { decodeAddress, signatureVerify } from '@polkadot/util-crypto';
import { u8aToHex } from '@polkadot/util';
import { CryptoAddress, Payload } from '@/types';
import { InjectedAccountWithMeta, InjectedExtension } from '@polkadot/extension-inject/types';

function toMessage(address: CryptoAddress) {
  return `Sign-in request for address ${address}.`;
}

export async function preparePayload(extension: InjectedExtension, account: InjectedAccountWithMeta) {
  const signRaw = extension?.signer?.signRaw;

  if (!signRaw) return;

  const { address } = account;
  const message = toMessage(address);
  try {
    const { signature } = await signRaw({
      address,
      data: message,
      type: 'bytes',
    });

    return { message, signature, address };
  } catch (e) {
    console.error(e);
  }
}

export function isValidPayload({ address, message, signature }: Payload) {
  if (!address || !message || !signature) return false;

  const publicKey = decodeAddress(address);
  const hexPublicKey = u8aToHex(publicKey);

  return signatureVerify(message, signature, hexPublicKey).isValid;
}

export function isValidAddress(address: CryptoAddress) {
  const alphanumeric = /^[a-zA-Z0-9]+$/;
  return alphanumeric.test(address);
}

