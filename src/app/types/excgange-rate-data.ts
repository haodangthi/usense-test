import { Rates } from './rates'

export interface ExchangeRateData {
  [currency: string]: Rates
}
