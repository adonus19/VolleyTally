import { Component, computed, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonList, IonButtons, IonBackButton, IonCol, IonBadge, IonItem, IonLabel } from '@ionic/angular/standalone';
import { DataService } from '../../services/data.service';
import { LongPressDirective } from 'src/app/shared/long-press.directive';

@Component({
    standalone: true,
    selector: 'app-session-detail',
    imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonList, IonButtons, IonBackButton, IonCol, LongPressDirective, IonBadge, IonItem, IonLabel, DatePipe],
    templateUrl: './session-detail.page.html'
})
export class SessionDetailPage {
    private route = inject(ActivatedRoute);
    private data = inject(DataService);
    id = this.route.snapshot.paramMap.get('id')!;
    session = computed(() => this.data.sessions().find(s => s.id === this.id)!);
    players = computed(() => this.data.players());
    winnersCount = computed(() => this.data.settings().winnersCount);

    headerTitle() {
        const s = this.session(); if (!s) return '';
        return `${s.type.toUpperCase()} — ${new Date(s.date).toLocaleString()}`;
    }
    countFor(pid: string) {
        return this.data.getSessionCounts(this.session()).get(pid) ?? 0;
    }
    leaderboard() {
        return this.data.getTopForSession(this.session(), this.players().length || 0);
    }
    recentPoints() {
        return [...this.session().points].sort((a, b) => b.timestamp - a.timestamp).slice(0, 20);
    }
    addPoint(playerId: string) { this.data.awardPoint(this.session().id, playerId); }
    async addPointWithNote(playerId: string) {
        const note = prompt('Optional note (max 100 chars):') ?? '';
        this.data.awardPoint(this.session().id, playerId, note.trim() || undefined);
    }
    decPoint(playerId: string) { this.data.decrementPoint(this.session().id, playerId); }
    nameFor(pid: string) {
        return this.players().find(p => p.id === pid)?.name || '(Removed)';
    }
    deleteSession() {
        if (confirm('Delete this session? This cannot be undone.')) this.data.deleteSession(this.session().id);
        history.back();
    }
}