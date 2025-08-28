import { Component, computed, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonBadge } from '@ionic/angular/standalone';
import { DataService } from '../../services/data.service';

@Component({
    standalone: true,
    selector: 'app-leaderboard',
    imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonBadge],
    templateUrl: './leaderboard.page.html'
})
export class LeaderboardPage {
    private data = inject(DataService);
    rows = computed(() => this.data.getTotals());
    
    nameFor(pid: string) {
        return this.data.players().find(p => p.id === pid)?.name || '(Removed)';
    }
}