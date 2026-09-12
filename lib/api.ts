import { headers } from 'next/headers';

function toAbsoluteUrl(value: string, defaultProtocol: string): string {
  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return `${defaultProtocol}://${value}`;
}

async function getApiBaseUrl(): Promise<string> {
  const requestHeaders = await headers();
  const vercelUrl = process.env.VERCEL_URL?.trim();

  if (vercelUrl) {
    return toAbsoluteUrl(vercelUrl, 'https');
  }

  const host = requestHeaders.get('x-forwarded-host') ?? requestHeaders.get('host');

  if (host) {
    const protocol = requestHeaders.get('x-forwarded-proto')?.split(',')[0].trim() ?? 'http';
    return toAbsoluteUrl(host, protocol);
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();

  if (appUrl) {
    return toAbsoluteUrl(appUrl, 'https');
  }

  return 'http://localhost:3000';
}

export async function fetchApi<T>(path: string): Promise<T> {
  const url = `${await getApiBaseUrl()}${path}`;
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
    cache: 'no-store',
  });
  const contentType = response.headers.get('content-type') ?? '';

  if (!response.ok) {
    throw new Error(
      `API request failed: ${url} returned ${response.status} ${response.statusText} (${contentType || 'unknown content type'})`,
    );
  }

  if (!contentType.toLowerCase().includes('application/json')) {
    throw new Error(
      `API request returned non-JSON content: ${url} returned ${response.status} (${contentType || 'unknown content type'})`,
    );
  }

  return response.json() as Promise<T>;
}