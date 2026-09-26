import Link from 'next/link';
import MeetingCard from '../../../components/MeetingCard';
import Pagination from '../../../components/Pagination';
import MeetingSearch from '../../../components/MeetingSearch';
import { getMeetings, getMeetingsTotalPages } from '../../../lib/meetings-db';

export const dynamic = 'force-dynamic';

interface MeetingsPageProps {
  searchParams?: Promise<{ query?: string; page?: string }>;
}

export default async function MeetingsPage({ searchParams }: MeetingsPageProps) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.query ?? '';
  const parsedPage = Number(resolvedSearchParams?.page);
  const currentPage = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <section className="mx-auto w-full max-w-6xl flex-1 px-6 py-10 sm:px-8 lg:py-14" aria-labelledby="meetings-title">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
            Desert Ridge Ward
          </p>
          <h1 id="meetings-title" className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
            Sacrament Meetings
          </h1>
          <p className="mt-3 text-base leading-7 text-slate-600">
            Browse current and past meeting programs, including the people and music planned for each gathering.
          </p>
        </div>

        <Link
          href="/meetings/new"
          className="inline-flex items-center rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
        >
          Add Meeting
        </Link>
      </div>

      <MeetingSearch />

      {meetings.length > 0 ? (
        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {meetings.map((meeting) => (
            <li key={meeting.id}>
              <MeetingCard meeting={meeting} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-10 rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
          <h3 className="text-lg font-semibold text-slate-900">No meetings found</h3>
          <p className="mt-2 text-sm text-slate-600">
            Meeting programs will appear here when they are added.
          </p>
        </div>
      )}

      <Pagination totalPages={totalPages} />
    </section>
  );
}