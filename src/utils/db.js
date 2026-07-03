// IndexedDB Database Helper Functions

const DB_NAME = 'PlayStationHub';
const DB_VERSION = 1;

const STORES = {
  STATIONS: 'stations',
  GAMES: 'games',
  SESSIONS_ACTIVE: 'activeSessions',
  SESSIONS_HISTORY: 'sessionHistory',
  REVENUE: 'dailyRevenue',
};

let db = null;

// Initialize IndexedDB
export const initDB = () => {
  return new Promise((resolve, reject) => {
    if (db) {
      resolve(db);
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const database = event.target.result;

      // Create object stores
      if (!database.objectStoreNames.contains(STORES.STATIONS)) {
        database.createObjectStore(STORES.STATIONS, { keyPath: 'id' });
      }
      if (!database.objectStoreNames.contains(STORES.GAMES)) {
        database.createObjectStore(STORES.GAMES, { keyPath: 'id' });
      }
      if (!database.objectStoreNames.contains(STORES.SESSIONS_ACTIVE)) {
        database.createObjectStore(STORES.SESSIONS_ACTIVE, { keyPath: 'id' });
      }
      if (!database.objectStoreNames.contains(STORES.SESSIONS_HISTORY)) {
        database.createObjectStore(STORES.SESSIONS_HISTORY, { keyPath: 'id' });
      }
      if (!database.objectStoreNames.contains(STORES.REVENUE)) {
        database.createObjectStore(STORES.REVENUE, { keyPath: 'id' });
      }
    };
  });
};

// Generic save function
const saveToStore = (storeName, data) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.put(data);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
};

// Generic get function
const getFromStore = (storeName, key) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.get(key);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
};

// Generic getAll function
const getAllFromStore = (storeName) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.getAll();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
};

// Generic clear function
const clearStore = (storeName) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.clear();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
};

// Stations
export const getStations = () => getAllFromStore(STORES.STATIONS);
export const saveStations = async (stations) => {
  await clearStore(STORES.STATIONS);
  for (const station of stations) {
    await saveToStore(STORES.STATIONS, station);
  }
};

// Games
export const getGames = () => getAllFromStore(STORES.GAMES);
export const saveGames = async (games) => {
  await clearStore(STORES.GAMES);
  for (const game of games) {
    await saveToStore(STORES.GAMES, game);
  }
};

// Sessions
export const getAllSessions = async () => {
  const active = await getAllFromStore(STORES.SESSIONS_ACTIVE);
  const history = await getAllFromStore(STORES.SESSIONS_HISTORY);
  return { active, history };
};

export const saveSessions = async (sessions) => {
  const { active, history } = sessions;
  
  await clearStore(STORES.SESSIONS_ACTIVE);
  for (const session of active) {
    await saveToStore(STORES.SESSIONS_ACTIVE, session);
  }
  
  await clearStore(STORES.SESSIONS_HISTORY);
  for (const session of history) {
    await saveToStore(STORES.SESSIONS_HISTORY, session);
  }
};

// Revenue
export const getRevenueData = () => getAllFromStore(STORES.REVENUE);
export const saveRevenueData = async (revenue) => {
  await clearStore(STORES.REVENUE);
  for (const record of revenue) {
    await saveToStore(STORES.REVENUE, record);
  }
};

// Export stores for advanced queries
export { STORES };
