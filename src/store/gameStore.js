import { create } from 'zustand';
import { initDB, getGames, saveGames } from '../utils/db';

const useGameStore = create((set, get) => ({
  games: [],
  isLoading: false,

  // Initialize from IndexedDB
  initializeGames: async () => {
    set({ isLoading: true });
    try {
      await initDB();
      const games = await getGames();
      if (games.length === 0) {
        // Pre-populate with Ugandan popular games
        const defaults = [
          { id: 'game_001', name: 'FIFA 25', genre: 'Sports', popularity: 1, enabled: true },
          { id: 'game_002', name: 'EA Sports FC 25', genre: 'Sports', popularity: 2, enabled: true },
          { id: 'game_003', name: 'Mortal Kombat 1', genre: 'Fighting', popularity: 3, enabled: true },
          { id: 'game_004', name: 'Injustice 2', genre: 'Fighting', popularity: 4, enabled: true },
          { id: 'game_005', name: 'Grand Theft Auto V', genre: 'Action', popularity: 5, enabled: true },
          { id: 'game_006', name: 'Need for Speed Unbound', genre: 'Racing', popularity: 6, enabled: true },
          { id: 'game_007', name: 'Blur', genre: 'Racing', popularity: 7, enabled: true },
        ];
        await saveGames(defaults);
        set({ games: defaults });
      } else {
        set({ games });
      }
    } catch (error) {
      console.error('Failed to initialize games:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  // Get games sorted by popularity
  getGamesByPopularity: () => {
    return [...get().games].sort((a, b) => a.popularity - b.popularity);
  },

  // Add new game
  addGame: async (game) => {
    const updated = [...get().games, game];
    set({ games: updated });
    await saveGames(updated);
  },

  // Update game
  updateGame: async (gameId, updates) => {
    const updated = get().games.map((g) =>
      g.id === gameId ? { ...g, ...updates } : g
    );
    set({ games: updated });
    await saveGames(updated);
  },
}));

export default useGameStore;
