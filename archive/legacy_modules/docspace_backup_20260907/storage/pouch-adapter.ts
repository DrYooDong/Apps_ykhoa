/**
 * DocSpace Multi-Device Sync & Storage Adapter
 * Xử lý lưu trữ IndexedDB cục bộ, Mã hóa đầu cuối (E2EE) và Đồng bộ Đa thiết bị
 */

import { SyncSettings, SyncStatusInfo } from '../types';

// ─────────────────────────────────────────────
// E2EE CRYPTO UTILS (Web Crypto API AES-GCM 256)
// ─────────────────────────────────────────────

async function getKeyFromPassphrase(passphrase: string, salt: Uint8Array): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(passphrase),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt.buffer as ArrayBuffer,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

export async function encryptE2EE(plainText: string, passphrase: string): Promise<string> {
  if (!passphrase) return plainText;
  try {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await getKeyFromPassphrase(passphrase, salt);
    const enc = new TextEncoder();
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: iv.buffer as ArrayBuffer },
      key,
      enc.encode(plainText)
    );

    const result = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
    result.set(salt, 0);
    result.set(iv, salt.length);
    result.set(new Uint8Array(encrypted), salt.length + iv.length);

    return 'e2ee:' + btoa(String.fromCharCode(...result));
  } catch (err) {
    console.error('E2EE Encryption Error:', err);
    throw new Error('Mã hóa dữ liệu E2EE thất bại');
  }
}

export async function decryptE2EE(cipherText: string, passphrase: string): Promise<string> {
  if (!cipherText.startsWith('e2ee:') || !passphrase) return cipherText;
  try {
    const base64Data = cipherText.substring(5);
    const binaryStr = atob(base64Data);
    const bytes = new Uint8Array(binaryStr.length);
    for (let i = 0; i < binaryStr.length; i++) {
      bytes[i] = binaryStr.charCodeAt(i);
    }

    const salt = bytes.slice(0, 16);
    const iv = bytes.slice(16, 28);
    const data = bytes.slice(28);

    const key = await getKeyFromPassphrase(passphrase, salt);
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: iv.buffer as ArrayBuffer },
      key,
      data.buffer as ArrayBuffer
    );

    const dec = new TextDecoder();
    return dec.decode(decrypted);
  } catch (err) {
    console.error('E2EE Decryption Error:', err);
    throw new Error('Giải mã E2EE thất bại (Sai Passphrase hoặc dữ liệu bị lỗi)');
  }
}

// ─────────────────────────────────────────────
// INDEXEDDB LOCAL ENGINE
// ─────────────────────────────────────────────

const DB_NAME = 'DocSpaceIndexedDB';
const DB_VERSION = 1;
const STORE_NAME = 'docspace_records';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('profileId', 'profileId', { unique: false });
        store.createIndex('storeType', 'storeType', { unique: false });
        store.createIndex('updatedAt', 'updatedAt', { unique: false });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export interface PouchRecord<T = any> {
  id: string; // key: `${profileId}:${storeType}:${recordId}`
  profileId: string;
  storeType: string;
  data: T;
  rev: string;
  updatedAt: string;
  synced: boolean;
}

// ─────────────────────────────────────────────
// POUCH / INDEXEDDB ADAPTER CLASS
// ─────────────────────────────────────────────

export class PouchSyncAdapter {
  private profileId: string;
  private status: SyncStatusInfo = {
    state: 'idle',
    docsSyncedCount: 0,
  };
  private statusListeners: Array<(status: SyncStatusInfo) => void> = [];
  private autoSyncTimer?: any;

  constructor(profileId: string) {
    this.profileId = profileId;
  }

  public onStatusChange(listener: (status: SyncStatusInfo) => void): void {
    this.statusListeners.push(listener);
    listener(this.status);
  }

  private updateStatus(patch: Partial<SyncStatusInfo>): void {
    this.status = { ...this.status, ...patch };
    this.statusListeners.forEach((fn) => fn(this.status));
  }

  public getStatus(): SyncStatusInfo {
    return this.status;
  }

  // Save record to local IndexedDB
  public async putRecord<T>(storeType: string, recordId: string, payload: T): Promise<void> {
    try {
      const db = await openDB();
      const id = `${this.profileId}:${storeType}:${recordId}`;
      const rec: PouchRecord<T> = {
        id,
        profileId: this.profileId,
        storeType,
        data: payload,
        rev: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        updatedAt: new Date().toISOString(),
        synced: false,
      };

      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const req = store.put(rec);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch (err) {
      console.error('IndexedDB Put Error:', err);
    }
  }

  // Get records from local IndexedDB
  public async getRecords<T>(storeType: string): Promise<T[]> {
    try {
      const db = await openDB();
      return new Promise<T[]>((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const index = store.index('profileId');
        const req = index.getAll(this.profileId);

        req.onsuccess = () => {
          const all = req.result as PouchRecord<T>[];
          const filtered = all.filter((r) => r.storeType === storeType).map((r) => r.data);
          resolve(filtered);
        };
        req.onerror = () => reject(req.error);
      });
    } catch (err) {
      console.error('IndexedDB Get Error:', err);
      return [];
    }
  }

  // Sync to remote server (CouchDB / WebDAV)
  public async triggerSync(settings: SyncSettings): Promise<SyncStatusInfo> {
    if (!settings.enabled || settings.provider === 'none' || !settings.remoteUrl) {
      this.updateStatus({ state: 'disabled' });
      return this.status;
    }

    if (!navigator.onLine) {
      this.updateStatus({ state: 'offline', errorMessage: 'Thiết bị đang ngắt kết nối mạng' });
      return this.status;
    }

    this.updateStatus({ state: 'syncing' });

    try {
      const db = await openDB();
      // Get all un-synced records
      const records = await new Promise<PouchRecord[]>(resolve => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const index = store.index('profileId');
        const req = index.getAll(this.profileId);
        req.onsuccess = () => resolve(req.result || []);
      });

      if (records.length === 0) {
        this.updateStatus({ state: 'synced', lastSyncedAt: new Date().toLocaleTimeString('vi-VN') });
        return this.status;
      }

      let syncedCount = 0;

      for (const rec of records) {
        let payloadStr = JSON.stringify(rec.data);
        if (settings.isE2eeEnabled && settings.passphrase) {
          payloadStr = await encryptE2EE(payloadStr, settings.passphrase);
        }

        const body = {
          _id: rec.id,
          _rev: rec.rev,
          profileId: rec.profileId,
          storeType: rec.storeType,
          payload: payloadStr,
          isEncrypted: settings.isE2eeEnabled,
          updatedAt: rec.updatedAt,
        };

        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (settings.username && settings.password) {
          headers['Authorization'] = 'Basic ' + btoa(`${settings.username}:${settings.password}`);
        }

        const res = await fetch(settings.remoteUrl, {
          method: 'POST',
          headers,
          body: JSON.stringify(body),
        });

        if (res.ok || res.status === 201 || res.status === 200) {
          syncedCount++;
          // Mark as synced locally
          rec.synced = true;
          const tx = db.transaction(STORE_NAME, 'readwrite');
          tx.objectStore(STORE_NAME).put(rec);
        }
      }

      this.updateStatus({
        state: 'synced',
        docsSyncedCount: (this.status.docsSyncedCount || 0) + syncedCount,
        lastSyncedAt: new Date().toLocaleTimeString('vi-VN'),
      });
    } catch (err: any) {
      console.error('Sync error:', err);
      this.updateStatus({ state: 'error', errorMessage: err.message || 'Lỗi đồng bộ với Remote Server' });
    }

    return this.status;
  }

  // Test connection to Remote Server
  public async testConnection(settings: SyncSettings): Promise<{ success: boolean; message: string }> {
    if (!settings.remoteUrl) {
      return { success: false, message: 'Chưa nhập Remote URL' };
    }
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (settings.username && settings.password) {
        headers['Authorization'] = 'Basic ' + btoa(`${settings.username}:${settings.password}`);
      }

      const res = await fetch(settings.remoteUrl, {
        method: 'GET',
        headers,
      });

      if (res.ok || res.status === 200 || res.status === 404) {
        return { success: true, message: 'Kết nối máy chủ Sync thành công!' };
      } else {
        return { success: false, message: `Máy chủ phản hồi mã lỗi HTTP: ${res.status}` };
      }
    } catch (err: any) {
      return { success: false, message: `Không thể kết nối: ${err.message || 'Lỗi mạng hoặc CORS'}` };
    }
  }

  public startAutoSync(settings: SyncSettings): void {
    this.stopAutoSync();
    if (settings.enabled && settings.autoSync && settings.remoteUrl) {
      const intervalMs = (settings.autoSyncIntervalSec || 30) * 1000;
      this.autoSyncTimer = setInterval(() => {
        this.triggerSync(settings);
      }, intervalMs);
    }
  }

  public stopAutoSync(): void {
    if (this.autoSyncTimer) {
      clearInterval(this.autoSyncTimer);
      this.autoSyncTimer = undefined;
    }
  }
}
