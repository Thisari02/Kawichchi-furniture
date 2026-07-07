export function getApiBase(pathSuffix = ''): string {
  const configuredApiRoot =
    import.meta.env.VITE_API_BASE ||
    import.meta.env.VITE_API_URL ||
    'https://kawichchi-furniture.onrender.com';
  const baseRoot = import.meta.env.DEV ? 'http://localhost:4000' : configuredApiRoot;
  const normalizedBase = baseRoot ? baseRoot.replace(/\/$/, '') : '';
  const normalizedSuffix = pathSuffix ? `/${pathSuffix.replace(/^\//, '')}` : '';

  return `${normalizedBase}${normalizedSuffix}`;
}