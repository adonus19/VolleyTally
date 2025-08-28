import { Component, OnInit, computed, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonButton, IonSegment, IonSegmentButton, IonIcon, IonFab, IonFabButton, IonItem, IonLabel } from '@ionic/angular/standalone';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { DatePipe } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-sessions',
    imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonButton, IonSegment, IonSegmentButton, IonIcon, IonFab, IonFabButton, IonItem, IonLabel, FormsModule, DatePipe],
    templateUrl: './sessions.page.html'
})
export class SessionsPage implements OnInit {
    private data = inject(DataService);
    private router = inject(Router);
    filter: 'all' | 'practice' | 'game' = 'all';
    toggleFab = false;
    sessions = computed(() => this.data.sessions());
    
    async ngOnInit() { 
        await this.data.init(); 
    }
    
    filteredSessions() {
        const list = this.sessions() ?? [];
        return this.filter === 'all' ? list : list.filter(s => s.type === this.filter);
    }
    
    open(id: string) { 
        this.router.navigate(['/session', id]); 
    }
    
    create(type: 'practice' | 'game') {
        // Avoid empty sessions confusion.
        if (!this.data.players().length) { 
            alert('Add players in Roster first.'); 
            return; 
        } 
        
        const id = this.data.addSession(type);
        this.open(id);
    }
}