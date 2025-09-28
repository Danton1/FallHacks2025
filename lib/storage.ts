import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type StorageLike = {
  getItem: (k: string) => Promise<string | null>;
  setItem: (k: string, v: string) => Promise<void>;
  removeItem: (k: string) => Promise<void>;
};

export const storage: StorageLike = Platform.OS === 'web'
  ? {
      async getItem(k) {
        if (typeof window === 'undefined') return null;
        try { return window.localStorage.getItem(k); } catch { return null; }
      },
      async setItem(k, v) {
        if (typeof window === 'undefined') return;
        try { window.localStorage.setItem(k, v); } catch {}
      },
      async removeItem(k) {
        if (typeof window === 'undefined') return;
        try { window.localStorage.removeItem(k); } catch {}
      },
    }
  : {
      async getItem(k) { return AsyncStorage.getItem(k); },
      async setItem(k, v) { return AsyncStorage.setItem(k, v); },
      async removeItem(k) { return AsyncStorage.removeItem(k); },
    };
