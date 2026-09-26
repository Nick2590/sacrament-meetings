'use client';

import { useActionState } from 'react';
import type { MeetingFormField, State, SubmittedMeetingFormValues } from '../lib/actions';
import type { SacramentMeeting } from '../lib/types';

interface MeetingFormProps {
  action: (prevState: State, formData: FormData) => Promise<State>;
  meeting?: SacramentMeeting;
  submitLabel: string;
}

const initialState: State = {};
const inputClassName =
  'mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900';

// Baseline field values shown before any submission: the existing meeting when editing, or blank defaults when creating.
function meetingToFormValues(meeting?: SacramentMeeting): SubmittedMeetingFormValues {
  return {
    date: meeting?.date ?? '',
    meetingType: meeting?.meetingType ?? 'regular',
    presiding: meeting?.presiding ?? '',
    conducting: meeting?.conducting ?? '',
    announcements: meeting?.announcements?.join('\n') ?? '',
    openingHymnNumber: meeting ? String(meeting.openingHymn.number) : '',
    openingHymnTitle: meeting?.openingHymn.title ?? '',
    openingPrayer: meeting?.openingPrayer ?? '',
    wardBusiness: meeting?.wardBusiness.map((item) => item.description).join('\n') ?? '',
    stakeBusiness: meeting?.stakeBusiness ?? false,
    sacramentHymnNumber: meeting ? String(meeting.sacramentHymn.number) : '',
    sacramentHymnTitle: meeting?.sacramentHymn.title ?? '',
    speakers:
      meeting?.speakers.map((item) => `${item.name} | ${item.topic} | ${item.type}`).join('\n') ??
      '',
    closingHymnNumber: meeting ? String(meeting.closingHymn.number) : '',
    closingHymnTitle: meeting?.closingHymn.title ?? '',
    closingPrayer: meeting?.closingPrayer ?? '',
  };
}

function FieldErrors({
  field,
  errors,
}: {
  field: MeetingFormField;
  errors: State['errors'];
}) {
  return (
    <div id={`${field}-error`} aria-live="polite" className="mt-1 text-sm text-red-700">
      {errors?.[field]?.map((message, index) => (
        <p key={`${field}-${index}`}>{message}</p>
      ))}
    </div>
  );
}

export default function MeetingForm({ action, meeting, submitLabel }: MeetingFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);
  const errors = state.errors;
  // After a failed submission, redisplay exactly what the user submitted rather than the original meeting/blank defaults.
  const values = state.values ?? meetingToFormValues(meeting);
  // Remount the form (and its uncontrolled inputs) whenever new submitted values arrive so defaultValue reliably reflects them.
  const formKey = state.values ? JSON.stringify(state.values) : 'initial';

  return (
    <form key={formKey} action={formAction} className="mt-8 space-y-8" noValidate>
      {meeting && <input type="hidden" name="id" value={meeting.id} />}

      {state.message && (
        <p role="status" aria-live="polite" className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {state.message}
        </p>
      )}

      <fieldset className="grid gap-5 rounded-lg border border-slate-200 bg-white p-6 sm:grid-cols-2">
        <legend className="px-2 text-lg font-semibold text-slate-900">Meeting details</legend>
        <div>
          <label htmlFor="date" className="text-sm font-medium text-slate-700">Date</label>
          <input id="date" aria-describedby="date-error" className={inputClassName} type="date" name="date" defaultValue={values.date} required />
          <FieldErrors field="date" errors={errors} />
        </div>
        <div>
          <label htmlFor="meetingType" className="text-sm font-medium text-slate-700">Meeting type</label>
          <select id="meetingType" aria-describedby="meetingType-error" className={inputClassName} name="meetingType" defaultValue={values.meetingType}>
            <option value="testimony">Testimony</option>
            <option value="regular">Regular</option>
            <option value="stake">Stake</option>
            <option value="general">General</option>
          </select>
          <FieldErrors field="meetingType" errors={errors} />
        </div>
        <div>
          <label htmlFor="presiding" className="text-sm font-medium text-slate-700">Presiding</label>
          <input id="presiding" aria-describedby="presiding-error" className={inputClassName} name="presiding" defaultValue={values.presiding} required />
          <FieldErrors field="presiding" errors={errors} />
        </div>
        <div>
          <label htmlFor="conducting" className="text-sm font-medium text-slate-700">Conducting</label>
          <input id="conducting" aria-describedby="conducting-error" className={inputClassName} name="conducting" defaultValue={values.conducting} required />
          <FieldErrors field="conducting" errors={errors} />
        </div>
      </fieldset>

      <fieldset className="grid gap-5 rounded-lg border border-slate-200 bg-white p-6 sm:grid-cols-2">
        <legend className="px-2 text-lg font-semibold text-slate-900">Opening</legend>
        <div>
          <label htmlFor="openingHymnNumber" className="text-sm font-medium text-slate-700">Opening hymn number</label>
          <input id="openingHymnNumber" aria-describedby="openingHymnNumber-error" className={inputClassName} type="number" min="1" name="openingHymnNumber" defaultValue={values.openingHymnNumber} required />
          <FieldErrors field="openingHymnNumber" errors={errors} />
        </div>
        <div>
          <label htmlFor="openingHymnTitle" className="text-sm font-medium text-slate-700">Opening hymn title</label>
          <input id="openingHymnTitle" aria-describedby="openingHymnTitle-error" className={inputClassName} name="openingHymnTitle" defaultValue={values.openingHymnTitle} required />
          <FieldErrors field="openingHymnTitle" errors={errors} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="openingPrayer" className="text-sm font-medium text-slate-700">Opening prayer</label>
          <input id="openingPrayer" aria-describedby="openingPrayer-error" className={inputClassName} name="openingPrayer" defaultValue={values.openingPrayer} required />
          <FieldErrors field="openingPrayer" errors={errors} />
        </div>
      </fieldset>

      <fieldset className="grid gap-5 rounded-lg border border-slate-200 bg-white p-6 sm:grid-cols-2">
        <legend className="px-2 text-lg font-semibold text-slate-900">Announcements and ward business</legend>
        <div>
          <label htmlFor="announcements" className="text-sm font-medium text-slate-700">Announcements</label>
          <textarea id="announcements" aria-describedby="announcements-error" className={inputClassName} name="announcements" rows={4} defaultValue={values.announcements} />
          <FieldErrors field="announcements" errors={errors} />
        </div>
        <div>
          <label htmlFor="wardBusiness" className="text-sm font-medium text-slate-700">Ward business</label>
          <textarea id="wardBusiness" aria-describedby="wardBusiness-error" className={inputClassName} name="wardBusiness" rows={4} defaultValue={values.wardBusiness} />
          <FieldErrors field="wardBusiness" errors={errors} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="stakeBusiness" className="flex items-center gap-3 text-sm font-medium text-slate-700">
            <input id="stakeBusiness" aria-describedby="stakeBusiness-error" type="checkbox" name="stakeBusiness" defaultChecked={values.stakeBusiness} />
            Stake business is included
          </label>
          <FieldErrors field="stakeBusiness" errors={errors} />
        </div>
      </fieldset>

      <fieldset className="grid gap-5 rounded-lg border border-slate-200 bg-white p-6 sm:grid-cols-2">
        <legend className="px-2 text-lg font-semibold text-slate-900">The sacrament</legend>
        <div>
          <label htmlFor="sacramentHymnNumber" className="text-sm font-medium text-slate-700">Sacrament hymn number</label>
          <input id="sacramentHymnNumber" aria-describedby="sacramentHymnNumber-error" className={inputClassName} type="number" min="1" name="sacramentHymnNumber" defaultValue={values.sacramentHymnNumber} required />
          <FieldErrors field="sacramentHymnNumber" errors={errors} />
        </div>
        <div>
          <label htmlFor="sacramentHymnTitle" className="text-sm font-medium text-slate-700">Sacrament hymn title</label>
          <input id="sacramentHymnTitle" aria-describedby="sacramentHymnTitle-error" className={inputClassName} name="sacramentHymnTitle" defaultValue={values.sacramentHymnTitle} required />
          <FieldErrors field="sacramentHymnTitle" errors={errors} />
        </div>
      </fieldset>

      <fieldset className="grid gap-5 rounded-lg border border-slate-200 bg-white p-6 sm:grid-cols-2">
        <legend className="px-2 text-lg font-semibold text-slate-900">Program and closing</legend>
        <div className="sm:col-span-2">
          <label htmlFor="speakers" className="text-sm font-medium text-slate-700">Speakers and musical numbers</label>
          <textarea
            id="speakers"
            aria-describedby="speakers-error"
            className={inputClassName}
            name="speakers"
            rows={5}
            placeholder="Name | topic | speaker"
            defaultValue={values.speakers}
          />
          <FieldErrors field="speakers" errors={errors} />
        </div>
        <div>
          <label htmlFor="closingHymnNumber" className="text-sm font-medium text-slate-700">Closing hymn number</label>
          <input id="closingHymnNumber" aria-describedby="closingHymnNumber-error" className={inputClassName} type="number" min="1" name="closingHymnNumber" defaultValue={values.closingHymnNumber} required />
          <FieldErrors field="closingHymnNumber" errors={errors} />
        </div>
        <div>
          <label htmlFor="closingHymnTitle" className="text-sm font-medium text-slate-700">Closing hymn title</label>
          <input id="closingHymnTitle" aria-describedby="closingHymnTitle-error" className={inputClassName} name="closingHymnTitle" defaultValue={values.closingHymnTitle} required />
          <FieldErrors field="closingHymnTitle" errors={errors} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="closingPrayer" className="text-sm font-medium text-slate-700">Closing prayer</label>
          <input id="closingPrayer" aria-describedby="closingPrayer-error" className={inputClassName} name="closingPrayer" defaultValue={values.closingPrayer} required />
          <FieldErrors field="closingPrayer" errors={errors} />
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-teal-700 px-5 py-3 text-sm font-semibold text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? 'Saving meeting...' : submitLabel}
      </button>
    </form>
  );
}
