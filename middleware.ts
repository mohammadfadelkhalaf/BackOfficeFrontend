import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


const protectedRoutes = ["/dashboard", "/chat"];


export default function middleware(req: NextRequest) {
    const token = req.cookies.get('token');

    const isAuthenticated = token?.value ? true : false;

    if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
        const absoluteURL = new URL("/", req.nextUrl.origin);
        return NextResponse.redirect(absoluteURL.toString());
    }
}