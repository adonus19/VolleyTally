import { Component, effect, inject, signal } from '@angular/core';
import { IonApp, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonIcon, IonLabel, IonTab } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { people, trophy, calendar, settings, list } from 'ionicons/icons';
import { ThemeService } from './services/theme.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonTab, IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, RouterLink],
  templateUrl: './app.component.html'
})
export class AppComponent {
  private theme = inject(ThemeService);
  constructor() {
    addIcons({ people, trophy, calendar, settings, list });
    // Ensure CSS vars/class apply on boot.
    this.theme.applyCurrentTheme();
  }
}
