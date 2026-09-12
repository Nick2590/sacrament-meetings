import NavLinks from './NavLinks';

const readableDate = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'long',
}).format(new Date());

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
            Desert Ridge Ward
          </p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Sacrament Meeting Planner
          </p>
          <p className="mt-2 text-sm text-slate-600">{readableDate}</p>
        </div>

        <nav aria-label="Primary navigation">
          <NavLinks />
        </nav>
      </div>
    </header>
  );
}