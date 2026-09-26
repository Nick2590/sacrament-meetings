import MeetingForm from '../../../../components/MeetingForm';
import { createMeeting } from '../../../../lib/actions';

export default function NewMeetingPage() {
  return (
    <section className="mx-auto w-full max-w-4xl flex-1 px-6 py-10 sm:px-8 lg:py-14">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Create Meeting</h1>
      <MeetingForm action={createMeeting} submitLabel="Create meeting" />
    </section>
  );
}