export enum EStorageKey {
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
}

const storage = {
  get(key: EStorageKey) {
    return localStorage.getItem(key);
  },
  set(key: EStorageKey, value: string) {
    localStorage.setItem(key, value);
  },
  remove(key: EStorageKey) {
    localStorage.removeItem(key);
  },
  clear() {
    localStorage.clear();
  },
};

export default storage;
