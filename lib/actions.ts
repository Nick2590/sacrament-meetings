'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import {
  addMeeting,
  deleteMeeting as deleteMeetingRecord,
  updateMeeting as updateMeetingRecord,
} from './meetings-db';

function hymnNumberSchema(fieldLabel: string) {
  return z.coerce
    .number({ error: `${fieldLabel} is required.` })
    .int({ error: `${fieldLabel} must be a whole number.` })
    .positive({ error: `${fieldLabel} is required and must be greater than 0.` });
}

const AnnouncementsSchema = z.string().transform((value) =>
  value
    .split(/\r?\n/)
    .map((announcement) => announcement.trim())
    .filter(Boolean),
);

const WardBusinessSchema = z
  .string()
  .transform((value) =>
    value
      .split(/\r?\n/)
      .map((description) => description.trim())
      .filter(Boolean)
      .map((description) => ({ description })),
  );

const SpeakersSchema = z
  .string()
  .transform((value) =>
    value
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [name = '', topic = '', type = 'speaker'] = line
          .split('|')
          .map((part) => part.trim());

        return { name, topic, type };
      }),
  )
  .pipe(
    z.array(
      z.object({
        name: z.string().trim().min(1, 'Each speaker or musical number needs a name.'),
        topic: z.string().trim().min(1, 'Each speaker or musical number needs a topic.'),
        type: z.enum(['speaker', 'musical-number'], {
          error: 'Each entry must be marked as a speaker or musical number.',
        }),
      }),
    ),
  );

const MeetingFormSchema = z
  .object({
    date: z.iso.date({ error: 'Date is required.' }),
    meetingType: z.enum(['testimony', 'regular', 'stake', 'general'], {
      error: 'Meeting type is required.',
    }),
    presiding: z.string().trim().min(1, 'Presiding officer is required.'),
    conducting: z.string().trim().min(1, 'Conducting officer is required.'),
    announcements: AnnouncementsSchema,
    openingHymnNumber: hymnNumberSchema('Opening hymn number'),
    openingHymnTitle: z.string().trim().min(1, 'Opening hymn is required.'),
    openingPrayer: z.string().trim().min(1, 'Opening prayer is required.'),
    wardBusiness: WardBusinessSchema,
    stakeBusiness: z.boolean(),
    sacramentHymnNumber: hymnNumberSchema('Sacrament hymn number'),
    sacramentHymnTitle: z.string().trim().min(1, 'Sacrament hymn is required.'),
    speakers: SpeakersSchema,
    closingHymnNumber: hymnNumberSchema('Closing hymn number'),
    closingHymnTitle: z.string().trim().min(1, 'Closing hymn is required.'),
    closingPrayer: z.string().trim().min(1, 'Closing prayer is required.'),
  })
  .transform((values) => ({
    date: values.date,
    meetingType: values.meetingType,
    presiding: values.presiding,
    conducting: values.conducting,
    announcements: values.announcements,
    openingHymn: {
      number: values.openingHymnNumber,
      title: values.openingHymnTitle,
    },
    openingPrayer: values.openingPrayer,
    wardBusiness: values.wardBusiness,
    stakeBusiness: values.stakeBusiness,
    sacramentHymn: {
      number: values.sacramentHymnNumber,
      title: values.sacramentHymnTitle,
    },
    speakers: values.speakers,
    closingHymn: {
      number: values.closingHymnNumber,
      title: values.closingHymnTitle,
    },
    closingPrayer: values.closingPrayer,
  }));

export type MeetingFormField = keyof z.input<typeof MeetingFormSchema>;

export type SubmittedMeetingFormValues = Record<
  Exclude<MeetingFormField, 'stakeBusiness'>,
  string
> & {
  stakeBusiness: boolean;
};

export interface State {
  message?: string;
  errors?: Partial<Record<MeetingFormField, string[]>>;
  values?: SubmittedMeetingFormValues;
}

function readSubmittedValues(formData: FormData): SubmittedMeetingFormValues {
  const readString = (key: string) => {
    const value = formData.get(key);
    return typeof value === 'string' ? value : '';
  };

  return {
    date: readString('date'),
    meetingType: readString('meetingType'),
    presiding: readString('presiding'),
    conducting: readString('conducting'),
    announcements: readString('announcements'),
    openingHymnNumber: readString('openingHymnNumber'),
    openingHymnTitle: readString('openingHymnTitle'),
    openingPrayer: readString('openingPrayer'),
    wardBusiness: readString('wardBusiness'),
    stakeBusiness: formData.has('stakeBusiness'),
    sacramentHymnNumber: readString('sacramentHymnNumber'),
    sacramentHymnTitle: readString('sacramentHymnTitle'),
    speakers: readString('speakers'),
    closingHymnNumber: readString('closingHymnNumber'),
    closingHymnTitle: readString('closingHymnTitle'),
    closingPrayer: readString('closingPrayer'),
  };
}

function readMeetingFormData(formData: FormData) {
  const values = readSubmittedValues(formData);
  const result = MeetingFormSchema.safeParse(values);
  return { result, values };
}

export async function createMeeting(
  _prevState: State,
  formData: FormData,
): Promise<State> {
  const { result, values } = readMeetingFormData(formData);

  if (!result.success) {
    return {
      message: 'Please fix the errors below.',
      errors: result.error.flatten().fieldErrors,
      values,
    };
  }

  try {
    await addMeeting(result.data);
  } catch (error) {
    console.error('Failed to create meeting:', error);
    throw new Error('The meeting could not be created. Please try again.');
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function updateMeeting(
  meetingId: number,
  _prevState: State,
  formData: FormData,
): Promise<State> {
  const id = z.number().int().positive().safeParse(meetingId);
  const { result, values } = readMeetingFormData(formData);

  if (!id.success) {
    return { message: 'The meeting could not be identified. Please try again.' };
  }

  if (!result.success) {
    return {
      message: 'Please fix the errors below.',
      errors: result.error.flatten().fieldErrors,
      values,
    };
  }

  try {
    await updateMeetingRecord(id.data, result.data);
  } catch (error) {
    console.error('Failed to update meeting:', error);
    throw new Error('The meeting could not be updated. Please try again.');
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function deleteMeeting(formData: FormData): Promise<void> {
  const id = z.coerce.number().int().positive().safeParse(formData.get('id'));

  if (!id.success) {
    return;
  }

  try {
    await deleteMeetingRecord(id.data);
  } catch (error) {
    console.error('Failed to delete meeting:', error);
    throw new Error('The meeting could not be deleted. Please try again.');
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}