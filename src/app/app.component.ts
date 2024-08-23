import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component'
import { ExchangeRateService } from './services/exchange-rate.service'
import { HeaderComponent } from './components/header/header.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CurrencyConverterComponent, HeaderComponent],
  providers: [ExchangeRateService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'currency-converter'
}
