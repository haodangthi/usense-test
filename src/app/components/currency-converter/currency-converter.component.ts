import { Component, computed, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { MatCardModule } from '@angular/material/card'
import { ExchangeRateService } from '../../services/exchange-rate.service'
import { NgForOf } from '@angular/common'
import { CURRENCIES } from '../../constants'

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    NgForOf,
    FormsModule,
  ],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.scss',
})
export class CurrencyConverterComponent {
  public currencies = CURRENCIES

  firstCurrency = signal<string>('USD')
  firstAmount = signal<number>(0)
  firstAmountComputed = computed<number>((): number => {
    return this.exchangeRateService.convertCurrency(
      this.secondAmount(),
      this.secondCurrency(),
      this.firstCurrency()
    )
  })

  secondCurrency = signal<string>('UAH')
  secondAmount = signal<number>(0)
  secondAmountComputed = computed<number>((): number =>
    this.exchangeRateService.convertCurrency(
      this.firstAmount(),
      this.firstCurrency(),
      this.secondCurrency()
    )
  )

  constructor(private exchangeRateService: ExchangeRateService) {}

  onFirstCurrencyChange(newCurrency: string) {
    this.firstCurrency.set(newCurrency)
    this.secondAmount.set(this.secondAmountComputed())
  }

  onFirstAmountChange(newAmount: number) {
    this.firstAmount.set(newAmount)
    this.secondAmount.set(this.secondAmountComputed())
  }

  onSecondAmountChange(newAmount: number) {
    this.secondAmount.set(newAmount)
    this.firstAmount.set(this.firstAmountComputed())
  }

  onSecondCurrencyChange(newCurrency: string) {
    this.secondCurrency.set(newCurrency)
    this.firstAmount.set(this.firstAmountComputed())
  }
}
