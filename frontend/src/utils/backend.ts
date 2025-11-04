export const resolveBackendUrl = (path: string): string => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const explicitOrigin = import.meta.env.VITE_BACKEND_ORIGIN;

  if (explicitOrigin) {
    try {
      return new URL(normalizedPath, explicitOrigin).toString();
    } catch (error) {
      console.error('Failed to construct backend URL from VITE_BACKEND_ORIGIN:', error);
    }
  }

  if (typeof window !== 'undefined') {
    const { protocol, hostname, port } = window.location;
    const devPorts = new Set(['3000', '5173', '4173']);
    const targetPort = port && devPorts.has(port) ? '8000' : port;
    const baseOrigin = `${protocol}//${hostname}${targetPort ? `:${targetPort}` : ''}`;

    try {
      return new URL(normalizedPath, baseOrigin).toString();
    } catch (error) {
      console.error('Failed to construct backend URL from window location:', error);
    }
  }

  return normalizedPath;
};