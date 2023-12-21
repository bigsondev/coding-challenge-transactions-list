export const weiToEther = (weiValue?: string) => {
  if (!weiValue) {
    return '0.00';
  }

  const WEI_PER_ETH = BigInt(1e18);
  const wei = BigInt(weiValue);

  const ether = `${wei / WEI_PER_ETH}.${(wei % WEI_PER_ETH).toString().padStart(18, '0')}`;

  return parseFloat(ether).toFixed(2);
};
