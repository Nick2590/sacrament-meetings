import { notFound, redirect } from 'next/navigation';
import MeetingForm from '../../../../../components/MeetingForm';
import { updateMeeting } from '../../../../../lib/actions';
import { getMeetingById } from '../../../../../lib/meetings-db';

interface EditMeetingPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditMeetingPage({ params }: EditMeetingPageProps) {
  const { id: rawId } = await params;
  const id = Number(rawId);

  if (!/^\d+$/.test(rawId) || !Number.isSafeInteger(id) || id < 1) {
    redirect('/meetings');
  }

  const meeting = await getMeetingById(id);

  if (!meeting) {
    notFound();
  }

  return (
    <section className="mx-auto w-full max-w-4xl flex-1 px-6 py-10 sm:px-8 lg:py-14">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Edit Meeting</h1>
      <MeetingForm
        action={updateMeeting.bind(null, id)}
        meeting={meeting}
        submitLabel="Save changes"
      />
    </section>
  );
}