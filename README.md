# Simoleon SDK

JavaScript SDK to integrate Simoleon Coin (SIM) payments into any web app or DApp.

## Features
- Convert fiat to SIM tokens based on real-time exchange rate
- Send SIM from user to merchant wallet
- MetaMask / Ethereum wallet compatible

## Usage

```bash
npm install ethers
```

```js
import { checkoutWithSimoleon } from './index.js';

checkoutWithSimoleon({
  recipient: '0xMerchantWallet...',
  amountFiat: 10.00,
  fiatCurrency: 'USD',
  onComplete: () => alert('Payment complete'),
  onError: (err) => console.error(err)
});
```

## Coming Soon
- Coinbase Wallet support
- Face ID confirmation with supported wallets
- Auto conversion from BTC, ETH, or fiat

---
© Simoleon Labs
