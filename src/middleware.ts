import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { validateToken } from './libs/utils'
import { cookies } from 'next/headers';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  if (request.url.split("/")[1] == "" || request.url.split("/")[1] == '/home?auth=true') {
    const token = request.cookies.get("token")?.value;
    const validated = await validateToken(token);
    if (validated)
      return NextResponse.redirect(new URL('/home?auth=true', request.url))
    else
      return NextResponse.redirect(new URL('/home', request.url))
  }
  if (request.url.includes("api"))
    NextResponse.redirect(request.url);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/',
}