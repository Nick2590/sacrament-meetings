import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '../../auth';
import { login } from '../../lib/auth-actions';

export const metadata: Metadata = {
  title: 'Bishopric Sign In',
  description: 'Sign in to manage sacrament meeting schedules and programs.',
};

interface LoginPageProps {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
}

function getSafeCallbackUrl(value: string | undefined): string {
  return value?.startsWith('/') && !value.startsWith('//') ? value : '/meetings';
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { callbackUrl, error } = await searchParams;
  const returnTo = getSafeCallbackUrl(callbackUrl);

  if (await auth()) {
    redirect(returnTo);
  }

  return (
    <section className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-12 sm:px-8">
      <div className="border-t-4 border-teal-700 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
          Bishopric access
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">Sign in</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Sign in to create and update meeting programs.
        </p>

        {error === 'credentials' && (
          <p className="mt-5 rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-800" role="alert">
            The username or password was incorrect.
          </p>
        )}

        <form action={login} className="mt-6 space-y-5">
          <input type="hidden" name="redirectTo" value={returnTo} />
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-slate-800">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="mt-2 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-950 shadow-sm focus:border-teal-700 focus:outline-2 focus:outline-offset-2 focus:outline-teal-700"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-800">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-2 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-950 shadow-sm focus:border-teal-700 focus:outline-2 focus:outline-offset-2 focus:outline-teal-700"
            />
          </div>
          <button
            type="submit"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
          >
            Sign in
          </button>
        </form>
      </div>
    </section>
  );
}