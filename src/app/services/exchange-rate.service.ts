import { Injectable, signal } from '@angular/core'
import { catchError, map, Observable, of } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { ExchangeRateData, Rates } from '../types'

@Injectable({
  providedIn: 'root',
})
export class ExchangeRateService {
  private apiUrl = 'https://api.exchangerate-api.com/v4/latest/'
  private ratesCache = signal<ExchangeRateData>({})

  constructor(private http: HttpClient) {}

  private getApiUrl(fromCurrency: string): string {
    return `${this.apiUrl}${fromCurrency}`
  }

  private updateExchangeRateCache(fromCurrency: string, rates: Rates): void {
    this.ratesCache.update((current) => ({
      ...current,
      [fromCurrency]: {
        ...current[fromCurrency],
        ...rates,
      },
    }))
  }

  public getRate(fromCurrency: string, toCurrency: string): Observable<number> {
    const targetExchangeRate = this.ratesCache()[fromCurrency]?.[toCurrency]

    if (targetExchangeRate) {
      return of(targetExchangeRate)
    }

    return this.http.get<{ rates: Rates }>(this.getApiUrl(fromCurrency)).pipe(
      map((response) => {
        const rates = response.rates

        this.updateExchangeRateCache(fromCurrency, rates)

        return rates[toCurrency]
      }),
      catchError((error) => {
        console.error('Error fetching exchange rates', error)
        return of(0)
      })
    )
  }

  public convertCurrency(
    firstAmount: number,
    fromCurrency: string,
    toCurrency: string
  ): number {
    let result: number = 0

    if (fromCurrency === toCurrency) {
      return firstAmount
    }

    this.getRate(fromCurrency, toCurrency).subscribe((rate) => {
      result = firstAmount * rate
    })

    return result
  }
}
