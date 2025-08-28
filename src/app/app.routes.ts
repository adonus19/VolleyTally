import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'sessions', pathMatch: 'full' },
  { path: 'sessions', loadComponent: () => import('./pages/sessions/sessions.page').then(m => m.SessionsPage) },
  { path: 'session/:id', loadComponent: () => import('./pages/session-detail/session-detail.page').then(m => m.SessionDetailPage) },
  { path: 'roster', loadComponent: () => import('./pages/roster/roster.page').then(m => m.RosterPage) },
  { path: 'leaderboard', loadComponent: () => import('./pages/leaderboard/leaderboard.page').then(m => m.LeaderboardPage) },
  { path: 'settings', loadComponent: () => import('./pages/settings/settings.page').then(m => m.SettingsPage) }
];
