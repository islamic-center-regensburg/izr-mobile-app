export interface WithHydration {
  hydrated: boolean;
}

export interface WithCacheValidation extends WithHydration {
  cachedDate: string | null;
}

export const getTodayString = () => {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
};

export const isCacheValid = (store: {
  getState: () => WithCacheValidation;
}) => {
  const { cachedDate } = store.getState();
  return cachedDate === getTodayString();
};
