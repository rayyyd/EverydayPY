export const walletLogos: Record<string, any> = {
  '@/assets/images/spending-salary.png': require('@/assets/images/spending-salary.png'),
  '@/assets/images/wallet-credit-card-asset.png': require('@/assets/images/wallet-credit-card-asset.png'),
}

export const resolveWalletLogo = (logoPath: string) =>
  walletLogos[logoPath] ?? walletLogos['@/assets/images/wallet-credit-card-asset.png']


