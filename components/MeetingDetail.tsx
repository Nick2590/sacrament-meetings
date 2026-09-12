import type { SacramentMeeting } from '../lib/types';

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

const meetingTypeLabels: Record<SacramentMeeting['meetingType'], string> = {
  testimony: 'Testimony meeting',
  regular: 'Regular meeting',
  stake: 'Stake meeting',
  general: 'General meeting',
};

function HymnLine({ number, title }: { number: number; title: string }) {
  return (
    <p className="text-slate-800">
      <span className="font-semibold">Hymn {number}:</span> {title}
    </p>
  );
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  const date = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(new Date(`${meeting.date}T00:00:00Z`));

  return (
    <article className="print:shadow-none print:border-0 rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <header className="border-b border-slate-200 pb-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
          Desert Ridge Ward
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Sacrament Meeting
        </h1>
        <p className="mt-2 text-slate-600">{date}</p>
        <p className="mt-1 text-sm font-medium text-teal-800">
          {meetingTypeLabels[meeting.meetingType]}
        </p>
      </header>

      <section className="border-b border-slate-200 py-6" aria-labelledby="meeting-leaders">
        <h2 id="meeting-leaders" className="text-lg font-semibold text-slate-900">
          Meeting Leaders
        </h2>
        <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="font-medium text-slate-500">Presiding</dt>
            <dd className="mt-1 text-slate-800">{meeting.presiding}</dd>
          </div>
          <div>
            <dt className="font-medium text-slate-500">Conducting</dt>
            <dd className="mt-1 text-slate-800">{meeting.conducting}</dd>
          </div>
        </dl>
      </section>

      <section className="border-b border-slate-200 py-6" aria-labelledby="meeting-opening">
        <h2 id="meeting-opening" className="text-lg font-semibold text-slate-900">
          Opening
        </h2>
        <div className="mt-4 space-y-4 text-sm">
          <div>
            <h3 className="font-medium text-slate-500">Opening hymn</h3>
            <HymnLine {...meeting.openingHymn} />
          </div>
          <div>
            <h3 className="font-medium text-slate-500">Opening prayer</h3>
            <p className="mt-1 text-slate-800">{meeting.openingPrayer}</p>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 py-6" aria-labelledby="meeting-announcements">
        <h2 id="meeting-announcements" className="text-lg font-semibold text-slate-900">
          Announcements and Ward Business
        </h2>
        <div className="mt-4 space-y-5 text-sm">
          <div>
            <h3 className="font-medium text-slate-500">Announcements</h3>
            {meeting.announcements?.length ? (
              <ul className="mt-2 list-disc space-y-2 pl-5 text-slate-800">
                {meeting.announcements.map((announcement) => (
                  <li key={announcement}>{announcement}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-1 text-slate-600">No announcements.</p>
            )}
          </div>
          <div>
            <h3 className="font-medium text-slate-500">Ward business</h3>
            {meeting.wardBusiness.length ? (
              <ul className="mt-2 list-disc space-y-2 pl-5 text-slate-800">
                {meeting.wardBusiness.map((item) => (
                  <li key={item.description}>{item.description}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-1 text-slate-600">No ward business.</p>
            )}
          </div>
          {meeting.stakeBusiness && (
            <p className="rounded-md bg-teal-50 px-4 py-3 font-medium text-teal-900">
              Stake business is included in this meeting.
            </p>
          )}
        </div>
      </section>

      <section className="border-b border-slate-200 py-6" aria-labelledby="meeting-sacrament">
        <h2 id="meeting-sacrament" className="text-lg font-semibold text-slate-900">
          The Sacrament
        </h2>
        <div className="mt-4 text-sm">
          <HymnLine {...meeting.sacramentHymn} />
        </div>
      </section>

      <section className="border-b border-slate-200 py-6" aria-labelledby="meeting-program">
        <h2 id="meeting-program" className="text-lg font-semibold text-slate-900">
          Program
        </h2>
        <ul className="mt-4 space-y-4 text-sm">
          {meeting.speakers.map((item) => (
            <li
              key={`${item.name}-${item.topic}`}
              className="border-l-2 border-teal-600 pl-4"
            >
              <p className="font-medium text-slate-500">
                {item.type === 'musical-number' ? 'Musical number' : 'Speaker'}
              </p>
              <p className="mt-1 text-slate-800">
                <span className="font-semibold">{item.name}</span>
                <span className="text-slate-600"> - {item.topic}</span>
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="pt-6" aria-labelledby="meeting-closing">
        <h2 id="meeting-closing" className="text-lg font-semibold text-slate-900">
          Closing
        </h2>
        <div className="mt-4 space-y-4 text-sm">
          <div>
            <h3 className="font-medium text-slate-500">Closing hymn</h3>
            <HymnLine {...meeting.closingHymn} />
          </div>
          <div>
            <h3 className="font-medium text-slate-500">Closing prayer</h3>
            <p className="mt-1 text-slate-800">{meeting.closingPrayer}</p>
          </div>
        </div>
      </section>
    </article>
  );
}