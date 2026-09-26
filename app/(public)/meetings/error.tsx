'use client';

import Link from 'next/link';

interface MeetingsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function MeetingsError({ reset }: MeetingsErrorProps) {
  return (
    <section className="mx-auto w-full max-w-3xl flex-1 px-6 py-16 sm:px-8" aria-labelledby="meetings-error-title">
      <div className="rounded-lg border border-red-200 bg-white p-8 shadow-sm">
        <h1 id="meetings-error-title" className="text-2xl font-semibold text-slate-950">
          Meetings could not be loaded or completed
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Something went wrong while working with meeting programs. Please try again or return to the meetings list.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"
          >
            Try Again
          </button>
          <Link
            href="/meetings"
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Back to meetings
          </Link>
        </div>
      </div>
    </section>
  );
}