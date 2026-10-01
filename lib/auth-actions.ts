'use server';

import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import { signIn, signOut } from '../auth';

function getSafeCallbackUrl(value: FormDataEntryValue | null): string {
  return typeof value === 'string' && value.startsWith('/') && !value.startsWith('//')
    ? value
    : '/meetings';
}

export async function login(formData: FormData): Promise<void> {
  const callbackUrl = getSafeCallbackUrl(formData.get('redirectTo'));

  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      const query = new URLSearchParams({ error: 'credentials', callbackUrl });
      redirect(`/login?${query.toString()}`);
    }

    throw error;
  }
}

export async function logout(): Promise<void> {
  await signOut({ redirectTo: '/' });
}