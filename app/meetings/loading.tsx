export default function MeetingsLoading() {
  return (
    <section
      className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center px-6 py-16 sm:px-8"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="rounded-lg border border-slate-200 bg-white px-6 py-5 text-center shadow-sm">
        <p className="font-medium text-slate-900">Loading meeting programs...</p>
        <p className="mt-1 text-sm text-slate-600">Please wait while the programs are retrieved.</p>
      </div>
    </section>
  );
}