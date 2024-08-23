import { Component, OnInit, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatToolbarModule } from '@angular/material/toolbar'
import { ExchangeRateService } from '../../services/exchange-rate.service'
import { Rate } from '../../enums'

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule, MatToolbarModule],
})
export class HeaderComponent implements OnInit {
  usdRate = signal<number>(0)
  eurRate = signal<number>(0)

  constructor(private exchangeRateService: ExchangeRateService) {}

  ngOnInit(): void {
    this.exchangeRateService.getRate(Rate.usd, Rate.uah).subscribe((rate) => {
      this.usdRate.set(rate)
    })

    this.exchangeRateService.getRate(Rate.eur, Rate.uah).subscribe((rate) => {
      this.eurRate.set(rate)
    })
  }
}
