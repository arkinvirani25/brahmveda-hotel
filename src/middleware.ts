import { NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|auth|images|favicon.ico).*)"],
};

export async function middleware() {
  // const token = await getToken({ req: request });
  // const url = request.nextUrl.clone();
  // const pathname = request.nextUrl.pathname;

  // if (token) {
  //   if (pathname === "/login" || pathname === "/signup" || pathname === "/") {
  //     return NextResponse.redirect(new URL("/select-template", url));
  //   } else {
  //     return NextResponse.next();
  //   }
  // } else {
  //   if (pathname === "/login" || pathname === "/signup") {
  //     return NextResponse.next();
  //   } else {
  //     return NextResponse.redirect(new URL("/login", url));
  //   }
  // }
  return NextResponse.next();
}
