import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV({
  id: 'beymax-app-storage',
  encryptionKey: 'beymax-is-key',
});

export const mmkvStorage = {
  setItem: (key: string, value: string) => {
    storage.set(key, value);
  },
  getItem: (key: string) => {
    const value = storage.getString(key);
    return value ?? null;
  },
  removeItem: (key: string) => {
    storage.delete(key);
  },
};
