import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

export const config = {
    matcher: ["/dashboard/:path*", "/login", "/signup", "/", "/verify/:path*"],
};

export async function middleware(request: NextRequest) {
    const token = await getToken({
        req: request,
        secret: process.env.JWT_SECRET,
        secureCookie: process.env.NODE_ENV === "production",
    });
    console.log("Token in middleware:", token);

    const url = request.nextUrl;

    if (
        token &&
        (url.pathname.startsWith("/login") ||
            url.pathname.startsWith("/signup") ||
            url.pathname.startsWith("/verify") ||
            url.pathname === "/")
    ) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (!token && url.pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    // if (token?.isVerified && url.pathname.startsWith("/verify")) {
    //     return NextResponse.redirect(new URL("/dashboard", request.url));
    // }
    // if (!token?.isVerified && url.pathname.startsWith("/dashboard")) {
    //     return NextResponse.redirect(new URL("/verify", request.url));
    // }

    return NextResponse.next();
}
