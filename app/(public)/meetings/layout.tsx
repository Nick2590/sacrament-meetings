import Link from 'next/link';
import type { ReactNode } from 'react';

interface MeetingsLayoutProps {
  children: ReactNode;
}

export default function MeetingsLayout({ children }: MeetingsLayoutProps) {
  return (
    <div className="flex flex-1 flex-col">
      <section className="border-b border-slate-200 bg-teal-50/60" aria-labelledby="meetings-heading">
        <div className="mx-auto w-full max-w-6xl px-6 py-6 sm:px-8">
          <p id="meetings-heading" className="text-2xl font-semibold text-slate-900">
            Meeting Programs
          </p>
          <nav className="mt-4" aria-label="Meeting program navigation">
            <ul className="flex flex-wrap gap-2 text-sm font-medium">
              <li>
                <Link
                  href="/meetings"
                  className="inline-flex rounded-md border border-teal-700 bg-white px-3 py-2 text-teal-800 transition-colors hover:bg-teal-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
                >
                  All Meetings
                </Link>
              </li>
              <li>
                <Link
                  href="/meetings/current"
                  className="inline-flex rounded-md border border-teal-700 bg-teal-700 px-3 py-2 text-white transition-colors hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
                >
                  Current Meeting
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </section>
      <div className="flex-1">{children}</div>
    </div>
  );
}