import { create } from 'zustand';
import { initDB, getStations, saveStations } from '../utils/db';

const useStationStore = create((set, get) => ({
  stations: [],
  isLoading: false,

  // Initialize from IndexedDB
  initializeStations: async () => {
    set({ isLoading: true });
    try {
      await initDB();
      const stations = await getStations();
      if (stations.length === 0) {
        // Pre-populate with default stations
        const defaults = [
          {
            id: 'station_001',
            name: 'PS4 - Station 1',
            console: 'PS4',
            status: 'active',
            createdAt: new Date().toISOString(),
            description: 'Main gaming console - Station 1',
            notes: '',
          },
          {
            id: 'station_002',
            name: 'PS5 - Station 2',
            console: 'PS5',
            status: 'active',
            createdAt: new Date().toISOString(),
            description: 'High-end gaming console - Station 2',
            notes: '',
          },
        ];
        await saveStations(defaults);
        set({ stations: defaults });
      } else {
        set({ stations });
      }
    } catch (error) {
      console.error('Failed to initialize stations:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  // Add new station
  addStation: async (station) => {
    const updated = [...get().stations, station];
    set({ stations: updated });
    await saveStations(updated);
  },

  // Update station
  updateStation: async (stationId, updates) => {
    const updated = get().stations.map((s) =>
      s.id === stationId ? { ...s, ...updates } : s
    );
    set({ stations: updated });
    await saveStations(updated);
  },

  // Delete station
  deleteStation: async (stationId) => {
    const updated = get().stations.filter((s) => s.id !== stationId);
    set({ stations: updated });
    await saveStations(updated);
  },
}));

export default useStationStore;
