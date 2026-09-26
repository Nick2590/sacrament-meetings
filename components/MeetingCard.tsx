import Link from 'next/link';
import { deleteMeeting } from '../lib/actions';
import type { SacramentMeeting } from '../lib/types';

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

const meetingTypeLabels: Record<SacramentMeeting['meetingType'], string> = {
  testimony: 'Testimony meeting',
  regular: 'Regular meeting',
  stake: 'Stake meeting',
  general: 'General meeting',
};

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const date = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(new Date(`${meeting.date}T00:00:00Z`));

  return (
    <article className="h-full rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link
        href={`/meetings/${meeting.id}`}
        className="block rounded-t-lg p-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-900">{date}</h2>
          <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800">
            {meetingTypeLabels[meeting.meetingType]}
          </span>
        </div>

        <dl className="mt-5 space-y-3 text-sm">
          <div>
            <dt className="font-medium text-slate-500">Presiding</dt>
            <dd className="mt-1 text-slate-800">{meeting.presiding}</dd>
          </div>
          <div>
            <dt className="font-medium text-slate-500">Conducting</dt>
            <dd className="mt-1 text-slate-800">{meeting.conducting}</dd>
          </div>
        </dl>

        <p className="mt-6 text-sm font-semibold text-teal-800">View meeting program</p>
      </Link>
      <div className="flex items-center justify-between gap-3 border-t border-slate-200 px-5 py-3">
        <Link
          href={`/meetings/${meeting.id}/edit`}
          aria-label={`Edit meeting for ${date}`}
          className="rounded text-sm font-semibold text-teal-700 hover:text-teal-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
        >
          Edit
        </Link>
        <form action={deleteMeeting}>
          <input type="hidden" name="id" value={meeting.id} />
          <button
            type="submit"
            className="text-sm font-semibold text-red-700 hover:text-red-900"
          >
            Delete meeting
          </button>
        </form>
      </div>
    </article>
  );
}