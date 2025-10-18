import { Wallet, WalletStatus } from './wallet'

export class WalletRegistry {
  private walletsByName: Map<string, Wallet>
  private listeners: Set<() => void>

  constructor(initialWallets?: Wallet[]) {
    this.walletsByName = new Map()
    this.listeners = new Set()
    if (initialWallets) {
      for (const wallet of initialWallets) {
        this.addWallet(wallet)
      }
    }
  }

  addWallet(wallet: Wallet): void {
    this.walletsByName.set(wallet.getName(), wallet)
    this.notifyChange()
  }

  accessWallet(name: string): Wallet | undefined {
    return this.walletsByName.get(name)
  }

  getBalance(): number {
    let total = 0
    for (const wallet of this.walletsByName.values()) {
      total += wallet.getBalance()
    }
    return total
  }

  updateInflation(rate: number): void {
    for (const wallet of this.walletsByName.values()) {
      wallet.updateInflation(rate)
    }
    this.notifyChange()
  }

  listByStatus(status: WalletStatus): Wallet[] {
    return Array.from(this.walletsByName.values()).filter(w => w.getStatus() === status)
  }

  getTotalByStatus(status: WalletStatus): number {
    return this.listByStatus(status).reduce((sum, wallet) => sum + wallet.getBalance(), 0)
  }

  getTotalSpending(): number {
    return this.getTotalByStatus(WalletStatus.SPENDING)
  }

  getTotalSavings(): number {
    return this.getTotalByStatus(WalletStatus.SAVINGS)
  }

  subscribeChange(listener: () => void): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  private notifyChange(): void {
    for (const listener of this.listeners) {
      try { listener() } catch {}
    }
  }

  triggerRecompute(): void {
    this.notifyChange()
  }

  clear(): void {
    this.walletsByName.clear()
    this.notifyChange()
  }
}

// Shared instance example
export const walletRegistry = new WalletRegistry([
  new Wallet('Everyday Funds', 332.9),
  new Wallet('Subscriptions', 120.4),
  new Wallet('Salary', 58.1),
])


