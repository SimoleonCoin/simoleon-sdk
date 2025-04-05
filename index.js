import { ethers } from 'ethers';

/**
 * Initiates a Simoleon Checkout payment.
 * @param {Object} options - Payment options
 * @param {string} options.recipient - Wallet address of the merchant
 * @param {number} options.amountFiat - Amount in fiat (e.g., USD)
 * @param {string} options.fiatCurrency - Currency code (e.g., 'USD')
 * @param {Function} options.onComplete - Callback after payment success
 * @param {Function} options.onError - Callback on error
 */
export async function checkoutWithSimoleon({
  recipient,
  amountFiat,
  fiatCurrency,
  onComplete,
  onError
}) {
  try {
    const res = await fetch(`https://api.simoleon.dev/rate?currency=${fiatCurrency}`);
    const { rate } = await res.json();
    const simAmount = ethers.utils.parseUnits((amountFiat / rate).toFixed(18), 18);

    if (!window.ethereum) throw new Error('No crypto wallet found');
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const simTokenAddress = '0x8D672f2CEd8dBD614582a37709276713707e16Cc';
    const simAbi = ["function transfer(address to, uint amount) public returns (bool)"];
    const simContract = new ethers.Contract(simTokenAddress, simAbi, signer);
    const tx = await simContract.transfer(recipient, simAmount);
    await tx.wait();

    onComplete && onComplete();
  } catch (error) {
    console.error(error);
    onError && onError(error);
  }
}
