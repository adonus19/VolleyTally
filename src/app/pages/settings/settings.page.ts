import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonToggle, IonList, IonButton, IonRange } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { ThemeService } from '../../services/theme.service';

@Component({
    standalone: true,
    selector: 'app-settings',
    imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonToggle, IonList, IonButton, IonRange, FormsModule],
    templateUrl: './settings.page.html'
})
export class SettingsPage {
    private data = inject(DataService);
    private theme = inject(ThemeService);
    primary = this.data.settings().teamPrimary;
    secondary = this.data.settings().teamSecondary;
    darkMode = this.data.settings().darkMode;
    winnersCount = this.data.settings().winnersCount;

    save() {
        const p = this.primary?.trim() || '#3880ff';
        const s = this.secondary?.trim() || '#5260ff';
        this.data.setSettings({ teamPrimary: p, teamSecondary: s, darkMode: this.darkMode, winnersCount: this.winnersCount });
        this.theme.applyCurrentTheme();
        alert('Saved.');
    }
    reset() {
        this.primary = '#3880ff'; this.secondary = '#5260ff'; this.darkMode = false; this.winnersCount = 3;
        this.save();
    }
}