import type { ReactNode } from 'react';
import { logout } from '../../lib/auth-actions';
import { requireManagementSession } from '../../lib/require-management-session';

interface AdminLayoutProps {
  children: ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  await requireManagementSession();

  return (
    <div className="flex flex-1 flex-col">
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-3 sm:px-8">
          <p className="text-sm font-medium text-slate-700">Bishopric management</p>
          <form action={logout}>
            <button
              type="submit"
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 hover:border-teal-700 hover:text-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
      {children}
    </div>
  );
}