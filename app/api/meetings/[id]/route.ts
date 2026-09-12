import { getMeetingById } from '../../../../lib/meetings-db';
import type { SacramentMeeting } from '../../../../lib/types';

interface MeetingRouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  _request: Request,
  { params }: MeetingRouteContext,
): Promise<Response> {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    return Response.json({ message: 'Invalid meeting ID' }, { status: 400 });
  }

  const meetingId: number = Number(id);

  if (!Number.isInteger(meetingId) || meetingId <= 0) {
    return Response.json({ message: 'Invalid meeting ID' }, { status: 400 });
  }

  const meeting: SacramentMeeting | null = getMeetingById(meetingId);

  if (!meeting) {
    return Response.json({ message: 'Meeting not found' }, { status: 404 });
  }

  return Response.json(meeting, { status: 200 });
}