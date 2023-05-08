import { authMiddleware } from "@clerk/nextjs";
import { AuthObject } from "@clerk/nextjs/dist/server";
import { NextRequest, NextResponse, NextFetchEvent } from "next/server";

const beforeClerkAuth = (request: NextRequest, event: NextFetchEvent): NextResponse | undefined => undefined
const afterClerkAuth = (auth: AuthObject, request: NextRequest, event: NextFetchEvent): NextResponse | undefined  => undefined

const clerkPublicRoutes = [
  '/auth'
]

const clerkIgnoreRoutes = undefined

export default authMiddleware({
  publicRoutes: clerkPublicRoutes,
  ignoredRoutes: clerkIgnoreRoutes,

  secretKey: process.env.CLERK_SECRET_KEY,
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/"],
};
