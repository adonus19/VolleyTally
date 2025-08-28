import { Component, computed, inject, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonInput, IonButton, IonLabel, IonItem } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
    standalone: true,
    selector: 'app-roster',
    imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonLabel, IonInput, IonButton, FormsModule, IonItem],
    templateUrl: './roster.page.html'
})
export class RosterPage {
    private data = inject(DataService);
    players = computed(() => this.data.players());
    name = ''; 
    number = ''; 
    toggleImport = false; 
    csv = '';
    
    add() {
        const n = this.name.trim(); 
        if (!n) return alert('Name required');
        
        this.data.addPlayer(n, this.number.trim() || undefined); 
        this.name = ''; 
        this.number = '';
    }

    rename(id: string) {
        const p = this.players().find(x => x.id === id)!;
        const name = prompt('Player name:', p.name)?.trim(); 
        if (!name) return;

        const num = prompt('Jersey # (blank for none):', p.number ?? '')?.trim();
        this.data.updatePlayer({ ...p, name, number: num || undefined });
    }
    
    remove(id: string) { 
        if (confirm('Delete player? Historical points will remain attributed.')) this.data.deletePlayer(id); 
    }
    
    importCsv() {
        const lines = this.csv.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
        for (const line of lines) {
            const [name, number] = line.split(',').map(s => s?.trim() ?? '');
            if (name) this.data.addPlayer(name, number || undefined);
        }
        this.csv = ''; this.toggleImport = false;
    }
}