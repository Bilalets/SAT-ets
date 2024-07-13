import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

interface Token {
  role?: string;
}

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const { pathname } = url;

  // Get the session token
  const token = (await getToken({ req, secret: process.env.NEXTAUTH_SECRET })) as Token | null;

  // If there is no token, redirect to the login page
  if (!token) {
    url.pathname = '/'; // Redirect to home page
    return NextResponse.redirect(url);
  }

  // Get the user role from the token
  const userRole = token.role || 'guest';

  // Define protected routes and corresponding roles
  const protectedRoutes: { [key: string]: string[] } = {
    '/Admin': ['admin'],
    '/superadmin': ['superadmin'],
    '/applicants': ['applicant'],
  };

  // Determine if the current path is protected and if the user has the required role
  for (const route in protectedRoutes) {
    if (pathname.startsWith(route)) {
      const allowedRoles = protectedRoutes[route];
      if (!allowedRoles.includes(userRole)) {
        url.pathname = '/unauthorized'; // Redirect to unauthorized page
        return NextResponse.redirect(url);
      }
      break;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/Admin/:path*', '/superadmin/:path*', '/applicants/:path*'], // Adjust paths as needed
};
