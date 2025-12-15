function getBaseUrl(): string {
  if (typeof window !== 'undefined') {
    return '';
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  return `http://localhost:${process.env.PORT || 3000}`;
}

export function getLocalApiUrl(path: string, params?: Record<string, string>): string {
  const baseUrl = getBaseUrl();
  
  const base = baseUrl;
  const url = new URL(path, base);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        url.searchParams.append(key, value);
      }
    });
  }
  
  return url.toString();
}
