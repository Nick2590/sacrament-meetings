import MeetingDetail from '../../../components/MeetingDetail';
import { fetchApi } from '../../../lib/api';
import type { SacramentMeeting } from '../../../lib/types';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface MeetingPageProps {
  params: Promise<{ id: string }>;
}

export default async function MeetingPage({ params }: MeetingPageProps) {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    notFound();
  }

  let meeting: SacramentMeeting;

  try {
    meeting = await fetchApi<SacramentMeeting>(`/api/meetings/${id}`);
  } catch (error) {
    if (error instanceof Error && error.message.includes('status 404')) {
      notFound();
    }

    throw error;
  }

  return (
    <section className="mx-auto w-full max-w-4xl flex-1 px-6 py-10 sm:px-8 lg:py-14" aria-label="Sacrament meeting program">
      <MeetingDetail meeting={meeting} />
    </section>
  );
}