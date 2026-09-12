import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-09-06',
    meetingType: 'regular',
    presiding: 'Bishop Daniel Mercer',
    conducting: 'Sister Leah Whitmore',
    announcements: [
      'The ward picnic will be held at Cedar Grove Park on Saturday at noon.',
      'Youth choir practice begins at 4:00 p.m. on Wednesday.',
    ],
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Brother Nathan Cole',
    wardBusiness: [
      { description: 'Sustain Emily Hart as the new Primary secretary.' },
      { description: 'Invite volunteers to help with the community food drive.' },
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: 'As Now We Take the Sacrament' },
    speakers: [
      { name: 'Sister Mariah Chen', topic: 'Finding peace through daily prayer', type: 'speaker' },
      { name: 'Eli and Nora James', topic: 'Come, Follow Me', type: 'musical-number' },
      { name: 'Brother Thomas Bell', topic: 'Serving with a willing heart', type: 'speaker' },
    ],
    closingHymn: { number: 223, title: 'Have I Done Any Good?' },
    closingPrayer: 'Sister Olivia Grant',
  },
  {
    id: 2,
    date: '2026-08-30',
    meetingType: 'testimony',
    presiding: 'Bishop Daniel Mercer',
    conducting: 'Brother Caleb Ortiz',
    announcements: ['Fast Sunday donations may be made through the online ward portal.'],
    openingHymn: { number: 85, title: 'How Firm a Foundation' },
    openingPrayer: 'Sister Rebecca Sloan',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 193, title: 'I Stand All Amazed' },
    speakers: [
      { name: 'Ward Members', topic: 'Personal testimonies', type: 'speaker' },
    ],
    closingHymn: { number: 30, title: 'Come, Come, Ye Saints' },
    closingPrayer: 'Brother Marcus Lee',
  },
  {
    id: 3,
    date: '2026-08-23',
    meetingType: 'stake',
    presiding: 'President Hannah Caldwell',
    conducting: 'Elder Marcus Lee',
    announcements: [
      'Stake conference leadership meetings will begin next Friday evening.',
      'The stake family history workshop will be held in the library this month.',
    ],
    openingHymn: { number: 81, title: 'Press Forward, Saints' },
    openingPrayer: 'Sister Vivian Park',
    wardBusiness: [
      { description: 'Please welcome visiting leaders from the Willow Creek Stake.' },
    ],
    stakeBusiness: true,
    sacramentHymn: { number: 185, title: 'Reverently and Meekly Now' },
    speakers: [
      { name: 'Elder James Holloway', topic: 'Covenant belonging', type: 'speaker' },
      { name: 'Willow Creek Stake Choir', topic: 'Come unto Jesus', type: 'musical-number' },
      { name: 'President Hannah Caldwell', topic: 'Building a covenant community', type: 'speaker' },
    ],
    closingHymn: { number: 219, title: 'Because I Have Been Given Much' },
    closingPrayer: 'Brother Samuel Price',
  },
  {
    id: 4,
    date: '2026-08-16',
    meetingType: 'general',
    presiding: 'Bishop Daniel Mercer',
    conducting: 'Sister Leah Whitmore',
    openingHymn: { number: 6, title: 'Redeemer of Israel' },
    openingPrayer: 'Brother Nathan Cole',
    wardBusiness: [
      { description: 'The Relief Society service project will support the neighborhood shelter.' },
    ],
    stakeBusiness: true,
    sacramentHymn: { number: 174, title: 'While of These Emblems We Partake' },
    speakers: [
      { name: 'Sister Alana Ruiz', topic: 'Hope in Jesus Christ', type: 'speaker' },
      { name: 'Miriam Foster', topic: 'Where Can I Turn for Peace?', type: 'musical-number' },
      { name: 'Brother David Kim', topic: 'The strength of gathering', type: 'speaker' },
    ],
    closingHymn: { number: 134, title: 'I Believe in Christ' },
    closingPrayer: 'Sister Rebecca Sloan',
  },
  {
    id: 5,
    date: '2026-08-09',
    meetingType: 'regular',
    presiding: 'Bishop Daniel Mercer',
    conducting: 'Brother Caleb Ortiz',
    announcements: [
      'Temple recommend interviews are available by appointment this week.',
    ],
    openingHymn: { number: 94, title: 'Come, Ye Thankful People' },
    openingPrayer: 'Sister Olivia Grant',
    wardBusiness: [
      { description: 'The elders quorum will coordinate rides for the temple trip.' },
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 172, title: 'In Memory of the Crucified' },
    speakers: [
      { name: 'Brother Isaac Morgan', topic: 'Remembering the Savior', type: 'speaker' },
      { name: 'Sister Chloe Bennett', topic: 'Gratitude in ordinary moments', type: 'speaker' },
    ],
    closingHymn: { number: 227, title: 'There Is Sunshine in My Soul Today' },
    closingPrayer: 'Brother Thomas Bell',
  },
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) {
    return meetings.filter((meeting) => meeting.date === date);
  }

  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find((meeting) => meeting.id === id) ?? null;
}