export const buildQueryKey = (
  baseKey: string,
  queryObj?: Record<string, unknown>,
) => {
  if (!queryObj) return [baseKey];
  return [baseKey, queryObj];
};

export const buildQueryKeyWithPath = (
  baseKey: string,
  { path, value }: { path: string; value: string },
  queryObj?: Record<string, unknown>,
) => {
  const pathPart = `/{${path}}: ${value}`;
  if (!queryObj) return [baseKey, pathPart];
  return [baseKey, pathPart, queryObj];
};
