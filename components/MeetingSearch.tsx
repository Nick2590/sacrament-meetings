'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function MeetingSearch() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('query') ?? '';

  const updateSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set('query', value);
    } else {
      params.delete('query');
    }

    params.set('page', '1');
    const queryString = params.toString();

    router.replace(queryString ? `${pathname}?${queryString}` : pathname);
  }, 300);

  return (
    <div className="mt-8 max-w-2xl">
      <label className="sr-only" htmlFor="meeting-search">
        Search meetings
      </label>
      <input
        id="meeting-search"
        type="search"
        value={query}
        placeholder="Search by speaker, leader, or meeting type..."
        aria-label="Search meetings"
        onChange={(event) => updateSearch(event.target.value)}
        className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-500 focus:border-teal-700 focus:ring-2 focus:ring-teal-200"
      />
    </div>
  );
}