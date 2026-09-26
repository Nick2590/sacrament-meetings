import Link from 'next/link';

export default function EditMeetingNotFound() {
  return (
    <section className="mx-auto w-full max-w-3xl flex-1 px-6 py-16 sm:px-8">
      <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-950">Meeting not found</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          The requested meeting could not be found. It may have been removed or the link may be incorrect.
        </p>
        <Link
          href="/meetings"
          className="mt-6 inline-flex rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"
        >
          Back to meetings
        </Link>
      </div>
    </section>
  );
}