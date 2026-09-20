'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  if (totalPages <= 1) {
    return null;
  }

  function createPageUrl(page: number): string {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));

    return `${pathname}?${params.toString()}`;
  }

  return (
    <nav className="mt-10 flex items-center justify-center gap-5" aria-label="Pagination">
      {currentPage > 1 ? (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="rounded-md border border-teal-700 bg-white px-4 py-2 text-sm font-semibold text-teal-800 transition-colors hover:bg-teal-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
        >
          Previous
        </Link>
      ) : null}

      <span className="text-sm font-medium text-slate-700">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
        >
          Next
        </Link>
      ) : null}
    </nav>
  );
}