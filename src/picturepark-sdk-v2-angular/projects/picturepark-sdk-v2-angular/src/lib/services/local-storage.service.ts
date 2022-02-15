import { Injectable } from '@angular/core';
import { StorageKey } from '../utilities/storage-key.enum';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  get(key: StorageKey): string {
    return localStorage.getItem(key) ?? '';
  }

  set(key: StorageKey, value: string): void {
    localStorage.setItem(key, value);
  }
}
