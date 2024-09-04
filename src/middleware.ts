// middleware.ts
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

import { auth } from "./lib/auth";

// export async function middleware(req: NextRequest) {
//   const isTryingToAccessProtectedRoute =
//     req.nextUrl.pathname.startsWith("/app");

//   if (isTryingToAccessProtectedRoute) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/app/:path*"], // Protect all routes under /app
// };

export default auth;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
