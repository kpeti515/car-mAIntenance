import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });
    const isAuth = !!token;
    const isApiRoute = req.nextUrl.pathname.startsWith('/api/cars');

    if (isApiRoute && !isAuth) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling the API route protection
        // The actual authorization check for API routes is done inside the middleware function above.
        // For other routes, next-auth's default behavior will apply.
        return true;
      },
    },
  }
);

export const config = {
  matcher: ['/api/cars/:path*'], // Apply middleware to all routes under /api/cars
};
