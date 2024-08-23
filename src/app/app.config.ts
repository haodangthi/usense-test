import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core'

import {
  provideAnimations,
  provideNoopAnimations,
} from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
    provideNoopAnimations(),
    importProvidersFrom(HttpClientModule),
  ],
}
