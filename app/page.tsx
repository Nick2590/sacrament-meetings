import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative isolate flex flex-1 flex-col overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(circle_at_top_right,_rgba(20,184,166,0.18),_transparent_55%),linear-gradient(180deg,_#e5f4f1_0%,_#f5f7f6_78%)]" />
      <section className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-12 px-6 py-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
            A clear plan for every Sunday
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Sacrament Meeting Planner
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Leaders can organize sacrament meeting agendas in one place, while
            members can quickly review the program, speakers, and hymns before
            they arrive.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/meetings"
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-teal-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
            >
              Browse meeting programs
            </Link>
            <Link
              href="/meetings/current"
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-teal-600 hover:text-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
            >
              View current meeting
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end">
          <Image
            src="/meeting-planner.svg"
            alt="Illustration of a printed sacrament meeting program"
            width={640}
            height={480}
            priority
            className="h-auto w-full"
          />
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white/70" aria-labelledby="features-heading">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8">
          <h2 id="features-heading" className="text-2xl font-semibold text-slate-900">
            Everything the ward needs at a glance
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Meeting agendas", "Keep each part of the service in order."],
              ["Speakers and hymns", "Capture the people and music that shape the meeting."],
              ["Current and past programs", "Review upcoming plans and previous gatherings."],
              ["Print-friendly programs", "Bring a clean, readable program to the pulpit."],
            ].map(([title, description]) => (
              <li key={title} className="border-l-2 border-teal-600 px-4 py-1">
                <h3 className="font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
