import { CashToPYUSD, PYUSDToCash } from "./PYUSD"

export enum WalletType {
    CASH = 'cash',
    PYUSD = 'pyusd',
}

export enum WalletStatus {
    SAVINGS = 'savings',
    SPENDING = 'spending',
}

export class Wallet {
  private name: string
  private balance: number
  private type: WalletType
  private status: WalletStatus
  private transactions: Map<string, number>
  private logoPath: string
  /**
   * Constructs a new Wallet. Input/output is always in cash units.
   * 
   * @param name - The name of the wallet.
   * @param initialBalance - The starting amount in the wallet, always specified in cash units, regardless of wallet type.
   * @param type - The type of the wallet (WalletType.CASH or WalletType.PYUSD). Defaults to CASH.
   * @param status - The status of the wallet (WalletStatus.SAVINGS or WalletStatus.SPENDING). Defaults to SPENDING.
   * @param logoPath - Optional path to the wallet's logo image.
   */
  constructor(name: string, initialBalance: number = 0, isCash: WalletType = WalletType.CASH, status: WalletStatus = WalletStatus.SPENDING, logoPath: string = "@/assets/images/wallet-credit-card-asset.png") {
    
    this.name = name
    this.type = isCash
    this.status = status
    this.transactions = new Map()
    this.logoPath = logoPath
    if (this.type === WalletType.CASH) {
        this.balance = initialBalance
    } else {
        this.balance = CashToPYUSD(initialBalance)
    }
  }

  getName(): string {
    return this.name
  }

  getType(): WalletType {
    return this.type
  }

  getStatus(): WalletStatus {
    return this.status
  }

  getBalance(): number { // always returns cash amount.
    if (this.type === WalletType.CASH) {
        return this.balance
    } else {
        return PYUSDToCash(this.balance)
    }

  }

  getLogoPath(): string {
    return this.logoPath
  }

  // always deposits in cash units.
  deposit(cashAmount: number): boolean {
    if (cashAmount <= 0) return false
    if (this.type === WalletType.CASH) {
        this.balance += cashAmount
    } else {
        this.balance += CashToPYUSD(cashAmount)
    }
    this.transactions.set("Deposit", cashAmount)
    return true
  }

  // always withdraws in cash units.
  withdraw(cashAmount: number): boolean {
    if (cashAmount <= 0 || cashAmount > this.balance) return false
    if (this.type === WalletType.CASH) {
        this.balance -= cashAmount
    } else {
        this.balance -= CashToPYUSD(cashAmount)
    }
    this.transactions.set("Withdrawal", -1 * cashAmount)
    return true
  }

  updateInflation(rate: number): boolean {
    if (this.type === WalletType.CASH) return false
    // record how much money was gained from inflation.
    this.transactions.set("Inflation", (rate - 1) * PYUSDToCash(this.balance))
    return true
  }

  transfer(cashAmount: number, to: Wallet): boolean {
    if (cashAmount <= 0 || cashAmount > this.balance) return false
    this.withdraw(cashAmount)
    to.deposit(cashAmount)
    return true
  }

  getTransactions(): Map<string, number> {
    return this.transactions
  }
}


