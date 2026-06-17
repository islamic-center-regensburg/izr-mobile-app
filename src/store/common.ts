export interface WithHydration {
  hydrated: boolean;
}

export interface WithCacheValidation extends WithHydration {
  cachedDate: string | null;
}

export const isCacheValid = (
  store: { getState: () => WithCacheValidation },
  daysOffset: number = 0,
) => {
  const { cachedDate } = store.getState();
  return cachedDate === getTodayString(daysOffset);
};

export const getTodayString = (daysOffset: number = 0) => {
  const today = new Date();
  today.setDate(today.getDate() + daysOffset);
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
};
