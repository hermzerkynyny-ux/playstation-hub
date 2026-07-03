import { create } from 'zustand';
import { initDB, getAllSessions, saveSessions } from '../utils/db';

const useSessionStore = create((set, get) => ({
  activeSessions: [],
  sessionHistory: [],
  isLoading: false,

  // Initialize from IndexedDB
  initializeSessions: async () => {
    set({ isLoading: true });
    try {
      await initDB();
      const sessions = await getAllSessions();
      set({
        activeSessions: sessions.active || [],
        sessionHistory: sessions.history || [],
      });
    } catch (error) {
      console.error('Failed to initialize sessions:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  // Add new active session
  addSession: async (session) => {
    const updated = [...get().activeSessions, session];
    set({ activeSessions: updated });
    await saveSessions({ active: updated, history: get().sessionHistory });
  },

  // Update active session (for timer updates)
  updateSession: async (sessionId, updates) => {
    const updated = get().activeSessions.map((s) =>
      s.id === sessionId ? { ...s, ...updates } : s
    );
    set({ activeSessions: updated });
    await saveSessions({ active: updated, history: get().sessionHistory });
  },

  // Move session from active to history (when completed)
  completeSession: async (sessionId) => {
    const session = get().activeSessions.find((s) => s.id === sessionId);
    if (!session) return;

    const updated = get().activeSessions.filter((s) => s.id !== sessionId);
    const history = [
      ...get().sessionHistory,
      {
        ...session,
        endTime: new Date().toISOString(),
        paymentStatus: 'completed',
      },
    ];

    set({ activeSessions: updated, sessionHistory: history });
    await saveSessions({ active: updated, history });
  },

  // Clear all sessions (reset)
  clearAllSessions: async () => {
    set({ activeSessions: [], sessionHistory: [] });
    await saveSessions({ active: [], history: [] });
  },
}));

export default useSessionStore;
