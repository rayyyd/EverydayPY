import { Wallet, WalletStatus, WalletType } from './wallet'
import { WalletRegistry } from './accounts'
import { inflateRate, getConversionRate, resetInflation as resetInflationRate } from './PYUSD'
// UI reload event bus (UI-only; avoids full app reload)


// Create an account (registry) and seed with the requested wallets
export const demoRegistry = new WalletRegistry()

export function initDemoRegistry() {
    demoRegistry.addWallet(new Wallet('Everyday Spending', 430.31, WalletType.CASH, WalletStatus.SPENDING))
    demoRegistry.addWallet(new Wallet('Salaries', 1344.43, WalletType.CASH, WalletStatus.SPENDING, '@/assets/images/spending-salary.png'))
    demoRegistry.addWallet(new Wallet('Savings Jar', 5673.98, WalletType.CASH, WalletStatus.SAVINGS))
    demoRegistry.addWallet(new Wallet('Canada Trip', 7500.00, WalletType.PYUSD, WalletStatus.SAVINGS))
    demoRegistry.addWallet(new Wallet('New Car', 21445.34, WalletType.PYUSD, WalletStatus.SAVINGS))
}

export function inflate(rate: number) : void {  //e.g. rate is 1.05 for 5% inflation
    inflateRate(rate)
    demoRegistry.updateInflation(rate)
    triggerUIReload()
}

export { getConversionRate }
type UiReloadListener = () => void
const uiReloadListeners: Set<UiReloadListener> = new Set()
export function subscribeUIReload(listener: UiReloadListener): () => void {
    uiReloadListeners.add(listener)
    return () => uiReloadListeners.delete(listener)
}
export const triggerWalletsRecompute = () => { triggerUIReload() }
export function triggerUIReload(): void {
    for (const listener of uiReloadListeners) {
        try { listener() } catch {}
    }
}
export function resetInflation(): void {
    resetInflationRate()
    // Clear and reinitialize the registry to reset wallet balances
    demoRegistry.clear()
    initDemoRegistry()
    triggerUIReload()
}

// Seed registry on module load so UI has data immediately
initDemoRegistry()