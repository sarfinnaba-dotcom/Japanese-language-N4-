import { SRSData, SRSItem, SRSLevel } from '../types/srs';

const STORAGE_KEY = 'japanese_srs_data';

export const getSRSData = (): SRSData => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : {};
};

export const saveSRSData = (data: SRSData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const getReviewInterval = (level: SRSLevel): number => {
  // Intervals in hours
  const intervals: Record<SRSLevel, number> = {
    0: 4,      // New/Reset: 4 hours
    1: 8,      // Apprentice 1: 8 hours
    2: 24,     // Apprentice 2: 1 day
    3: 72,     // Guru 1: 3 days
    4: 168,    // Guru 2: 1 week
    5: 336,    // Master: 2 weeks
  };
  return intervals[level];
};

export const updateSRSItem = (id: string, correct: boolean) => {
  const data = getSRSData();
  const currentItem = data[id] || { id, level: 0, nextReview: new Date().toISOString() };

  let nextLevel: SRSLevel = currentItem.level;
  if (correct) {
    nextLevel = Math.min(currentItem.level + 1, 5) as SRSLevel;
  } else {
    // On failure, drop back to level 0 or 1
    nextLevel = Math.max(0, currentItem.level - 2) as SRSLevel;
  }

  const now = new Date();
  const nextReview = new Date(now.getTime() + getReviewInterval(nextLevel) * 60 * 60 * 1000);

  const updatedItem: SRSItem = {
    id,
    level: nextLevel,
    nextReview: nextReview.toISOString(),
    lastReview: now.toISOString(),
  };

  data[id] = updatedItem;
  saveSRSData(data);
  return updatedItem;
};

export const getItemsForReview = (allIds: string[]): string[] => {
  const data = getSRSData();
  const now = new Date();

  return allIds.filter(id => {
    const item = data[id];
    if (!item) return true; // New items are always available
    return new Date(item.nextReview) <= now;
  });
};
