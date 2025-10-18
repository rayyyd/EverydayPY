const DEFAULT_CONVERSION_RATE = 3.43
export let conversionRate = DEFAULT_CONVERSION_RATE

export function getConversionRate(): number {
  return conversionRate
}

export function inflateRate(rate: number) : void {  //e.g. rate is 1.05 for 5% inflation
    conversionRate = conversionRate * rate
}

export function resetInflation(): void {
  conversionRate = DEFAULT_CONVERSION_RATE
}
export function PYUSDToCash(pyusd: number): number {
    return pyusd * conversionRate
}
export function CashToPYUSD(cash: number): number {
    return cash / conversionRate
}