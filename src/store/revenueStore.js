import { create } from 'zustand';
import { initDB, getRevenueData, saveRevenueData } from '../utils/db';

const useRevenueStore = create((set, get) => ({
  dailyRevenue: [],
  isLoading: false,

  // System settings
  settings: {
    currencyCode: 'UGX',
    currencySymbol: 'Shs.',
    baseRatePerHour: 2000,
    halfHourRate: 1000,
    warningTimes: [300, 60, 0], // 5 mins, 1 min, 0 mins
    timezone: 'Africa/Kampala',
  },

  // Initialize from IndexedDB
  initializeRevenue: async () => {
    set({ isLoading: true });
    try {
      await initDB();
      const revenue = await getRevenueData();
      set({ dailyRevenue: revenue });
    } catch (error) {
      console.error('Failed to initialize revenue:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  // Get today's revenue
  getTodayRevenue: () => {
    const today = new Date().toISOString().split('T')[0];
    return get().dailyRevenue.find((r) => r.date === today) || null;
  },

  // Add revenue record
  addRevenueRecord: async (record) => {
    const updated = [...get().dailyRevenue, record];
    set({ dailyRevenue: updated });
    await saveRevenueData(updated);
  },

  // Update revenue record
  updateRevenueRecord: async (recordId, updates) => {
    const updated = get().dailyRevenue.map((r) =>
      r.id === recordId ? { ...r, ...updates } : r
    );
    set({ dailyRevenue: updated });
    await saveRevenueData(updated);
  },

  // Calculate rate per minute
  getRatePerMinute: () => {
    const { baseRatePerHour } = get().settings;
    return baseRatePerMinute / 60;
  },

  // Calculate cost for duration
  calculateCost: (minutes) => {
    const { baseRatePerHour, halfHourRate } = get().settings;
    if (minutes === 30) return halfHourRate;
    if (minutes === 60) return baseRatePerHour;
    const ratePerMinute = baseRatePerHour / 60;
    return Math.round(ratePerMinute * minutes);
  },
}));

export default useRevenueStore;
