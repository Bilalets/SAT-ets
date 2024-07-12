// middleware.ts
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
    return NextResponse.redirect(new URL('/', req.url));
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
  let isProtected = false;
  for (const route in protectedRoutes) {
    if (pathname.startsWith(route)) {
      const allowedRoles = protectedRoutes[route];
      if (!allowedRoles.includes(userRole)) {
      
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }
      isProtected = true;
      break;
    }
  }

  // If the route is not protected, allow access
  if (!isProtected) {
 
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/Admin/:path*', '/superadmin/:path*', '/applicants/:path*'], // Adjust paths as needed
};
