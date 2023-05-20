import { mnemonicGenerate } from '@polkadot/util-crypto';

export function shortenAddress(address: string) {
  return `${address.slice(0, 4)}****${address.slice(-5)}`;
}

export function randomSecret() {
  return mnemonicGenerate(12);
}
