import { neon } from '@neondatabase/serverless';
import type { Hymn, SacramentMeeting, SpeakerItem, WardBusinessItem } from './types';

const sql = neon(process.env.DATABASE_URL!);
const ITEMS_PER_PAGE = 5;

interface MeetingRow {
  id: number;
  date: string | Date;
  meeting_type: SacramentMeeting['meetingType'];
  presiding: string;
  conducting: string;
  announcements: string[] | null;
  opening_hymn: Hymn;
  opening_prayer: string;
  ward_business: WardBusinessItem[] | null;
  stake_business: boolean;
  sacrament_hymn: Hymn;
  speakers: SpeakerItem[];
  closing_hymn: Hymn;
  closing_prayer: string;
}

function formatDate(value: string | Date): string {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return value.slice(0, 10);
}

function mapMeeting(row: MeetingRow): SacramentMeeting {
  return {
    id: row.id,
    date: formatDate(row.date),
    meetingType: row.meeting_type,
    presiding: row.presiding,
    conducting: row.conducting,
    announcements: row.announcements ?? undefined,
    openingHymn: row.opening_hymn,
    openingPrayer: row.opening_prayer,
    wardBusiness: row.ward_business ?? [],
    stakeBusiness: row.stake_business,
    sacramentHymn: row.sacrament_hymn,
    speakers: row.speakers,
    closingHymn: row.closing_hymn,
    closingPrayer: row.closing_prayer,
  };
}

export async function getMeetings(
  query = '',
  currentPage = 1,
): Promise<SacramentMeeting[]> {
  const searchPattern = `%${query.trim()}%`;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const rows = await sql`
    SELECT *
    FROM meetings
    WHERE presiding ILIKE ${searchPattern}
      OR conducting ILIKE ${searchPattern}
      OR meeting_type::text ILIKE ${searchPattern}
      OR speakers::text ILIKE ${searchPattern}
    ORDER BY date DESC
    LIMIT ${ITEMS_PER_PAGE}
    OFFSET ${offset}
  `;

  return (rows as unknown as MeetingRow[]).map(mapMeeting);
}

export async function getMeetingsTotalPages(query = ''): Promise<number> {
  const searchPattern = `%${query.trim()}%`;
  const rows = await sql`
    SELECT COUNT(*) AS count
    FROM meetings
    WHERE presiding ILIKE ${searchPattern}
      OR conducting ILIKE ${searchPattern}
      OR meeting_type::text ILIKE ${searchPattern}
      OR speakers::text ILIKE ${searchPattern}
  `;
  const countRows = rows as unknown as Array<{ count: number | string }>;
  const count = Number(countRows[0]?.count ?? 0);

  return Math.ceil(count / ITEMS_PER_PAGE);
}

export async function getMeetingById(id: number): Promise<SacramentMeeting | null> {
  const rows = await sql`
    SELECT *
    FROM meetings
    WHERE id = ${id}
    LIMIT 1
  `;

  const meetingRows = rows as unknown as MeetingRow[];

  return meetingRows[0] ? mapMeeting(meetingRows[0]) : null;
}

export async function getMeetingsByDate(date: string): Promise<SacramentMeeting[]> {
  const rows = await sql`
    SELECT *
    FROM meetings
    WHERE date = ${date}
    ORDER BY date DESC
  `;

  return (rows as unknown as MeetingRow[]).map(mapMeeting);
}

export async function addMeeting(
  meeting: Omit<SacramentMeeting, 'id'>,
): Promise<SacramentMeeting> {
  const rows = await sql`
    INSERT INTO meetings (
      date,
      meeting_type,
      presiding,
      conducting,
      announcements,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer
    ) VALUES (
      ${meeting.date},
      ${meeting.meetingType},
      ${meeting.presiding},
      ${meeting.conducting},
      ARRAY(SELECT jsonb_array_elements_text(${JSON.stringify(meeting.announcements ?? [])}::jsonb)),
      ${JSON.stringify(meeting.openingHymn)}::jsonb,
      ${meeting.openingPrayer},
      ${JSON.stringify(meeting.wardBusiness)}::jsonb,
      ${meeting.stakeBusiness},
      ${JSON.stringify(meeting.sacramentHymn)}::jsonb,
      ${JSON.stringify(meeting.speakers)}::jsonb,
      ${JSON.stringify(meeting.closingHymn)}::jsonb,
      ${meeting.closingPrayer}
    )
    RETURNING *
  `;

  return mapMeeting((rows as unknown as MeetingRow[])[0]);
}

export async function updateMeeting(
  id: number,
  meeting: Omit<SacramentMeeting, 'id'>,
): Promise<SacramentMeeting> {
  const rows = await sql`
    UPDATE meetings
    SET
      date = ${meeting.date},
      meeting_type = ${meeting.meetingType},
      presiding = ${meeting.presiding},
      conducting = ${meeting.conducting},
      announcements = ARRAY(SELECT jsonb_array_elements_text(${JSON.stringify(meeting.announcements ?? [])}::jsonb)),
      opening_hymn = ${JSON.stringify(meeting.openingHymn)}::jsonb,
      opening_prayer = ${meeting.openingPrayer},
      ward_business = ${JSON.stringify(meeting.wardBusiness)}::jsonb,
      stake_business = ${meeting.stakeBusiness},
      sacrament_hymn = ${JSON.stringify(meeting.sacramentHymn)}::jsonb,
      speakers = ${JSON.stringify(meeting.speakers)}::jsonb,
      closing_hymn = ${JSON.stringify(meeting.closingHymn)}::jsonb,
      closing_prayer = ${meeting.closingPrayer}
    WHERE id = ${id}
    RETURNING *
  `;
  const meetingRows = rows as unknown as MeetingRow[];

  if (!meetingRows[0]) {
    throw new Error(`Meeting ${id} was not found.`);
  }

  return mapMeeting(meetingRows[0]);
}

export async function deleteMeeting(id: number): Promise<void> {
  await sql`
    DELETE FROM meetings
    WHERE id = ${id}
  `;
}
