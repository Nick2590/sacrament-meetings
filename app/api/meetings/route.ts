import { getMeetings } from '../../../lib/meetings-db';
import type { SacramentMeeting } from '../../../lib/types';

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const rawDate = searchParams.get('date');
  const date: string | null = rawDate?.trim() || null;
  const meetings: SacramentMeeting[] = getMeetings(date);

  return Response.json(meetings, { status: 200 });
}