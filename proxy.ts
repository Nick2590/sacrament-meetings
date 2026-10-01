import { NextResponse } from 'next/server';
import { auth } from './auth';

export default auth((request) => {
  if (!request.auth) {
    const loginUrl = new URL('/login', request.nextUrl);
    loginUrl.searchParams.set(
      'callbackUrl',
      `${request.nextUrl.pathname}${request.nextUrl.search}`,
    );
    return NextResponse.redirect(loginUrl);
  }
});

export const config = {
  matcher: ['/meetings/new', '/meetings/:id/edit'],
};