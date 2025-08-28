import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({ providedIn: 'root' })
export class StorageService {
    private ready: Promise<void>;
    private store: Storage;
    constructor() {
        this.store = new Storage();
        this.ready = this.store.create().then(() => { });
    }
    async get<T>(key: string, fallback: T): Promise<T> {
        await this.ready;
        const v = await this.store.get(key);
        return (v ?? fallback) as T;
    }
    async set<T>(key: string, value: T): Promise<void> {
        await this.ready;
        await this.store.set(key, value);
    }
}