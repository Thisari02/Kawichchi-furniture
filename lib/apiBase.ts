export function getApiBase(pathSuffix = ''): string {
  const configuredApiRoot = import.meta.env.VITE_API_BASE || import.meta.env.VITE_API_URL;
  const baseRoot = configuredApiRoot || (import.meta.env.DEV ? 'http://localhost:4000' : '');
  const normalizedBase = baseRoot ? baseRoot.replace(/\/$/, '') : '';
  const normalizedSuffix = pathSuffix ? `/${pathSuffix.replace(/^\//, '')}` : '';

  return `${normalizedBase}${normalizedSuffix}`;
}