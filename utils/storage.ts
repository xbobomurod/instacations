
import { UserStats } from "../types";

const STORAGE_KEY = 'instacaptions_stats';
const FREE_LIMIT = 3;

export const getStats = (): UserStats => {
  const saved = localStorage.getItem(STORAGE_KEY);
  const today = new Date().toDateString();

  if (saved) {
    const stats: UserStats = JSON.parse(saved);
    if (stats.lastResetDate !== today) {
      return { ...stats, freeGenerationsLeft: stats.isPremium ? 999 : FREE_LIMIT, lastResetDate: today };
    }
    return stats;
  }

  return {
    freeGenerationsLeft: FREE_LIMIT,
    lastResetDate: today,
    isPremium: false
  };
};

export const saveStats = (stats: UserStats) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
};

export const decrementLimit = () => {
  const stats = getStats();
  if (stats.isPremium) return stats;
  
  const newStats = {
    ...stats,
    freeGenerationsLeft: Math.max(0, stats.freeGenerationsLeft - 1)
  };
  saveStats(newStats);
  return newStats;
};

export const upgradeToPremium = () => {
  const stats = getStats();
  const newStats = { ...stats, isPremium: true, freeGenerationsLeft: 999 };
  saveStats(newStats);
  return newStats;
};
