import { headers } from 'next/headers';

async function getApiBaseUrl(): Promise<string> {
  const requestHeaders = await headers();
  const host = requestHeaders.get('host');

  if (host) {
    const protocol = requestHeaders.get('x-forwarded-proto') ?? 'http';
    return `${protocol}://${host}`;
  }

  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return 'http://localhost:3000';
}

export async function fetchApi<T>(path: string): Promise<T> {
  const response = await fetch(`${await getApiBaseUrl()}${path}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}