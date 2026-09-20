import { fetchApi } from '../../../../lib/api';
import type { SacramentMeeting } from '../../../../lib/types';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

function formatLocalDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export default async function CurrentMeetingPage() {
  const today = new Date();
  const mostRecentSunday = new Date(today);
  mostRecentSunday.setDate(today.getDate() - today.getDay());

  const date = formatLocalDate(mostRecentSunday);
  const meetings = await fetchApi<SacramentMeeting[]>(`/api/meetings?date=${date}`);
  const currentMeeting = meetings[0];

  if (currentMeeting) {
    redirect(`/meetings/${currentMeeting.id}`);
  }

  redirect('/meetings');
}